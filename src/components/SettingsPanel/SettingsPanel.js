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
    const categories = [
        {categoryNumber:"category=31", categoryName:"Anime & Manga"},
        {categoryNumber:"category=10", categoryName:"Books"},
        {categoryNumber:"category=18", categoryName:"Computers"},
        {categoryNumber:"category=11", categoryName:"Film"},
        {categoryNumber:"category=22", categoryName:"Geography"},
        {categoryNumber:"category=23", categoryName:"History"},
        {categoryNumber:"category=12", categoryName:"Music"},
        {categoryNumber:"category=17", categoryName:"Science & Nature"},
        {categoryNumber:"category=14", categoryName:"Television"},
        {categoryNumber:"category=15", categoryName:"Video Games"},
        {categoryNumber:"category=9", categoryName:"General Knowledge"}]

    return (
        <SettingsPnl active={props.active}>
            <SettingsHeading>Categories</SettingsHeading>
            <SettingsExitButton setActiveFalse={props.setActiveFalse}/>
    
            <form action="#">
                {categories.map((category, index) => {
                    let checked = false
                    if(index === categories.length - 1){checked = true};
                    return <CategoryButton  key={index} id={index} value={category.categoryNumber} clicked={setCategory} checked={checked}>{category.categoryName}</CategoryButton>
                })}
            </form>
            <QuestionAmountInput questionAmount={props.questionAmount} setQuestionAmount={props.setQuestionAmount}>Number of Questions:</QuestionAmountInput>
        </SettingsPnl>
    )
};

export default SettingsPanel;