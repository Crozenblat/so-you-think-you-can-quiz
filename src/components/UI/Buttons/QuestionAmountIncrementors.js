import React, { Fragment } from "react";

import styled from "styled-components";

const UpArrowImage = require("../../../assets/images/up-arrow.svg");
const DownArrowImage =  require("../../../assets/images/down-arrow.svg");

const UpArrw = styled.img`
    position: relative;
    height: 1.5rem;
    width: 1.5rem;
    left: 0.4rem;
    bottom: 1rem;
    cursor: pointer;
`;

const DownArrw = styled.img`
    position: relative;
    height: 1.5rem;
    width: 1.5rem;
    left: -1.1rem;
    bottom: -1.3rem;
    cursor: pointer;
`;

const QuestionAmountIncrementors = props => {
    return(
        <Fragment>
            <UpArrw src={UpArrowImage} alt="Up Arrow" onClick={props.increment}/>
            <DownArrw src={DownArrowImage} alt="Down Arrow" onClick={props.decrement}/>
        </Fragment>
    );
};

export default QuestionAmountIncrementors;