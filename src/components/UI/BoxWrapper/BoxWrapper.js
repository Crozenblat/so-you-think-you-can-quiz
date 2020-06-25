import React from "react";

import styled from "styled-components";

const BoxWrppr = styled.div`
    position: relative;
    background: rgb(51, 51, 51);
    text-align: center;
    border-radius: 10px;
    width: 96rem;
    height: 44rem;
    font-family: sans-serif;
    color: white;
    z-index: 1;
`;

const BoxWrapper = props => {
    return <BoxWrppr>{props.children}</BoxWrppr>
}

export default BoxWrapper;