import { useState, useEffect } from 'react';
import { QUESTION_ARRAY } from "./data.js";
import { getRandomObject } from './support.js';

import Quiz from './components/Quiz.jsx';
import Outro from './components/Outro.jsx';
import MainMenu from './components/MainMenu.jsx';
import QuizContextProvider from './quizContext.jsx';

/* Time in miliseconds */
const QUESTION_TIME = 20000;

export default function App() {
    const [avaliableQuestions, setAvaliableQuestions] = useState(QUESTION_ARRAY);
    const [currentQuestion, setCurrentQuestion] = useState(getRandomObject(avaliableQuestions));
    const [gameStarted, setGameStarted] = useState(false);
    const [playerScore, setPlayerScore] = useState(
        {
            correctScore: 0,
            incorrectScore: 0,
            skippedScore: 0,
            answers: []
        }
    );

    useEffect(() => {
        setCurrentQuestion(getRandomObject(avaliableQuestions));
    }, [avaliableQuestions]);

    const checkAnswer = (answer) => {
        setPlayerScore(prevPlayerScore => {
            return {
                correctScore: (answer == currentQuestion.correctAnswer) ? prevPlayerScore.correctScore+1 : prevPlayerScore.correctScore,
                incorrectScore: (answer != currentQuestion.correctAnswer && answer != 'SKIPPED') ? prevPlayerScore.incorrectScore+1 : prevPlayerScore.incorrectScore,
                skippedScore: (answer == 'SKIPPED') ? prevPlayerScore.skippedScore+1 : prevPlayerScore.skippedScore,

                answers: [
                    ...prevPlayerScore.answers,
                    {
                        question: currentQuestion.question,
                        answer: answer,
                        correctAnswer: currentQuestion.correctAnswer
                    }
                ]
            }
        })

        setAvaliableQuestions(avaliableQuestions.filter(item => item.question !== currentQuestion.question));
    }

    const startQuiz = () => {
        setGameStarted(true);
    }

    const restartGame = () => {
        setGameStarted(false);
        setAvaliableQuestions(QUESTION_ARRAY);
        setPlayerScore({
            correctScore: 0,
            incorrectScore: 0,
            skippedScore: 0,
            answers: []
        })
    }

    const quizContextProviderValue = {
        restartGame: restartGame,
        checkAnswer: checkAnswer,
        time: QUESTION_TIME,
        currentQuestion: currentQuestion,
        playerScore: playerScore,
        QUESTION_ARRAY: QUESTION_ARRAY,
        startQuiz: startQuiz
    }

    return <main>
        <QuizContextProvider value={quizContextProviderValue} >
            {gameStarted ? <> 
                {avaliableQuestions.length !== 0 && <Quiz /> }

                {avaliableQuestions.length === 0 && <Outro /> }
            </>
            :
            <MainMenu />
            }
        </QuizContextProvider>
    </main>
}
