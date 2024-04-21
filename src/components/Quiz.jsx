import { useContext } from "react"
import { randomizeArray } from "../support.js"
import { QuizCtx } from "../quizContext.jsx"
// Components
import ProgressBar from "./ProgressBar.jsx"
import RestartButton from "./RestartButton.jsx"
import AnswerOptions from "./AnswerOptions.jsx"

export default function Quiz() {
    const { restartGame, checkAnswer, time, currentQuestion } = useContext(QuizCtx);

    return <>
        <ProgressBar 
            TIME={time} 
            currentQuestion={currentQuestion}
            checkAnswer={checkAnswer}
        />

        <RestartButton 
            onClick={() => restartGame()}
        />

        <h3>{ currentQuestion.question }</h3>

        <AnswerOptions 
            answerOptionArray={randomizeArray(currentQuestion.answers)}
            checkAnswer={checkAnswer}
        />
    </>
}