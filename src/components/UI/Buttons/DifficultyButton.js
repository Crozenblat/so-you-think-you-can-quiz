import React from "react";

import styled from "styled-components";

const Button = styled.button`
    border: none;
    border-radius: 5px;
    height: 8rem;
    width: 11.8rem;
    margin: 0 1rem;
    cursor: pointer;
    outline: none;
    transition: all 0.2s;
    font-size: 2.8rem;
    background: transparent;
    border-width: 1px;
    border-style: solid;
    border-color: ${props =>
        props.difficulty === "easy" && "green" ||
        props.difficulty === "medium" && "orange" ||
        props.difficulty === "hard" && "red"
    };
    color: ${props =>
        props.difficulty === "easy" && "green" ||
        props.difficulty === "medium" && "orange" ||
        props.difficulty === "hard" && "red"
    };

    &:hover{
        transform: translateY(-3px);
        box-shadow: 0 1rem 2rem rgba(0,0,0,.2);
        color: white;
        background: ${props =>
        props.difficulty === "easy" && "green" ||
        props.difficulty === "medium" && "orange" ||
        props.difficulty === "hard" && "red"
    };
    }

    &:active{
        transform: translateY(2px);
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.2);
    }
`;

const button = props => {
    return (
        <Button difficulty={props.difficulty} onClick={() => props.clicked(props.difficulty)}>{props.children}</Button>
    );
};

export default button;