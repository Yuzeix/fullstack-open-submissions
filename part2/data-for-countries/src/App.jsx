import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({ country }) => { 
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
    </div>
  );
};

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>
          {country.name.common} 
        </li>
      ))}
    </ul>
  );
};

function App() {
  const [searchCountry, setsearchCountry] = useState('')
  const [countries, setCountries] = useState([]);

  const hanledSearchChange = (event) => {
    setsearchCountry(event.target.value)
  }


  useEffect(() => {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data);
        });
    }, []);

  const filteredCountries = searchCountry 
  ? countries.filter(country => 
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    ) : [];

  let showCountries;

    if (filteredCountries.length > 10) {
      showCountries = <div>Too many matches, specify another filter</div>;
    } else if (filteredCountries.length > 1) {
      showCountries = ( <CountryList countries={filteredCountries} /> );
    } else if (filteredCountries.length === 1) {
      showCountries = <CountryDetails country={filteredCountries[0]} />;
    } else if (showCountries && filteredCountries.length === 0) {
      showCountries = <div>No countries found</div>;
    } else {
      showCountries = null;
    }
    
  return (
    <div>
      find countries: <input value={searchCountry} onChange={hanledSearchChange} />
      {showCountries}
    </div>
  )
}

export default App
