export default function PlayerAnswers({ playerScore }) {
    return <section id='player-answers'>
        {playerScore.answers.map(item => {
            return <div key={item.question} className='player-answer'>
                <h4>{item.question}</h4>
                <span
                    className={item.answer === item.correctAnswer ? 'correct-answer-color' : 'incorrect-answer-color'}
                >{item.answer}</span>
            </div>
        })}
    </section>
}