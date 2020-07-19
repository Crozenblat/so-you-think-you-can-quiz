import React from "react";

import styled from "styled-components";

const AnimationWrppr = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;

    &.slide-enter{
        opacity:0;
        transform: translateY(20px);
    }

    &.slide-enter-done{
        transform: translateY(0px);
        opacity: 1;
        transition: all 400ms;
    }

    &.slide-exit{
        transform: translateY(0px);
        opacity: 1;
    }

    &.slide-exit-active{
        transform: translateY(-20px);
        opacity: 0;
        transition: all 400ms;    
    }
`;

const AnimationWrapper = props => {
    return <AnimationWrppr>{props.children}</AnimationWrppr>;
};

export default AnimationWrapper;