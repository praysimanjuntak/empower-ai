import styled from "styled-components";
import CustomWebcam from "../components/CustomWebcam";

const Container = styled.div`
    margin: 120px 60px;
`

const Home = () => {
    return (
        <Container>
            <CustomWebcam />
        </Container>
    );
}

export default Home;