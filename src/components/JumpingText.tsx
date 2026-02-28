import { useState } from 'react';
import type { FC } from 'react';

interface JumpingWordProps {
    word: string;
}

const JumpingWord: FC<JumpingWordProps> = ({ word }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent bubbling if needed
        if (isAnimating) return;
        setIsAnimating(true);
        // 1500ms is enough for even long words with 50ms stagger
        setTimeout(() => setIsAnimating(false), 1500);
    };

    return (
        <span className="jumping-word" onClick={handleClick} style={{ cursor: 'pointer' }}>
            {word.split('').map((char, index) => (
                <span
                    key={`${word}-${index}`}
                    className={`jumping-letter ${isAnimating ? 'animate-jump' : ''}`}
                    style={{
                        animationDelay: isAnimating ? `${index * 50}ms` : '0ms',
                        marginRight: char === ' ' ? '0.2em' : '0',
                        display: 'inline-block'
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

interface JumpingTextProps {
    text: string;
}

const JumpingText: FC<JumpingTextProps> = ({ text }) => {
    // Support both strings and nested text
    const words = text.split(/(\s+)/); // Preserve spaces

    return (
        <>
            {words.map((word, index) => (
                word.trim() === '' ? (
                    <span key={index}>{word}</span>
                ) : (
                    <JumpingWord key={index} word={word} />
                )
            ))}
        </>
    );
};

export default JumpingText;
