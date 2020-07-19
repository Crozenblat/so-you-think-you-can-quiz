import React from "react";

import styled from "styled-components";

const SettingsEntrBtn = styled.button`
    position: absolute;
    font-size: 2rem;
    text-align: left;
    color: white;
    border: none;
    background: gold;
    width: 8rem;
    height: 3rem;
    top: 2rem;
    right: 0rem;
    transition: width 0.5s;
    cursor: pointer;

    &:hover, &:focus{
        width: 9rem;
        outline: none;
    }
    
    &::before{
        content: "";
        display: inline-block;
        position: absolute;
        background-color: gold;
        border-top-left-radius: 11rem;
        border-bottom-left-radius: 11rem;
        height: 3rem;
        width: 2rem;
        left: -2rem;
        top: 0rem;
    }
`;

const SettingsEnterButton = props => {
    return <SettingsEntrBtn onClick={props.setActiveTrue}>{props.children}</SettingsEntrBtn>
};

export default SettingsEnterButton;