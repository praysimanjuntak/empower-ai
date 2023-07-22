import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { API } from "../constants";
import styled from "styled-components";
import { useWindowSize } from "@uidotdev/usehooks";

const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT
};

const StyledWebcam = styled(Webcam)`
    width: 100%;
    height: 100%;
`;

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [result, setResult] = useState('');
  const [audio, setAudio] = useState(null);
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT);
  const size = useWindowSize();

  const isLandscape = size.height <= size.width;
  const ratio = isLandscape ? size.width / size.height : size.height / size.width;
  
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
        .then((response) => {
          // Check if request was successful
          if(!response.ok) {
            throw new Error("HTTP status " + response.status);
          }
          return response.blob();  // if successful, read the response as blob
        })
        .then((blob) => {
          // Convert the blob to an object URL and update the audio state
          const audioUrl = URL.createObjectURL(blob);
          setAudio(audioUrl);
  
          // Play the audio
          const audio = new Audio(audioUrl);
          audio.play();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        
    });
  
  }, [webcamRef, setAudio, setResult, setImgSrc]);

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <StyledWebcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
                ...videoConstraints,
                facingMode,
                aspectRatio: ratio
            }}
            onClick={capture}
            height={size.height} 
            width={size.width}
        />
      )}
      <div className="btn-container" style={{display: 'flex', gap: '20px'}}>
        <button onClick={capture}>Capture photo</button>
      </div>
      {result && <div>Result: {result}</div>}
      {audio && <audio controls src={audio}></audio>}
    </div>
  );
};

export default CustomWebcam;