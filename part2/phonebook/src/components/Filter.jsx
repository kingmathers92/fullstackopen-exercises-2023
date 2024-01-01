export const Filter = (props) => {
  const { searchName, setSearchName } = props;

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };
  return (
    <div>
      Search: <input value={searchName} onChange={handleSearchChange} />
    </div>
  );
};
