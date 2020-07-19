import React from "react";
import mockAxios from "../../axios-questions";
import { render, screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import TriviaBox from "./TriviaBox";

jest.mock("../../axios-questions");

describe("Starting Screen", () => {

    it("should render correctly", () => {
        const wrapper = render(<TriviaBox/>);
        expect(wrapper).toMatchSnapshot();
    });

    it("should reveal the settings panel when the settings entry button is clicked", () => {
        render(<TriviaBox/>);
        const settingsBtn = screen.getByRole("button", {name: /settings/i});
        const settingsPnl = screen.getByTestId("settings-panel");

        expect(settingsPnl).toHaveStyle("height: 0%");

        fireEvent.click(settingsBtn);

        expect(settingsPnl).toHaveStyle("height: 100%")
    });
});

describe("Question Screen", () => {

    const mockColorChange = jest.fn();
    const mockUndulatePanels = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the first question when difficulty button is clicked", async () => {
        render(<TriviaBox colorChange={mockColorChange} undulatePanels={mockUndulatePanels}/>);
        const diffBtn = screen.getByRole("button", {name: /easy/i});
        fireEvent.click(diffBtn);

        const heading = await screen.findByText("Question 1");
        const question = await screen.findByText("Which best selling toy of 1983 caused hysteria, resulting in riots breaking out in stores?");
        const choices = await screen.findAllByRole("radio");
        const submit = await screen.findByRole("button", {name: /submit/i});

        expect(heading).toBeInTheDocument();
        expect(question).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
        expect(choices).toHaveLength(4);
        expect(choices.map(choice => choice.id)).toEqual(expect.arrayContaining(["Cabbage Patch Kids", "Transformers", "Care Bears", "Rubik’s Cube"]));

        expect(mockColorChange).toHaveBeenCalled();
    });

    it("should play the 'correct' animation when question is answered correctly", async () => {
        render(<TriviaBox colorChange={mockColorChange} undulatePanels={mockUndulatePanels}/>);
        const diffBtn = screen.getByRole("button", {name: /easy/i});
        fireEvent.click(diffBtn);

        const correctChoice = await screen.findByText("Cabbage Patch Kids");
        const submit = await screen.findByRole("button", {name: /submit/i});

        fireEvent.click(correctChoice);
        fireEvent.click(submit);

        const heading = await screen.findByText("Correct!");

        expect(heading).toHaveStyle("color: green");
        expect(mockColorChange).toHaveBeenCalledWith("linear-gradient(to left,#56AB2F,#A8E063)");
        expect(mockUndulatePanels).toHaveBeenCalled();
    });

    it("should play the 'incorrect' animation when question is answered incorrectly", async () => {
        render(<TriviaBox colorChange={mockColorChange} undulatePanels={mockUndulatePanels}/>);
        const diffBtn = screen.getByRole("button", {name: /easy/i});
        fireEvent.click(diffBtn);

        const correctChoice = await screen.findByText("Cabbage Patch Kids");
        const incorrectChoice = await screen.findByText("Transformers");
        const submit = await screen.findByRole("button", {name: /submit/i});

        fireEvent.click(incorrectChoice);
        fireEvent.click(submit);

        const heading = await screen.findByText("Wrong");

        expect(heading).toHaveStyle("color: red");
        expect(correctChoice).toHaveStyle("background: green");
        expect(mockColorChange).toHaveBeenCalledWith("linear-gradient(to left,#ED213A,#93291E)");
    });

    it("should display the next question when the current question is answered", async () => {
        render(<TriviaBox colorChange={mockColorChange} undulatePanels={mockUndulatePanels}/>);
        const diffBtn = screen.getByRole("button", {name: /easy/i});
        fireEvent.click(diffBtn);

        let firstChoice = await screen.findByText("Transformers");
        let submit = await screen.findByRole("button", {name: /submit/i});

        fireEvent.click(firstChoice);
        fireEvent.click(submit);     

        const heading = await screen.findByText("Question 2");
        const question = await screen.findByText("Area 51 is located in which US state?");
        const choices = await screen.findAllByRole("radio");
        submit = await screen.findByRole("button", {name: /submit/i});


        expect(heading).toBeInTheDocument();
        expect(heading).toHaveStyle("color: white");
        expect(question).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
        expect(choices).toHaveLength(4);
        expect(choices.map(choice => choice.id)).toEqual(expect.arrayContaining(["Nevada", "Arizona", "New Mexico", "Utah"]));

        expect(mockColorChange).toHaveBeenCalledTimes(3);
    });

    it("should display the final screen after the last question is answered", async () => {
        jest.setTimeout(7000);

        render(<TriviaBox colorChange={mockColorChange} undulatePanels={mockUndulatePanels}/>);
        const diffBtn = screen.getByRole("button", {name: /easy/i});
        fireEvent.click(diffBtn);

        let correctChoice = await screen.findByText("Cabbage Patch Kids");
        let submit = await screen.findByRole("button", {name: /submit/i});

        fireEvent.click(correctChoice);
        fireEvent.click(submit);     

        correctChoice = await screen.findByText("Nevada");
        submit = await screen.findByRole("button", {name: /submit/i});

        fireEvent.click(correctChoice);
        fireEvent.click(submit);
        
        const playAgain = await screen.findByRole("button", {name: /Play Again/i});
        expect(playAgain).toBeInTheDocument();
    });
});