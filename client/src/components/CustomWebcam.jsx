import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { API } from "../constants";
import styled from "styled-components";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
    facingMode: FACING_MODE_USER
};

const StyledWebcam = styled(Webcam)`
    width: 100%;
    height: 90%;
`;

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [result, setResult] = useState('');
  const [audio, setAudio] = useState(null);
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  
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
    
  const handleChangeCamera = useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);

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
            facingMode
          }}
          onClick={capture}
        />
      )}
      <div className="btn-container" style={{display: 'flex', gap: '20px'}}>
        <button onClick={capture}>Capture photo</button>
        <button onClick={handleChangeCamera}>Switch Camera</button>
      </div>
      {result && <div>Result: {result}</div>}
      {audio && <audio controls src={audio}></audio>}
    </div>
  );
};

export default CustomWebcam;