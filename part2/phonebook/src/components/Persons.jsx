export const Persons = (props) => {
  const { persons, searchName } = props;
  return (
    <div>
      {persons
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
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};
