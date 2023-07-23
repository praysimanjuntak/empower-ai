import styled from "styled-components";
import CustomWebcam from "../components/CustomWebcam";
import { mediaQueries } from "../constants";

const Container = styled.div`
    height: 150vh;
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

const Vision = () => {
    return (
        <Container>
            <Wrapper>
                <CustomWebcam />
            </Wrapper>
        </Container>
    );
}

export default Vision;