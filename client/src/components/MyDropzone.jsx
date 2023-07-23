import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import AudioLogo from "../image/audio.svg";

const Container = styled.div`
  width: 100%;
  border: 2px dashed grey;
  border-radius: 30px;
`
const Wrapper = styled.div`
  height: 280px;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  align-items: center;
`

function MyDropzone({ file, setFile }) {
  const [fileName, setFileName] = useState(''); // Added this line to hold filename

  const onDrop = useCallback((acceptedFiles) => {
      if (acceptedFiles.length === 1) {
          const audio = acceptedFiles[0];
          setFileName(audio.name);  // Set the filename
          setFile(audio);  // Store the file in the parent component
      }
  }, [setFile]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'audio/*',
    maxFiles: 1,
  });

  return (
    <Container>
      <Wrapper {...getRootProps()}>
        <img style={{height: '200px', width: '200px'}} src={AudioLogo} alt="audio" />
        <input {...getInputProps()} />
        <div style={{fontSize: '1.5em', textAlign: 'center'}}>
          {fileName || "Drag and drop an audio file here, or click to select one"}
        </div>
      </Wrapper>
    </Container>
  );
}

export default MyDropzone;