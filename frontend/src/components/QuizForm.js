import React, { useState } from "react";
import ResultDisplay from "./ResultDisplay";

const questions = [
  "What's your current fitness level?",
  "What is your main health goal?",
  "How many days a week can you exercise?"
];

const QuizForm = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  const handleAnswer = (e) => {
    const updated = [...answers];
    updated[step] = e.target.value;
    setAnswers(updated);
  };

  const next = async () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      const res = await fetch("http://localhost:8000/api/health-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q1: answers[0],
          q2: answers[1],
          q3: answers[2]
        })
      });
      const data = await res.json();
      setResult(data);
      setShowBanner(true);
    }
  };

  return (
    <div>
      {result ? (
        <ResultDisplay result={result} />
      ) : (
        <>
          <h3>{questions[step]}</h3>
          <input
            type="text"
            value={answers[step]}
            onChange={handleAnswer}
            placeholder="Type your answer"
          />
          <button onClick={next}>Next</button>
        </>
      )}
      {showBanner && <div className="banner">🎉 You have earned a free 7-day health challenge!</div>}
    </div>
  );
};

export default QuizForm;
