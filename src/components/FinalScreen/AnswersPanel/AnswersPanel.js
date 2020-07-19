import React from "react";

import styled from "styled-components";

import CorrectImage from "../../../assets/images/correct.svg";
import IncorrectImage from "../../../assets/images/incorrect.svg";

const AnswersPnl = styled.ul`
    font-size: 2.4rem;
    grid-column: 1 / 13;
    grid-row: 7 / 13;
    text-align: start;
    overflow: scroll;
    padding: 1rem;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Indicator = styled.img `
    height: 4rem;
    width: 3rem;
    vertical-align: middle;
    margin-right: 0.5rem;
    margin-bottom: 0.7rem;
`;

const CorrectAnswer = styled.p`
    color: ${props => 
        props.correct === true && "#25ae88" ||
        props.correct === false && "#d75a4a"
    };
    font-weight: bold;
    display: block;
`;

const AnswersPanel = props => {
    return <AnswersPnl tabIndex="1">
                {props.questionList.map(
                        question => { 
                        let indicator;
                        if(question.correct){
                            indicator = <Indicator src={CorrectImage} alt={"Checkmark"}/>
                        }else{
                            indicator = <Indicator src={IncorrectImage} alt={"X"}/>
                        }

                        return (
                            <li key={question.question}>
                                {indicator}{decodeURIComponent(question.question)}
                                {question.correct ? null : 
                                <CorrectAnswer correct={question.correct}>You Selected: {decodeURIComponent(question.selected)}</CorrectAnswer>}
                                <CorrectAnswer correct={question.correct}>Answer: {decodeURIComponent(question.correct_answer)}</CorrectAnswer>
                            </li>
                        )
                    }
                )}
            </AnswersPnl>
}

export default AnswersPanel;