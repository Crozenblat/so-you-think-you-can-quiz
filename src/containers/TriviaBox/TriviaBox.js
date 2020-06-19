import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import { Transition, CSSTransition } from "react-transition-group";

import DifficultyButton from "../../components/UI/Buttons/DifficultyButton";
import SettingsEnterButton from "../../components/UI/Buttons/SettingsEnterButton";
import PlayAgainButton from "../../components/UI/Buttons/PlayAgainButton";
import ChoiceButton from "../../components/UI/Buttons/ChoiceButton";
import SubmitButton from "../../components/UI/Buttons/SubmitButton";

import SettingsPanel from "../../components/SettingsPanel/SettingsPanel";

import { mixUp } from "../../shared/utility";

const CorrectImage = require("../../assets/images/correct.svg");
const IncorrectImage = require("../../assets/images/incorrect.svg");

const Heading = styled.h1`
    margin-top: 3rem;
    font-size: 6.5rem;
    text-transform: capitalize;
    color: ${props => 
        props.correct === true && "green" ||
        props.correct === false && "red" ||
        props.correct === null && "white"
    };

    &.slide-enter{
        opacity:0;
        transform: translateY(20px);
    }

    &.slide-enter-done{
        transform: translateY(0px);
        opacity:1;
        transition: all 400ms;
    }

    &.slide-exit{
        transform: translateY(0px);
        opacity:1;
    }

    &.slide-exit-active{
        transform: translateY(-20px);
        opacity: 0;
        transition: all 400ms;    
    }
`;

const Message = styled.p`
    font-size: ${props => props.hasError ?  "2rem" : "3rem"};
    color: ${props => props.hasError ? "red": "white"};

    &.slide-enter{
        opacity:0;
        transform: translateY(20px);
    }

    &.slide-enter-done{
        transform: translateY(0px);
        opacity:1;
        transition: all 400ms;
    }

    &.slide-exit{
        transform: translateY(0px);
        opacity:1;
    }

    &.slide-exit-active{
        transform: translateY(-20px);
        opacity: 0;
        transition: all 400ms;    
    }
`;

const BoxWrapper = styled.div`
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

const ChoiceForm = styled.form`
    display: flex;
    flex-direction: column;
    
    &.slide-enter{
        opacity:0;
        transform: translateY(20px);
    }

    &.slide-enter-done{
        transform: translateY(0px);
        opacity:1;
        transition: all 400ms;
    }

    &.slide-exit{
        transform: translateY(0px);
        opacity:1;
    }

    &.slide-exit-active{
        transform: translateY(-20px);
        opacity: 0;
        transition: all 400ms;    
    }
`;

const AnimationWrapper = styled.div`
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
        opacity:1;
        transition: all 400ms;
    }

    &.slide-exit{
        transform: translateY(0px);
        opacity:1;
    }

    &.slide-exit-active{
        transform: translateY(-20px);
        opacity: 0;
        transition: all 400ms;    
    }
`;

const FinalGrid = styled.div`
    display: grid; 
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
`;
const FinalGrade = styled.div`
    font-size: 22rem;
    grid-column: 2 / 5;
    grid-row: 3 / 5;
    align-self: center;
`;

const FinalScore = styled.span`
    font-size: 3rem;
    grid-column: 6 / 9;
    grid-row: 3 / 4;
    justify-self: left;
    align-self: center;
`;

const FinalPercentage = styled.span`
    font-size: 3rem;
    grid-column: 6 / 10;
    grid-row: 4 / 5;
    align-self: center;
    justify-self: left;
`;

const AnswersPanel = styled.ul`
    font-size: 2.4rem;
    grid-column: 1 / 13;
    grid-row: 7 / 13;
    text-align: start;
    overflow: scroll;
    padding: 1rem;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Indicator = styled.img `
    height: 4rem;
    width: 3rem;
    vertical-align: middle;
    margin-right: 0.5rem;
    margin-bottom: 0.7rem;
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
    const [grade, setGrade] = useState(null);
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
            let percentage = (Math.round(score/questionAmount * 100));
            switch(true){
                case(percentage >= 97):
                    setGrade("A+");
                break;
                case(percentage >= 94):
                    setGrade("A");
                break;
                case(percentage >= 90):
                    setGrade("A-");
                break;
                case(percentage >= 87):
                    setGrade("B+");
                break;
                case(percentage >= 84):
                    setGrade("B");
                break;
                case(percentage >= 80):
                    setGrade("B-");
                break;
                case(percentage >= 77):
                    setGrade("C+");
                break;
                case(percentage >= 74):
                    setGrade("C");
                break;
                case(percentage >= 70):
                    setGrade("C-");
                break;
                case(percentage >= 67):
                    setGrade("D+");
                break;
                case(percentage >= 64):
                    setGrade("D");
                break;
                case(percentage >= 60):
                    setGrade("D-");
                break;
                case(percentage < 60):
                    setGrade("F");
                break;
                default:
                    return "Grade not found";
                break;
            }
        }
    },[questionNumber])
    const [displayView, setDisplayView] = useState(true);
//Error handling
    const [hasError, setHasError] = useState(false);

    const fetchQuestions = async (amount, category, difficulty) => {
        try{
            let questions = await axios.get(`https://opentdb.com/api.php?amount=${amount}&${category}&difficulty=${difficulty}&type=multiple&encode=url3986`);
            setQuestionList(questions.data.results);
            setQuestionNumber(0);
        } catch(err){
            setHasError(true);
            setMessageText("An error occurred! Please check your internet connection and try again.");
        }
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
                        <Message hasError={hasError}>{messageText}</Message>
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
                            <ChoiceButton key={choices[0]} disabled={isDisabled} isCorrect={isCorrect} correct={correctAnswer} value={choices[0]} clicked={(choice) => setSelectedAnswer(decodeURIComponent(choice))}>{choices[0]}</ChoiceButton>
                            <ChoiceButton key={choices[1]} disabled={isDisabled} isCorrect={isCorrect} correct={correctAnswer} value={choices[1]} clicked={(choice) => setSelectedAnswer(decodeURIComponent(choice))}>{choices[1]}</ChoiceButton>
                            <ChoiceButton key={choices[2]} disabled={isDisabled} isCorrect={isCorrect} correct={correctAnswer} value={choices[2]} clicked={(choice) => setSelectedAnswer(decodeURIComponent(choice))}>{choices[2]}</ChoiceButton>
                            <ChoiceButton key={choices[3]} disabled={isDisabled} isCorrect={isCorrect} correct={correctAnswer} value={choices[3]} clicked={(choice) => setSelectedAnswer(decodeURIComponent(choice))}>{choices[3]}</ChoiceButton>
                            <SubmitButton isDisabled={!selectedAnswer} clicked={(e) => {e.preventDefault(); checkAnswer();}}>Submit</SubmitButton>
                        </ChoiceForm>
                     </AnimationWrapper>
            break;
        case "finalScreen":
            screen = <AnimationWrapper>
                        <FinalGrid>
                        <FinalGrade>{grade}</FinalGrade>
                            <FinalScore>Final Score: {score}/{questionAmount}</FinalScore>
                            <FinalPercentage>Final Percentage: {Math.round((score/questionAmount) * 100)}%</FinalPercentage>
                            <PlayAgainButton>Play Again!</PlayAgainButton>
                            <AnswersPanel>
                                {questionList.map(
                                    question =>{ 
                                    if(question.correct){
                                        return <li><Indicator src={CorrectImage}/>{decodeURIComponent(question.question)}</li>
                                    }else{
                                        return <li><Indicator src={IncorrectImage}/>{decodeURIComponent(question.question)}</li>
                                    }
                                }
                                )}
                            </AnswersPanel>
                        </FinalGrid>
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

export default TriviaBox;