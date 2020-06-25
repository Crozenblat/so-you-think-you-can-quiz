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
`;

const AnswersPanel = props => {
    return <AnswersPnl>
                {props.questionList.map(
                        question => { 
                        let indicator;
                        if(question.correct){
                            indicator = <Indicator src={CorrectImage}/>
                        }else{
                            indicator = <Indicator src={IncorrectImage}/>
                        }

                        return (
                            <li key={question.question}>
                                {indicator}{decodeURIComponent(question.question)};
                                <CorrectAnswer correct={question.correct}>
                                    {question.correct ? null : <p>You Selected: {decodeURIComponent(question.selected)}</p>}
                                    Answer: {decodeURIComponent(question.correct_answer)}
                                </CorrectAnswer>
                            </li>
                        )
                    }
                )}
            </AnswersPnl>
}

export default AnswersPanel;