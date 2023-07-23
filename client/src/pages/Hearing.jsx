import styled from "styled-components";
import { mediaQueries } from "../constants";
import MyDropzone from "../components/MyDropzone";
import { API } from '../constants';
import { useState } from "react";
import LoadingIcon from "../image/loading.gif";

const Container = styled.div`
    height: 100vh;
    @media ${mediaQueries.mobile} {
        margin: 40px 10px;
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media ${mediaQueries.mobile} {
        margin: 80px 0;
    }
`

const Title = styled.div`
    font-size: 3em;
    margin: 60px 0 0 0;
`;

const SubTitle = styled.div`
    font-size: 1.4em;
    width: 70%;
    text-align: center;
    margin-bottom: 60px;
`

const Box = styled.div`
    display: flex;
    gap: 20px;
    width: 90%;
`

const Transcription = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const TranscriptionBox = styled.div`
    padding: 10px;
    border: 2px solid grey;
    height: 100%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
`

const Button = styled.div`
    color: white;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
    }
`

const Hearing = () => {
    const [result, setResult] = useState('');
    const [file, setFile] = useState(null); // For storing the file
    const [summarize, setSummarize] = useState(false); // For storing the checkbox state
    const [loading, setLoading] = useState(false); // For tracking when transcription is happening

    const onTranscribeClick = () => {
        if (file) {
            setLoading(true);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('summarize', summarize); // Add the checkbox value to formData

            setResult('');

            fetch(API + '/whisper', {
                method: 'POST',
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                setResult(data.text);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>Don't worry, we got you</Title>
                <SubTitle>With this tool, you can check the contents of any audio</SubTitle>
                <Box>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '30%'}}>
                        <MyDropzone file={file} setFile={setFile} />
                        <div style={{display: 'flex', gap: '20px', justifyContent: 'space-between'}}>
                            <Button style={{backgroundColor: loading ? '#f4f4f4' : '#673de6'}} onClick={onTranscribeClick}>Transcribe</Button>
                            <div style={{display: 'flex', gap: '10px', alignItems: 'center', padding: '0 10px'}}>
                                <input type="checkbox" style={{transform: 'scale(1.5)'}} onChange={(e) => setSummarize(e.target.checked)} />
                                <div>Summarize</div>
                            </div>
                        </div>
                    </div>
                    <Transcription>
                        <div style={{fontSize: '1.4em', fontWeight: '700', padding: '0 10px'}}>Transcription</div>
                        <TranscriptionBox>
                            {loading ? <img style={{alignSelf: 'center'}} src={LoadingIcon} alt="Loading..." /> : result}
                        </TranscriptionBox>
                    </Transcription>
                </Box>
            </Wrapper>
        </Container>
    );
}

export default Hearing;