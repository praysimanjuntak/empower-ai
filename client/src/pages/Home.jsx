import styled from "styled-components";
import CustomWebcam from "../components/CustomWebcam";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    margin: 40px 10px;
`

const Home = () => {
    return (
        <Container>
            <CustomWebcam />
        </Container>
    );
}

export default Home;