import { Person } from "./Person";

export const Persons = (props) => {
  const { persons, searchName, setPersons } = props;

  return (
    <div>
      <table>
        <tbody>
          {persons.map((person) => {
            if (
              searchName.length === 0 ||
              person.name.search(searchName) !== -1
            ) {
              return (
                <Person
                  key={person.id}
                  person={person}
                  setPersons={setPersons}
                />
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};
