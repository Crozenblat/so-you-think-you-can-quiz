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
import { mixUp } from "../../shared/utility";


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
    font-size: ${props => props.hasError ?  "2rem" : "3rem"};
    color: ${props => props.hasError ? "red": "white"};
`;

const ChoiceForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const TriviaBox = props => {
//Edit header content
    const [headingText, setHeadingText] = useState("So you think you can quiz!");
    const [messageText, setMessageText] = useState("Please select your difficulty below.");

    const [settingsActive, setSettingsActive] = useState(false);
//Fetch Questions
    const [questionAmount, setQuestionAmount] = useState(10);
    const [category, setCategory] = useState("category=9");
    const [difficulty, setDifficulty] = useState(null);
    useEffect(() => {
        if(difficulty !== null){
            fetchQuestions(questionAmount, category, difficulty)
            setDisplayView(false);
        };
    }, 
    [difficulty])
//Serve questions
    const [questionList, setQuestionList] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(null);
    const [choices, setChoices] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [isDisabled, setIsDisabled] = useState(null);
    //Control screen view
    const [view, setView] = useState("welcomeScreen");
    useEffect(() => {
        if(questionList !== null && questionNumber < questionAmount){
            displayNextQuestion(questionList[questionNumber])
            setView("questionScreen")
        } else if(questionNumber === questionAmount && questionNumber !== null){
            props.colorChange();
            setDisplayView(true);
            setView("finalScreen");
        }
    },[questionNumber])
    const [displayView, setDisplayView] = useState(false);
    useEffect(() => {
        setDisplayView(true);
    }, [])

    const fetchQuestions = async (amount, category, difficulty) => {
            let questions = await axios.get(`?amount=${amount}&${category}&difficulty=${difficulty}&type=multiple&encode=url3986`);
            setQuestionList(questions.data.results);
            setQuestionNumber(0);
    };

    const displayNextQuestion = (newQuestion) => {
        setChoices((mixUp([newQuestion.correct_answer, ...newQuestion.incorrect_answers])));
        props.colorChange();
        setDisplayView(true);
        setCorrectAnswer(decodeURIComponent(newQuestion.correct_answer));
        setIsCorrect(null);
        setHeadingText(`Question ${questionNumber + 1}`);
        setMessageText(decodeURIComponent(newQuestion.question));
    };

    const checkAnswer = () => {
        if(selectedAnswer === correctAnswer){
            props.colorChange("linear-gradient(to left,#56AB2F,#A8E063)");
            props.undulatePanels();
            setIsCorrect(true);
            setHeadingText("Correct!");
            questionList[questionNumber].correct = true;
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
            setTimeout(() => {
                setIsDisabled(false);
                setQuestionNumber(prev => prev + 1);
            }, 400);
        }, 2000);
    }
    
    let screen;

    const boxText = <Fragment>
                        <Heading correct={isCorrect}>{headingText}</Heading>
                        <Message hasError={props.hasError}>{props.hasError ? props.errMessage : messageText}</Message>
                    </Fragment>

    switch(view){
        case "welcomeScreen":
            screen = <AnimationWrapper>
                        <SettingsEnterButton setActiveTrue={() => setSettingsActive(true)}>Settings</SettingsEnterButton>
                        <SettingsPanel 
                            active={settingsActive} 
                            setActiveFalse={() => setSettingsActive(false)} 
                            questionAmount={questionAmount}
                            setQuestionAmount={setQuestionAmount}
                            setCategory={setCategory}
                            />
                        {boxText}
                        <div>
                            <DifficultyButton difficulty="easy" clicked={setDifficulty}>Easy</DifficultyButton>
                            <DifficultyButton difficulty="medium" clicked={setDifficulty}>Medium</DifficultyButton>
                            <DifficultyButton difficulty="hard" clicked={setDifficulty}>Hard</DifficultyButton>
                        </div>
                        <div>
                            <p>Favicon made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
                            <p>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> & <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel Perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
                        </div>
                     </AnimationWrapper>
            break;
        case "questionScreen":
            screen = <AnimationWrapper>
                        {boxText}
                        <ChoiceForm>
                            {choices.map((option, i) => <ChoiceButton key={choices[i]} disabled={isDisabled} isCorrect={isCorrect} correct={correctAnswer} value={choices[i]} clicked={(choice) => setSelectedAnswer(decodeURIComponent(choice))}>{choices[i]}</ChoiceButton>)}
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
                            questionAmount={questionAmount}
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