import React from "react";
import mockAxios from "../../axios-questions";
import { render, screen, fireEvent, wait, findByText} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import TriviaBox from "../../containers/TriviaBox/TriviaBox";

jest.mock("../../axios-questions");

const axiosSpy = jest.spyOn(mockAxios, "get");

describe("Panel Exit Button", () => {

    it("should close the settings panel when clicked", () => {
        render(<TriviaBox/>);
        
        const settingsPnl = screen.getByTestId("settings-panel");
        const settingsOpenBtn = screen.getByRole("button", {name: /settings/i});
        fireEvent.click(settingsOpenBtn);
        expect(settingsPnl).toHaveStyle("height: 100%");
        const settingsExitButton = screen.getByTestId("settings-exit-button")
        fireEvent.click(settingsExitButton)
        expect(settingsPnl).toHaveStyle("height: 0%");
    });
});

describe("Category Selection", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should have 'General Knowledge' as the default category", async () => {
        render(<TriviaBox colorChange={jest.fn()} />);
        const diffBtn = screen.getByRole("button", {name: /easy/i});
        fireEvent.click(diffBtn);

        expect(axiosSpy).toHaveBeenCalledWith(expect.stringContaining("category=9"));
        expect(await screen.findByText("Question 1"));
    });

    it("should set the category when clicked", async () => {
        render(<TriviaBox colorChange={jest.fn()} />);
        const compCategory = screen.getByText("Computers");
        fireEvent.click(compCategory);
        const diffBtn = screen.getByRole("button", {name: /easy/i});
        fireEvent.click(diffBtn);

        expect(axiosSpy).toHaveBeenCalledWith(expect.stringContaining("category=18"));
        expect(await screen.findByText("Question 1"));
    });
});

describe("Question Incrementor", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should increment the number when the increment button is clicked", () => {
        render(<TriviaBox colorChange={jest.fn()} />);
        const amountInput = screen.getByTestId("question-amount");
        const incrementBtn = screen.getByAltText("Up Arrow");
        fireEvent.click(incrementBtn);
        expect(Number(amountInput.value)).toBe(11);
    });

    it("should decrement the number when the decrement button is clicked", () => {
        render(<TriviaBox colorChange={jest.fn()} />);
        const amountInput = screen.getByTestId("question-amount");
        const decrementBtn = screen.getByAltText("Down Arrow");
        fireEvent.click(decrementBtn);
        expect(Number(amountInput.value)).toBe(9);
    })

    it("should limit the minimum number of questions to 5", () => {
        render(<TriviaBox colorChange={jest.fn()} />);
        const amountInput = screen.getByTestId("question-amount");
        const decrementBtn = screen.getByAltText("Down Arrow");
        fireEvent.change(amountInput, {target: {value: 5}});
        fireEvent.click(decrementBtn);
        expect(Number(amountInput.value)).toBe(5);
    })

    it("should limit the maximum number of questions to 20", () => {
        render(<TriviaBox colorChange={jest.fn()} />);
        const amountInput = screen.getByTestId("question-amount");
        const incrementBtn = screen.getByAltText("Up Arrow");
        fireEvent.change(amountInput, {target: {value: 20}});
        fireEvent.click(incrementBtn);
        expect(Number(amountInput.value)).toBe(20);
    })

    it("should fetch the appropriate amount of questions in the axios call to the TriviaDB API", async () => {
        render(<TriviaBox colorChange={jest.fn()} />);
        const amountInput = screen.getByTestId("question-amount");
        fireEvent.change(amountInput, {target: {value: 16}});
        const diffBtn = screen.getByRole("button", {name: /easy/i});
        fireEvent.click(diffBtn);

        expect(axiosSpy).toHaveBeenCalledWith(expect.stringContaining("amount=16"));
        expect(await screen.findByText("Question 1"));
    })
});