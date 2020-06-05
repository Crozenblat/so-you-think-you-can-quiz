import React, { useState } from "react";

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

    return (
        <SettingsPnl active={props.active}>
            <SettingsHeading>Categories</SettingsHeading>
            <SettingsExitButton setActiveFalse={props.setActiveFalse}/>
            <form action="#">
                <CategoryButton id="anime-&-manga" value="category=31">Anime & Manga</CategoryButton>
                <CategoryButton id="books" value="category=10">Books</CategoryButton>
                <CategoryButton id="computers" value="category=18">Computers</CategoryButton>
                <CategoryButton id="film" value="category=11">Film</CategoryButton>
                <CategoryButton id="geography" value="category=22">Geography</CategoryButton>
                <CategoryButton id="history" value="category=23">History</CategoryButton>
                <CategoryButton id="music" value="category=12">Music</CategoryButton>
                <CategoryButton id="science-&-nature" value="category=17">Science & Nature</CategoryButton>
                <CategoryButton id="television" value="category=14">Television</CategoryButton>
                <CategoryButton id="video-games" value="category=15">Video Games</CategoryButton>
                <CategoryButton id="general-knowledge" value="category=9" checked>General Knowledge</CategoryButton>
            </form>
            <QuestionAmountInput questionAmount={props.questionAmount} setQuestionAmount={props.setQuestionAmount}>Number of Questions:</QuestionAmountInput>
        </SettingsPnl>
    )
};

export default SettingsPanel;