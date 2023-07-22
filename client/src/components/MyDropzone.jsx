import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { API } from '../constants';

function MyDropzone() {
  const [result, setResult] = useState('');
  const [preview, setPreview] = useState('');
  const [audio, setAudio] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Only do something if a single file was dropped
    if (acceptedFiles.length === 1) {
        const image = acceptedFiles[0];

        // Set image preview
        setPreview(URL.createObjectURL(image));

        // Prepare form data
        const formData = new FormData();
        formData.append('file', image);

        // Remove old audio file
        setAudio(null);
        setResult('');

        // Post to the API
        fetch(API + '/predict', {
            headers: {
                "ngrok-skip-browser-warning": true
            },
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
    }
    }, []);


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Accept only image files
    maxFiles: 1, // Allow only one file
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: '50%', height: 'auto' }} />
        ) : (
          <p>Drag 'n' drop an image here, or click to select one</p>
        )}
      </div>
      {result && <div>Result: {result}</div>}
      {audio && <audio controls src={audio}></audio>}
    </div>
  );
}

export default MyDropzone;