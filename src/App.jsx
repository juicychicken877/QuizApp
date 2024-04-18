import { useState, useEffect } from 'react';
import Header from "./components/Header.jsx";
import ProgressBar from './components/ProgressBar.jsx';
import { QUESTION_ARRAY } from "./data.js";

/* Time in miliseconds */
const QUESTION_TIME = 10000;

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
            scoreCount: 0,
            answers: []
        }
    );

    useEffect(() => {
        setCurrentQuestion(getRandomObject(avaliableQuestions));
    }, [avaliableQuestions]);

    const checkAnswer = (answer) => {
        let addition = answer === currentQuestion.correctAnswer && 1;
            
        setPlayerScore(prevPlayerScore => {
            return {
                scoreCount: prevPlayerScore.scoreCount + addition,
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
            scoreCount: 0,
            answers: []
        })
    }

    return <>
        <Header></Header>
        <main>
            {gameStarted ? <> 
                {/* Quiz */}
                {avaliableQuestions.length !== 0 && <>
                        <ProgressBar 
                            TIME={QUESTION_TIME} 
                            currentQuestion={currentQuestion}
                        />

                        <button
                            className='restart-button background-gradient button-box-shadow'
                            onClick={() => restartGame()}
                        >
                            <span class="material-symbols-outlined">restart_alt</span>
                        </button>

                        <h3>{ currentQuestion.question }</h3>

                        <section id="answers">
                            {randomizeArray(currentQuestion.answers).map(item => {
                                return <button 
                                    className='button-box-shadow answer-button background-gradient' 
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
                    <h3>Your score: { playerScore.scoreCount } / {QUESTION_ARRAY.length}</h3>

                    <button
                            className='restart-button background-gradient button-box-shadow'
                            onClick={() => restartGame()}
                        >
                            <span class="material-symbols-outlined">restart_alt</span>
                    </button>
                    
                    <section id='player-answers'>
                        {playerScore.answers.map(item => {
                            return <div key={item.question} className='player-answer'>
                                <h4>{item.question}</h4>
                                <span>Your answer: {item.answer}</span> <br />
                                <span>Correct answer: {item.correctAnswer}</span>
                            </div>
                        })}
                    </section>
                </>

                }
            </>
            :
            <section id='main-menu'>
            <button 
                className='main-button button-box-shadow background-gradient'
                onClick={() => startQuiz()}
            >Start quiz</button>
            <button
                className='main-button button-box-shadow background-gradient'
            >Change Language</button>
            </section>
            }
        </main>
    </>
}
