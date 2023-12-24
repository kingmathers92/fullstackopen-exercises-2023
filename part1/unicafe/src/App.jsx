import { useState } from "react";
import Title from "./components/Title";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <br />
      <Title text="Give Feedback" />
      <br />
      <Button onClick={handleGoodClick} text="Good" value={good} />
      <Button onClick={handleNeutralClick} text="Neutral" value={neutral} />
      <Button onClick={handleBadClick} text="Bad" value={bad} />
      {good !== 0 || neutral !== 0 || bad !== 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          text={"Statistics"}
        />
      ) : (
        <p>No feedback given yet.</p>
      )}
    </div>
  );
};

export default App;
