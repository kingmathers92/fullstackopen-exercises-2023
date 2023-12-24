import Title from "./Title";

const Anecdote = ({ anecdote, vote, text }) => {
  return (
    <div>
      <Title text={text} />
      <p>{anecdote}</p>
      <p>This anecdote has {vote} votes.</p>
    </div>
  );
};

export default Anecdote;
