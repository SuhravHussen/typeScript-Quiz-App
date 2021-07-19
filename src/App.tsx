import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Questioncard from "./Components/Questioncard";
import { Difficulty } from "./API";
import { fetchQuizQuestions, QuestionState } from "./API";

type answerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<answerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameover] = useState(true);

  console.log(questions);

  const statQuiz = async () => {
    setLoading(true);
    setGameover(false);

    const newQuestion = await fetchQuizQuestions(10, Difficulty.MEDIUM);

    setQuestions(newQuestion);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prv) => prv + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prv) => [...prv, answerObject]);
    }
  };
  const nextQuestion = () => {
    const nextQuestionn = number + 1;
    if (nextQuestionn === 10) {
      setGameover(true);
    } else {
      setNumber(nextQuestionn);
    }
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      {gameOver || userAnswer.length === 10 ? (
        <button className="start-button" onClick={statQuiz}>
          Start
        </button>
      ) : null}{" "}
      {!gameOver && <p className="score"> score: {score}</p>}
      {loading && <p>Loading Questions</p>}
      {!loading && !gameOver && (
        <Questioncard
          questionNumber={number + 1}
          totalQuestions={10}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        ></Questioncard>
      )}
      {!gameOver && !loading && userAnswer.length === number + 1 ? (
        <button className="next-btn" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default App;
