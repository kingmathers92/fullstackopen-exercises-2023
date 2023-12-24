import StatisticLine from "./StatisticLine";
import Title from "./Title";

const Statistics = ({ good, neutral, bad, text }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positivePercentage = (good / total) * 100 || 0;

  return (
    <div>
      <br />
      <Title text={text} />
      <br />
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive %" value={positivePercentage} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
