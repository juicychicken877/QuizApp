export default function Stats({ playerScore, QUESTION_ARRAY }) {
    return <section id='stats'>
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
}