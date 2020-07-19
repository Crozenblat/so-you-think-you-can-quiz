import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import axios from "../../axios-questions";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import BoxWrapper from "../../components/UI/BoxWrapper/BoxWrapper";

import DifficultyButton from "../../components/UI/Buttons/DifficultyButton";
import SettingsEnterButton from "../../components/UI/Buttons/SettingsEnterButton";
import ChoiceButton from "../../components/UI/Buttons/ChoiceButton";
import SubmitButton from "../../components/UI/Buttons/SubmitButton";

import SettingsPanel from "../../components/SettingsPanel/SettingsPanel";

import AnimationWrapper from "../../components/UI/AnimationWrapper/AnimationWrapper";
import FinalScreen from "../../components/FinalScreen/FinalScreen";

import { mixUp } from "../../utilities/questionUtilities";


const Heading = styled.h1`
    margin-top: 3rem;
    font-size: 6.5rem;
    text-transform: capitalize;
    color: ${props => 
        props.correct === true && "green" ||
        props.correct === false && "red" ||
        props.correct === null && "white"
    };
`;

const Message = styled.p`
    text-transform: capitalize;
    font-size: ${props => props.hasError ?  "2rem" : "3rem"};
    color: ${props => props.hasError ? "red": "white"};
`;

const ChoiceForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const TriviaBox = props => {
//Edit Header Content
    const [headingText, setHeadingText] = useState("So you think you can quiz!");
    const [messageText, setMessageText] = useState("Please select your difficulty below");
//Settings Panel Visibility
    const [settingsActive, setSettingsActive] = useState(false);
//Parameters to Fetch Questions
    const [questionAmount, setQuestionAmount] = useState(10);
    const [category, setCategory] = useState("category=9");
//Parameters to Serve Questions
    const [questionList, setQuestionList] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(null);
    const [choices, setChoices] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [isDisabled, setIsDisabled] = useState(null);
//Control Screen View
    const [view, setView] = useState("welcomeScreen");
    const [displayView, setDisplayView] = useState(false);
//Necessary in order to update the questionNumber before calling displayNextQuestion(); Acts as a callback to setQuestionNumber.
    useEffect(() => {
        setDisplayView(true);
        if(questionList !== null && questionNumber < questionList.length){
            displayNextQuestion(questionList[questionNumber]);
            setView("questionScreen");
        } else if(questionNumber !== null && questionNumber === questionList.length){
            props.colorChange();
            setView("finalScreen");
        }
    },[questionNumber]);

    const initializeQuestions = async (amount, category, difficulty) => {
        let questions = await axios.get(`?amount=${amount}&${category}&difficulty=${difficulty}&type=multiple&encode=url3986`);
        setQuestionList(questions.data.results);
        setQuestionNumber(0);
    };

    const displayNextQuestion = (newQuestion) => {
        props.colorChange();
        setChoices((mixUp([newQuestion.correct_answer, ...newQuestion.incorrect_answers])));
        setCorrectAnswer(decodeURIComponent(newQuestion.correct_answer));
        setIsCorrect(null);
        setHeadingText(`Question ${questionNumber + 1}`);
        setMessageText(decodeURIComponent(newQuestion.question));
    };

    const checkAnswer = () => {
        if(selectedAnswer === correctAnswer){
            props.colorChange("linear-gradient(to left,#56AB2F,#A8E063)");
            props.undulatePanels();
            questionList[questionNumber].correct = true;
            setIsCorrect(true);
            setHeadingText("Correct!");
            setScore(prev => prev + 1);
        } else if(selectedAnswer !== correctAnswer){
            props.colorChange("linear-gradient(to left,#ED213A,#93291E)");
            questionList[questionNumber].correct = false;
            questionList[questionNumber].selected = selectedAnswer;
            setIsCorrect(false);
            setHeadingText("Wrong");
        }
        setSelectedAnswer(null);
        setIsDisabled(true);
        setTimeout(() => {
            setDisplayView(false);
//Throws a memory leak warning during testing for setting state on an unmounted component. Necessary for animation to work.
            setTimeout(() => {
                setIsDisabled(false);
                setQuestionNumber(prev => prev + 1);
            }, 400);
        }, 2000);
    }
    
    let screen;

    const boxText = <Fragment>
                        <Heading correct={isCorrect}>{headingText}</Heading>
                        <Message>{messageText}</Message>
                    </Fragment>

    switch(view){
        case "welcomeScreen":
            screen = <AnimationWrapper>
                        {boxText}
                        <div>
                            {["Easy", "Medium", "Hard"].map((buttonLabel, index) => {
                                return <DifficultyButton 
                                        key={index}
                                        difficulty={buttonLabel.toLowerCase()} 
                                        clicked={(difficulty) => {
                                            initializeQuestions(questionAmount, category, difficulty);
                                            setDisplayView(false);
                                        }}
                                        >{buttonLabel}</DifficultyButton>
                            })}
                        </div>
                        <SettingsEnterButton setActiveTrue={() => setSettingsActive(true)}>Settings</SettingsEnterButton>
                        <SettingsPanel 
                            active={settingsActive} 
                            setActiveFalse={() => setSettingsActive(false)} 
                            questionAmount={questionAmount}
                            setQuestionAmount={setQuestionAmount}
                            setCategory={setCategory}
                            />
                        <div>
                            <p>Favicon made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
                            <p>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> & <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel Perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
                        </div>
                     </AnimationWrapper>
            break;
        case "questionScreen":
            let choiceButtons = choices.map((option) => <ChoiceButton key={option} disabled={isDisabled} isCorrect={isCorrect} correct={correctAnswer} value={option} clicked={(choice) => setSelectedAnswer(decodeURIComponent(choice))}>{option}</ChoiceButton>);
            screen = <AnimationWrapper>
                        {boxText}
                        <ChoiceForm>
                            {choiceButtons}
                            <SubmitButton isDisabled={!selectedAnswer} clicked={(e) => {e.preventDefault(); checkAnswer();}}>Submit</SubmitButton>
                        </ChoiceForm>
                     </AnimationWrapper>
            break;
        case "finalScreen":
            screen = <AnimationWrapper>
                        <FinalScreen
                            setKey={props.setKey}
                            setDisplayView={setDisplayView}
                            score={score}
                            colorChange={props.colorChange}
                            questionAmount={questionList.length}
                            questionList={questionList}
                        />
                     </AnimationWrapper>
            break;
    }

    return(
        <BoxWrapper>
            <CSSTransition 
            unmountOnExit
            in={displayView}
            timeout={400}
            classNames='slide'
            appear> 
                {screen}
            </CSSTransition>
        </BoxWrapper>

    );
};

export default withErrorHandler(TriviaBox, axios);