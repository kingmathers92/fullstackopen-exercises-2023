import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";

function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

  useEffect(() => {
    axios.get(url).then((res) => {
      setCountries(res.data);
    });
  }, [url]);

  const handleSearchChange = (query) => {
    setSearchCountry(query);
  };

  return (
    <div>
      <Filter handleSearchChange={handleSearchChange} />
      <CountryList countries={countries} searchCountry={searchCountry} />
    </div>
  );
}

export default App;
