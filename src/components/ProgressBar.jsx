import { useState, useEffect } from 'react';

export default function ProgressBar({ TIME, currentQuestion }) {
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

    let progress = remainingTime / TIME;

    return <progress value={progress}></progress>
}