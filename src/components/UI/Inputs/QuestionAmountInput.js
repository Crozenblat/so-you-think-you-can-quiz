import React, { Fragment, useState } from "react";

import styled from "styled-components";

import QuestionAmountIncrementors from "../Buttons/QuestionAmountIncrementors";

const QuestionAmtInput = styled.input`
    margin-top: 3rem;
    margin-left: 0.2rem;
    vertical-align: bottom;
    height: 2.24rem;
    width: 3rem;
    background: black;
    color: gold;
    text-align: center;
    border: none;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button{
        -webkit-appearance: none;
    }
`;

const QuestionAmtLabel = styled.label`
    font-size: 2rem;
`;

const QuestionAmountInput = props => {

    const increment = () => {
        let incrementedValue = props.questionAmount + 1;
        if(validationHandler(incrementedValue)){
            props.setQuestionAmount(incrementedValue);
        }
    };

    const decrement = () => {
        let decrementedValue = props.questionAmount - 1;
        if(validationHandler(decrementedValue)){
            props.setQuestionAmount(decrementedValue);
        }
    };

    const inputChangedHandler = (event) => {
        let userValue = Number(event.target.value);
        if(validationHandler(userValue)){
            props.setQuestionAmount(userValue);
        };
    };

    const validationHandler = (value) => {
        let valid = true;
        if(value > 20){
            valid = false;
        } else if(value < 5){
            valid = false;
        }
        return valid;
    }

    return (
        <Fragment>
            <QuestionAmtLabel htmlFor="question-amount">{props.children}</QuestionAmtLabel>
            <QuestionAmtInput 
            type="number" 
            id="question-amount" 
            value={props.questionAmount} 
            onChange={inputChangedHandler}/>
            <QuestionAmountIncrementors increment={increment} decrement={decrement}/>
        </Fragment>
    )
}

export default QuestionAmountInput;