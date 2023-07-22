import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { API } from "../constants";

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [result, setResult] = useState('');
  const [audio, setAudio] = useState(null);
  
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    // Convert data URL to blob
    fetch(imageSrc)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);

      // Remove old audio file
      setAudio(null);
      setResult('');

      // Post to the API
      fetch(API + '/predict', {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            setResult(data.result);
        
            // Fetch audio file from separate endpoint
            fetch(API + data.audioFile)
            .then((response) => response.blob())
            .then((blob) => {
                const audioUrl = URL.createObjectURL(blob);
                setAudio(audioUrl);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
      });
    });

  }, [webcamRef]);

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      )}
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
      {result && <div>Result: {result}</div>}
      {audio && <audio controls src={audio}></audio>}
    </div>
  );
};

export default CustomWebcam;
