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

    return <>
        <Header></Header>
        <div id="quiz">
            {/* Quiz */}
            {avaliableQuestions.length !== 0 && <>
                    <ProgressBar 
                        TIME={QUESTION_TIME} 
                        currentQuestion={currentQuestion}
                    />
                    <h3>{ currentQuestion.question }</h3>

                    <section id="answers">
                        {randomizeArray(currentQuestion.answers).map(item => {
                            return <button 
                                className='button-box-shadow' 
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
                <section id='playerAnswers'>
                    {playerScore.answers.map(item => {
                        return <div key={item.question} className='playerAnswer'>
                            <h4>{item.question}</h4>
                            <span>Your answer: {item.answer}</span> <br />
                            <span>Correct answer: {item.correctAnswer}</span>
                        </div>
                    })}
                </section>
            </>

            }
        </div>
    </>
}
