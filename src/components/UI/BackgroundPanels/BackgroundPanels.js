import React, { cloneElement, useState, useRef } from "react";

import styled from "styled-components";

import BackgroundPanel from "./BackgroundPanel/BackgroundPanel";

const BackgroundPnlsLayer1 = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to left,#18c746,#1173ff);
`;

const BackgroundPnlsLayer2 = styled.div`
    position: absolute;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to left,#18c746,#1173ff);
`;

const gradientList = [
    "linear-gradient(to left,#EECDA3,#EF629F)",
    "linear-gradient(to left,#18c746,#1173ff)",
    "linear-gradient(to left,#4DA0B0,#D39D38)",
    "linear-gradient(to left,#FD746C,#FF9068)",
    "linear-gradient(to left,#FC5C7D,#6A82FB)",
    "linear-gradient(to left,#00B09B,#96C93D)",
    "linear-gradient(to left,#FC4A1A,#F7B733)",
    "linear-gradient(to left,#007991,#78FFD6)",
    "linear-gradient(to left,#C33764,#1D2671)",
    "linear-gradient(to left,#43C6AC,#191654)",
    "linear-gradient(to left,#4568DC,#B06AB3)",
    "linear-gradient(to left,#43C6AC,#F8FFAE)",
    "linear-gradient(to left,#DCE35B,#45B649)",
    "linear-gradient(to left,#3494E6,#EC6EAD)",
    "linear-gradient(to left,#EE0979,#FF6A00)",
    "linear-gradient(to left,#00C3FF,#FFFF1C)",
    "linear-gradient(to left,#FF00CC,#333399)",
];

const BackgroundPanels = props => {

    const [currentGradient, setCurrentGradient] = useState(null);

    const layer1 = useRef(null);
    const layer2 = useRef(null);

    const colorChange = (newBackgroundGradient) => {
        let gradient;
        layer1.current.style.backgroundImage = currentGradient;
        if(!newBackgroundGradient){
            gradient = gradientList[Math.round(Math.random()*gradientList.length)]
        }else{
            gradient = newBackgroundGradient
        }

        layer2.current.animate([{
            backgroundImage: gradient,
            opacity: 0
            }, {
            backgroundImage: gradient,
            opacity: 1
        }], {
            direction: "normal",
            duration: 200,
            fill: "forwards"
        }
        );

        setCurrentGradient(gradient);
    }

    const panel1 = useRef(null);
    const panel2 = useRef(null);
    const panel3 = useRef(null);

    const undulatePanels = () => {

        const panels = [panel1, panel2, panel3];

        panels.forEach((panel, index) =>{
            setTimeout(() => panel.current.animate([{
                transform: "scale(1, 1)"
                }, {
                transform: "scale(1.06, 1.06)"
                                    }, {
                transform: "scale(1, 1)"
            }], {
                direction: "normal",
                duration: 100
            }
            ), 
            80 * index);
        })
    };

    return(
        <BackgroundPnlsLayer1 ref={layer1}>
            <BackgroundPnlsLayer2 ref={layer2}/>
            <BackgroundPanel passedRef={panel3} zIndex="1" width="129.2rem" height="59.5rem"/>
            <BackgroundPanel passedRef={panel2} zIndex="1" width="114rem" height="52.5rem"/>
            <BackgroundPanel passedRef={panel1} zIndex="1" width="98.8rem" height="45.5rem"/>
            {cloneElement(props.children, {colorChange: colorChange, undulatePanels: undulatePanels})}
        </BackgroundPnlsLayer1>
    )
};

export default BackgroundPanels;