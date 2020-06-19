import React from "react";

import styled from "styled-components";

import CategoryButton from "../UI/Buttons/CategoryButton";
import QuestionAmountInput from "../UI/Inputs/QuestionAmountInput";
import SettingsExitButton from "../UI/Buttons/SettingsExitButton";

const SettingsHeading = styled.h1`
    font-size: 5rem;
`;

const SettingsPnl = styled.div`
    position: absolute;
    color: black;
    z-index: 2;
    top: 0px;
    left: 0px;
    border-radius: 10px;
    background: gold;
    width: 100%;
    height: ${props => props.active ? "100%" : "0%"};
    transition: all 0.5s;
    overflow: hidden;
`;

const SettingsPanel = props => {

    const setCategory = (event) => {props.setCategory(event.target.value)}

    return (
        <SettingsPnl active={props.active}>
            <SettingsHeading>Categories</SettingsHeading>
            <SettingsExitButton setActiveFalse={props.setActiveFalse}/>
            <form action="#">
                <CategoryButton id="anime-&-manga" value="category=31" clicked={setCategory}>Anime & Manga</CategoryButton>
                <CategoryButton id="books" value="category=10" clicked={setCategory}>Books</CategoryButton>
                <CategoryButton id="computers" value="category=18" clicked={setCategory}>Computers</CategoryButton>
                <CategoryButton id="film" value="category=11" clicked={setCategory}>Film</CategoryButton>
                <CategoryButton id="geography" value="category=22" clicked={setCategory}>Geography</CategoryButton>
                <CategoryButton id="history" value="category=23" clicked={setCategory}>History</CategoryButton>
                <CategoryButton id="music" value="category=12" clicked={setCategory}>Music</CategoryButton>
                <CategoryButton id="science-&-nature" value="category=17" clicked={setCategory}>Science & Nature</CategoryButton>
                <CategoryButton id="television" value="category=14" clicked={setCategory}>Television</CategoryButton>
                <CategoryButton id="video-games" value="category=15" clicked={setCategory}>Video Games</CategoryButton>
                <CategoryButton id="general-knowledge" value="category=9" clicked={setCategory} checked>General Knowledge</CategoryButton>
            </form>
            <QuestionAmountInput questionAmount={props.questionAmount} setQuestionAmount={props.setQuestionAmount}>Number of Questions:</QuestionAmountInput>
        </SettingsPnl>
    )
};

export default SettingsPanel;