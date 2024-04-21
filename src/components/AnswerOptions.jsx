export default function AnswerOptions({ answerOptionArray, checkAnswer }) {
    return <section id="answers">
        {answerOptionArray.map(item => {
            return <button 
                className='button-box-shadow answer-button gray-button-style' 
                onClick={() => checkAnswer(item)}
                key={item}
            >
                {item}
            </button>
        })}
    </section>
}