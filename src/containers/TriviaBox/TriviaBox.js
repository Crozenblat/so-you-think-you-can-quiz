import React, { useState } from "react";
import styled from "styled-components";

import DifficultyButton from "../../components/UI/Buttons/DifficultyButton";
import SettingsEnterButton from "../../components/UI/Buttons/SettingsEnterButton";

import SettingsPanel from "../../components/SettingsPanel/SettingsPanel";

const Heading = styled.h1`
    margin-top: 3rem;
    font-size: 6.5rem;
    text-transform: capitalize;
`;

const Message = styled.p`
    font-size: 3rem;
`;

const BoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    background: rgb(51, 51, 51);
    text-align: center;
    border-radius: 10px;
    width: 96rem;
    height: 44rem;
    font-family: sans-serif;
    color: white;
`;

const TriviaBox = props => {
    const [headingText, setHeadingText] = useState("So you think you can quiz!");
    const [messageText, setMessageText] = useState("Please select your difficulty below.");
    const [active, setActive] = useState(false);
    const [questionAmount, setQuestionAmount] = useState(10);

    return(
    <BoxWrapper>
    <SettingsEnterButton setActiveTrue={() => setActive(true)}>Settings</SettingsEnterButton>
    <SettingsPanel 
        active={active} 
        setActiveFalse={() => setActive(false)} 
        questionAmount={questionAmount}
        setQuestionAmount={setQuestionAmount}
        />
        <Heading>{headingText}</Heading>
        <Message>{messageText}</Message>
        <div>
            <DifficultyButton type="easy">Easy</DifficultyButton>
            <DifficultyButton type="medium">Medium</DifficultyButton>
            <DifficultyButton type="hard">Hard</DifficultyButton>
        </div>
        <div>
            <p>Favicon made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
            <p>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> & <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel Perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        </div>
    </BoxWrapper>
    );
};

export default TriviaBox;