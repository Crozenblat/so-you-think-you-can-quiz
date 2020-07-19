import React from "react";

import styled from "styled-components";

const PlayAgainBtn = styled.button`
border: none;
border-radius: 5px;
height: 8rem;
width: 11.8rem;
transition: all .2s;
cursor: pointer;
backface-visibility: hidden;
background: yellow;
grid-row: 3 / 5;
grid-column: 11 / 13;

&:hover{
    transform: translateY(-3px);
    box-shadow: 0 1rem 2rem rgba(0,0,0,.2);
}

&:active{
    transform: translateY(2px);
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.2);
}
`;

const PlayAgainButton = props => {
return <PlayAgainBtn onClick={props.click}>{props.children}</PlayAgainBtn>
}

export default PlayAgainButton