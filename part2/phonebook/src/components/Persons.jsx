import service from "../services/notes";

export const Persons = (props) => {
  const { persons, setPersons, searchName } = props;

  const handleDelete = (id) => {
    const message = `Delete ${id}`;

    if (window.confirm(message)) {
      service.delete(id);
      service.getAll().then((data) => setPersons(data));
    }
  };

  const filteredPersons = Array.isArray(persons)
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : [];

  return (
    <div>
      {filteredPersons
        .filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        )
        .map((person) => (
          <div key={person.id}>
            <table>
              <tbody>
                <tr>
                  <td>{person.name}</td>
                  <td>{person.number}</td>
                  <td>
                    <button onClick={handleDelete(person.id)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};
