import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weatherIcon, setWeatherIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const capital = country.capital;
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`;

    axios.get(weatherUrl).then((response) => {
      setWeatherIcon(response.data.current.weather_icons[0]);
      setTemperature(response.data.current.temperature);
      setWindSpeed(response.data.current.wind_speed);
      setWindDirection(response.data.current.wind_dir);
    });
  }, [country, apiKey]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <label>Languages: </label>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        className="flag"
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
      />
      <div>
        <h3>Weather in {country.capital}</h3>
        <div>
          <div>
            <h4>temperature</h4>
            <div>{temperature} Celcius</div>
            <img src={weatherIcon} alt="Weather Icon" width="30%" />
          </div>
          <div>
            <h4>wind</h4>
            <div>Speed: {windSpeed} mph</div>
            <div>Direction: {windDirection}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
