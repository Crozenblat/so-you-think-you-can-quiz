import React, { Fragment } from "react";

import styled from "styled-components";

const ChoiceRadio = styled.input`
    display: none;

    &:checked + label{

        &::before{
            width: 100%;
        }
    }
`;

const ChoiceLabel = styled.label`
    border-bottom: solid 1px grey;
    background: ${props => 
        props.correct === true && "green" ||
        props.correct === false && "none"
    };
    padding: 1rem;
    position: relative;
    text-align: left;
    font-size: 1.9rem;
    z-index: 0;

    &:hover{

        &::after{
            content: "";
            display: inline-block;
            position: absolute;
            background: ${props => 
                props.correct === false && "grey" ||
                props.correct === true && "none"
            };
            top: 0px;
            left: 0px;
            height: 100%;
            width: 100%;
            z-index: -2;
        };
    };

    &::before{
        content: "";
        display: inline-block;
        background: gold;
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 0rem;
        z-index: -1;
        transition: all 0.3s;
    }
`; 
const ChoiceButton = props => {

    return (<Fragment>
                <ChoiceRadio type="radio" disabled={props.disabled} id={props.value} name="choice" onClick={() => props.clicked(props.value)}/>
                <ChoiceLabel htmlFor={props.value} correct={props.value === props.correct && props.isCorrect === false}>{props.children}</ChoiceLabel>
            </Fragment>
    )
}

export default ChoiceButton;