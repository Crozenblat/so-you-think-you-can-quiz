import React, { useState, useEffect } from "react";

import styled from "styled-components";

import AnswersPanel from "../FinalScreen/AnswersPanel/AnswersPanel";
import PlayAgainButton from "../UI/Buttons/PlayAgainButton";

const FnlGrid = styled.div`
    display: grid; 
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
`;

const FinalGrade = styled.div`
    font-size: 22rem;
    grid-column: 2 / 5;
    grid-row: 3 / 5;
    align-self: center;
`;

const FinalScore = styled.span`
    font-size: 3rem;
    text-transform: capitalize;
    grid-column: 6 / 9;
    grid-row: 3 / 4;
    justify-self: left;
    align-self: center;
`;

const FinalPercentage = styled.span`
    font-size: 3rem;
    text-transform: capitalize;
    grid-column: 6 / 10;
    grid-row: 4 / 5;
    align-self: center;
    justify-self: left;
`;

const FinalScreen = props => {
    const [grade, setGrade] = useState(null);
    const [percentage, setPercentage] = useState(Math.round((props.score/props.questionAmount) * 100));

    useEffect(() => {
        switch(true){
            case(percentage >= 97):
                setGrade("A+");
            break;
            case(percentage >= 94):
                setGrade("A");
            break;
            case(percentage >= 90):
                setGrade("A-");
            break;
            case(percentage >= 87):
                setGrade("B+");
            break;
            case(percentage >= 84):
                setGrade("B");
            break;
            case(percentage >= 80):
                setGrade("B-");
            break;
            case(percentage >= 77):
                setGrade("C+");
            break;
            case(percentage >= 74):
                setGrade("C");
            break;
            case(percentage >= 70):
                setGrade("C-");
            break;
            case(percentage >= 67):
                setGrade("D+");
            break;
            case(percentage >= 64):
                setGrade("D");
            break;
            case(percentage >= 60):
                setGrade("D-");
            break;
            case(percentage < 60):
                setGrade("F");
            break;
            default:
                return "Grade not found";
            break;
        }
    });

    return (
        <FnlGrid>
            <FinalGrade>{grade}</FinalGrade>
            <FinalScore>Final score: {props.score}/{props.questionAmount}</FinalScore>
            <FinalPercentage>Final percentage: {percentage}%</FinalPercentage>
            <PlayAgainButton 
            click={() => {
                props.colorChange();
                props.setDisplayView(false);
                setTimeout(() => {
                    props.setKey(prev => prev + 1);
                }, 400)
            }}
            >Play Again!</PlayAgainButton>
            <AnswersPanel questionList={props.questionList}/>
        </FnlGrid>
    )
}

export default FinalScreen;