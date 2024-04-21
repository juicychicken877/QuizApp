import { useContext } from 'react';
import { QuizCtx } from "../quizContext"

export default function MainMenu() {
    const { startQuiz } = useContext(QuizCtx);
    
    return <section id='main-menu'>
        <button 
            className='main-button button-box-shadow gray-button-style'
            onClick={() => startQuiz()}
        >Start quiz</button>
    </section>
}