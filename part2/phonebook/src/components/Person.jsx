import service from "../services/persons";

export const Person = (props) => {
  const { person, setPersons, setErrorMessage } = props;

  const handleDelete = async () => {
    const message = `Delete ${person.name}`;
    if (window.confirm(message)) {
      try {
        await service.delete(person.id);
        const updatedPersons = await service.getAll();
        setPersons(updatedPersons);
      } catch (error) {
        setErrorMessage(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }
  };

  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};
