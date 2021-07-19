import React from "react";

type NewType = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  totalQuestions: number;
};

const Questioncard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}: NewType) => {
  return (
    <div>
      <p className="number">
        {" "}
        Question: {questionNumber}/ {totalQuestions}
      </p>
      <p>{question}</p>
      <div>
        {answers.map((answer) => (
          <button disabled={userAnswer} value={answer} onClick={callback}>
            <span>{answer}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questioncard;
