import React, { Fragment } from "react";

import styled from "styled-components";

const CategoryBtn = styled.input`
    margin-top: 1rem;
    display: none;

    &:hover + label{
        background: white;
    }

    &:checked + label{
        background: black;
        color: gold;
    }
`;

const CategoryLabel = styled.label`
    display: inline-block;
    font-size: 2rem;
    border: 1px black solid;
    border-radius: 10px;
    width: 46%;
    cursor: pointer;
    padding: 0.7rem;
    margin: 0.4rem;
    transition: all 0.2s;
`;

const CategoryButton = props => {
    return (
        <Fragment>
            <CategoryBtn type="radio" id={props.id} name="category" value={props.value} defaultChecked={props.checked} onClick={props.clicked}/>
            <CategoryLabel htmlFor={props.id}>{props.children}</CategoryLabel>
        </Fragment>
    )
};

export default CategoryButton;