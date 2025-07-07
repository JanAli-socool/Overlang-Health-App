import React, { useEffect, useState } from "react";

const ResultDisplay = ({ result }) => {
  const [dailyTip, setDailyTip] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/daily-tip")
      .then((res) => res.json())
      .then((data) => setDailyTip(data.tip));
  }, []);

  return (
    <div>
      <h2>Your Health Plan</h2>
      <p><strong>Goal:</strong> {result.goal}</p>
      <p><strong>Tip:</strong> {result.tip}</p>
      <p><strong>Products:</strong> {result.products.join(", ")}</p>
      <hr />
      <p><strong>Daily Tip:</strong> {dailyTip}</p>
    </div>
  );
};

export default ResultDisplay;
