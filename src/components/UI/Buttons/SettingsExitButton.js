import React from "react";

import styled from "styled-components";

const SettingsExtBtn = styled.button`
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    height: 5.5rem;
    width: 5.5rem;
    border: black solid 1px;
    border-radius: 50%;
    transition: all 0.2s;
    cursor: pointer;
    font-size: 4.5rem;
    background: transparent;

    &:hover{
        color: gold;
        background: black;
    }

    &:focus{
        outline: none
    }
`;

const SettingsExitButton = props => {
    return <SettingsExtBtn onClick={props.setActiveFalse}>X</SettingsExtBtn>
};

export default SettingsExitButton;