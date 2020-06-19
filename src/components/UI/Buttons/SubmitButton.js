import React from "react";

import styled from "styled-components";

const SubmitBtn = styled.button `
    align-self: center;
    border: none;
    border-radius: 5px;
    height: 8rem;
    width: 11.8rem;
    margin-top: 1rem;
    transition: all .2s;
    cursor: pointer;
    backface-visibility: hidden;
    background: yellow;

    &:hover{
        transform: translateY(-3px);
        box-shadow: 0 1rem 2rem rgba(0,0,0,.2);
    }

    &:active{
        outline: none;
        transform: translateY(2px);
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.2);
    }

    &:focus{
        outline: none;
    }
`;

const SubmitButton = props => {
    return <SubmitBtn type="submit" disabled={props.isDisabled} onClick={props.clicked}>{props.children}</SubmitBtn>
}

export default SubmitButton;