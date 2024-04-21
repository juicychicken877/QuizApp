import { useContext } from 'react';
import { QuizCtx } from '../quizContext';
import geralt from '../assets/GeraltThumbsUp.png';
// Components
import RestartButton from './RestartButton.jsx';
import Stats from './Stats.jsx';
import PlayerAnswers from './PlayerAnswers.jsx';

export default function Outro() {
    const { restartGame, playerScore, QUESTION_ARRAY } = useContext(QuizCtx);

    return <>
        <RestartButton 
            onClick={() => restartGame()}
        />

        <h3 className='end-quiz-header'>Quiz completed!</h3>
        
        <img src={geralt}></img>
        
        <Stats 
            playerScore={playerScore}
            QUESTION_ARRAY={QUESTION_ARRAY}
        />

        <hr />
        
        <PlayerAnswers 
            playerScore={playerScore}
        />
    </>
}