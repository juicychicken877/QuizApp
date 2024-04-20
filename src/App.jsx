import { useState, useEffect } from 'react';
import Header from "./components/Header.jsx";
import ProgressBar from './components/ProgressBar.jsx';
import { QUESTION_ARRAY } from "./data.js";
import geraltThumbsUp from './assets/GeraltThumbsUp.png'

/* Time in miliseconds */
const QUESTION_TIME = 20000;

const getRandomObject = (array) => {
    let newArray = array;
    let object = Math.round(Math.random() * (array.length-1));

    return newArray[object];
}

const randomizeArray = (array) => {
    let newArray = array;

    let currentIndex = newArray.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }

    return newArray;
}

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

    return <>
        <Header />
        <main>
            {gameStarted ? <> 
                {/* Quiz */}
                {avaliableQuestions.length !== 0 && <>
                        <ProgressBar 
                            TIME={QUESTION_TIME} 
                            currentQuestion={currentQuestion}
                            checkAnswer={checkAnswer}
                        />

                        <button
                            className='restart-button button-box-shadow gray-button-style'
                            onClick={() => restartGame()}
                        >
                            <span className="material-symbols-outlined">restart_alt</span>
                        </button>

                        <h3>{ currentQuestion.question }</h3>

                        <section id="answers">
                            {randomizeArray(currentQuestion.answers).map(item => {
                                return <button 
                                    className='button-box-shadow answer-button gray-button-style' 
                                    onClick={() => checkAnswer(item)}
                                    key={item}
                                >
                                    {item}
                                </button>
                            })}
                        </section>
                    </>
                }
                {/* End game - display score*/}
                {avaliableQuestions.length === 0 && <>
                    <button
                            className='restart-button button-box-shadow gray-button-style'
                            onClick={() => restartGame()}
                        >
                            <span className="material-symbols-outlined">restart_alt</span>
                    </button>

                    <h3 className='end-quiz-header'>Quiz completed!</h3>
                    
                    <img src={geraltThumbsUp}></img>
                    
                    <section id='stats'>
                        <div>
                            <p>{Math.round((playerScore.skippedScore / QUESTION_ARRAY.length) * 100)}%</p>
                            <p>Skipped</p>
                        </div>
                        <div>
                            <p>{Math.round((playerScore.incorrectScore / QUESTION_ARRAY.length) * 100)}%</p>
                            <p>Incorrect</p>
                        </div>
                        <div>
                            <p>{Math.round((playerScore.correctScore / QUESTION_ARRAY.length) * 100)}%</p>   
                            <p>Correct</p>
                        </div>
                    </section>

                    <hr />
                    
                    <section id='player-answers'>
                        {playerScore.answers.map(item => {
                            return <div key={item.question} className='player-answer'>
                                <h4>{item.question}</h4>
                                <span
                                    className={item.answer === item.correctAnswer ? 'correct-answer-color' : 'incorrect-answer-color'}
                                >{item.answer}</span>
                            </div>
                        })}
                    </section>
                </>

                }
            </>
            :
            <section id='main-menu'>
                <button 
                    className='main-button button-box-shadow gray-button-style'
                    onClick={() => startQuiz()}
                >Start quiz</button>
            </section>
            }
        </main>
    </>
}
