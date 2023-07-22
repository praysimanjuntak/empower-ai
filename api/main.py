from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from generativeimage2text.inference import test_git_inference_single_image
from TTS.api import TTS
import os
from typing import Optional
import logging
from PIL import Image

app = FastAPI()
TTS_MODEL_NAME = TTS.list_models()[0]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.post("/predict")
async def predict(file: UploadFile = File(...), model_name: Optional[str] = "GIT_BASE_COCO"):
    try:
        image_path = save_image(file)
        if image_path is None:
            raise HTTPException(status_code=400, detail="Could not save image file")

        os.environ['AZFUSE_TSV_USE_FUSE'] = '1'  # Set the environment variable
        result = test_git_inference_single_image(image_path, model_name, "")

        # Generate speech from the result text
        tts = TTS(model_name=TTS_MODEL_NAME, progress_bar=True, gpu=True)
        tts.tts_to_file(text=result, speaker=tts.speakers[0], language=tts.languages[0], file_path="output.wav")

        return {"result": result, "audioFile": "/audio"}

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/audio")
async def audio():
    return FileResponse("output.wav")

def save_image(file: UploadFile):
    try:
        file_size = len(file.file.read())
        if file_size > 10 * 1024 * 1024:  # file size > 10MB
            raise HTTPException(status_code=400, detail="File size exceeds the 10MB limit")
        file.file.seek(0)  # Reset file position to the beginning

        image = Image.open(file.file)
        # Save the image to a secure location and make sure filenames are unique
        image_path = f"img_dir/{file.filename}"
        image.save(image_path)
        return image_path

    except Exception as e:
        logging.error(f"An error occurred while saving the image: {e}")
        return None

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
