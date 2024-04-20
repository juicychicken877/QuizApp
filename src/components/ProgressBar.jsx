import { useState, useEffect } from 'react';

export default function ProgressBar({ TIME, currentQuestion, checkAnswer }) {
    const [remainingTime, setRemainingTime] = useState(TIME);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 10);
        }, 10);

        return () => {
            clearInterval(interval);
            setRemainingTime(TIME);
        }
    }, [currentQuestion])

    useEffect(() => {
        if (remainingTime <= 0) {
            checkAnswer('SKIPPED');

            setRemainingTime(TIME);
        }
    }, [remainingTime])

    let progress = remainingTime / TIME;

    return <progress value={progress}></progress>
}