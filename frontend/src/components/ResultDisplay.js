import React, { useEffect, useState } from "react";

const ResultDisplay = ({ result }) => {
  const [dailyTip, setDailyTip] = useState("");

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    fetch(`${baseUrl}/api/daily-tip`)
      .then((res) => res.json())
      .then((data) => setDailyTip(data.tip))
      .catch((err) => console.error("Failed to fetch daily tip:", err));
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
