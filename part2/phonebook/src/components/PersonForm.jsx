export const PersonForm = (props) => {
  const {
    handleSubmitForm,
    newName,
    number,
    handleNameChange,
    handleNumberChange,
  } = props;

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
