import styled from "styled-components";
import { mediaQueries } from "../constants";
import EyeLogo from "../image/eye.svg";
import EarLogo from "../image/ear.svg";
import MentalLogo from "../image/mental.svg";
import { Link } from "react-router-dom";


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

const OptionsBox = styled.div`
    width: 80%;
    height: 500px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
`

const Option = styled.div`
    border: 4px solid black;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: center;
    align-items: center;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.45);
    transition: transform 0.4s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
    }
`

const OptionLogo = styled.img`
    width: 350px;
    height: 350px;
`

const OptionText = styled.div`
    font-size: 1.8em;
    font-weight: 700;
    text-align: center;
`

const Home = () => {
    return (
        <Container>
            <Wrapper>
                <Title>Bridging Gaps, Enriching Lives.</Title>
                <SubTitle>We harness the transformative power of AI to enhance accessibility, championing the journey towards a world where everyone is empowered to live their lives to the fullest.</SubTitle>
                <OptionsBox>
                    <Link to="vision" style={{textDecoration: 'none', color: 'inherit'}}>
                        <Option>
                            <OptionLogo src={EyeLogo} alt="eye" />
                            <OptionText>I want to help someone with visual impairment.</OptionText>
                        </Option>
                    </Link>
                    <Link to="hearing" style={{textDecoration: 'none', color: 'inherit'}}>
                        <Option>
                            <OptionLogo src={EarLogo} alt="eye" />
                            <OptionText>I am a deaf/person with hard of hearing.</OptionText>
                        </Option>
                    </Link>
                    <Link style={{textDecoration: 'none', color: 'inherit'}}>
                        <Option>
                            <OptionLogo src={MentalLogo} alt="eye" />
                            <OptionText>I need help on my mental health.</OptionText>
                        </Option>
                    </Link>
                </OptionsBox>
            </Wrapper>
        </Container>
    );
}

export default Home;