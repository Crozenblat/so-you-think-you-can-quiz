import React from "react";
import axios from "../../axios-questions";
import { render, screen, fireEvent, wait} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import FinalScreen from "../FinalScreen/FinalScreen";

const setDisplayView = jest.fn();
const setKey = jest.fn();
const colorChange = jest.fn();
const questionList = 
    [
        {
            question: "Which best selling toy of 1983 caused hysteria, resulting in riots breaking out in stores?",
            correct_answer: "Cabbage Patch Kids",
            incorrect_answers:["Transformers", "Care Bears", "Rubik's Cube"],
            correct: true
        },
        {
            question: "Area 51 is located in which US state?",
            correct_answer: "Nevada",
            incorrect_answers:["Arizona", "New Mexico", "Utah"],
            selected: "New Mexico",
            correct: false
        }
    ];

describe("Final Screen", () => {

    it("should display the correct grade", () => {
        render(<FinalScreen score={8} questionAmount={10} setKey={setKey} 
                setDisplayView={setDisplayView} colorChange={colorChange} questionList={questionList}/>);
        
        const grade = screen.getByText("B-");
        
        expect(grade).toBeInTheDocument();
    });

    it("should display the correct score", () => {
        render(<FinalScreen score={8} questionAmount={10} setKey={setKey} 
            setDisplayView={setDisplayView} colorChange={colorChange} questionList={questionList}/>);
        
        let score = screen.getByText((content, node) => {
            const hasText = (node) => node.textContent === "Final score: 8/10";
            const nodeHasText = hasText(node);
            const childrenDontHaveText = Array.from(node.children).every(
                (child) => !hasText(child)
            );
        
            return nodeHasText && childrenDontHaveText;
        });

        expect(score).toBeInTheDocument();
    });

    it("should display the correct percentage", () => {
        render(<FinalScreen score={8} questionAmount={10} setKey={setKey} 
            setDisplayView={setDisplayView} colorChange={colorChange} questionList={questionList}/>);
        
        const percentage = screen.getByText((content, node) => {
            const hasText = (node) => node.textContent === "Final percentage: 80%";
            const nodeHasText = hasText(node);
            const childrenDontHaveText = Array.from(node.children).every(
                (child) => !hasText(child)
            );
        
            return nodeHasText && childrenDontHaveText;
        });

        expect(percentage).toBeInTheDocument();
    });

    it("should render the answer panel correctly", () => {
        render(<FinalScreen score={8} questionAmount={10} setKey={setKey} setDisplayView={setDisplayView}
                colorChange={colorChange} questionList={questionList}/>);

        const checkmark = screen.getByAltText("Checkmark");
        const questionOne = screen.getByText("Which best selling toy of 1983 caused hysteria, resulting in riots breaking out in stores?");
        const correctAnswerOne = screen.getByText("Answer: Cabbage Patch Kids");

        const X = screen.getByAltText("X");
        const questionTwo = screen.getByText("Area 51 is located in which US state?");
        const incorrectAnswerTwo = screen.getByText("You Selected: New Mexico");
        const correctAnswerTwo = screen.getByText("Answer: Nevada");

        expect(checkmark).toBeInTheDocument()
        expect(questionOne).toBeInTheDocument();
        expect(correctAnswerOne).toBeInTheDocument();
        expect(correctAnswerOne).toHaveStyle("color: #25ae88");

        expect(X).toBeInTheDocument();
        expect(questionTwo).toBeInTheDocument();
        expect(incorrectAnswerTwo).toBeInTheDocument();
        expect(incorrectAnswerTwo).toHaveStyle("color: #d75a4a");
        expect(correctAnswerTwo).toBeInTheDocument();
        expect(correctAnswerTwo).toHaveStyle("color: #d75a4a");        
    });
});

describe("Play Again Button", () => {

    it("should reset the game when clicked", async () => {
        render(<FinalScreen score={8} questionAmount={10} setKey={setKey} setDisplayView={setDisplayView} 
                colorChange={colorChange} questionList={questionList}/>);
        
        const playAgain = screen.getByRole("button", {name: /Play Again/i});
        fireEvent.click(playAgain);

        await wait(() => expect(setKey).toHaveBeenCalled());
    });
})