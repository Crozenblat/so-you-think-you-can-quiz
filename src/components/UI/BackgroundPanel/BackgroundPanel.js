import React from "react";

import styled from "styled-components";

const Panel = styled.div`
    background: transparent;
    position: absolute;
    box-shadow: 5px 5px 5px 5px;
    border-radius: 10px;
`;

const BackgroundPanel = props => {
    return <Panel style={{zIndex: props.zIndex, height: props.height, width: props.width}}/>
};

export default BackgroundPanel;