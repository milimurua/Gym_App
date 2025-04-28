import React from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, onAnswer }) => {
  return (
    <div style={{
        backgroundColor: '#87CEEB',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        width: '100%',
      }}>

      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#AFEEEE',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;