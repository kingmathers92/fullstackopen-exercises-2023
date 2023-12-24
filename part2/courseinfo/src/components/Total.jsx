const Total = (props) => {
  const total = props.exercises.reduce((a, b) => a + b);

  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

export default Total;
