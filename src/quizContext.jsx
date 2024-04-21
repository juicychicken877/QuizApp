import { createContext } from 'react';

export const QuizCtx = createContext({
    restartGame: () => {},
    checkAnswer: () => {},
    startQuiz: () => {},
    time: 0,
    currentQuestion: {},
    playerScore: {},
    QUESTION_ARRAY: {}
});

export default function QuizContextProvider({ children, value }) {
    return <QuizCtx.Provider value={value}>
        {children}
    </QuizCtx.Provider>
}