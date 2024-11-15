import { useState, useEffect } from 'react';
import entry from './services/entry';
import weather from './services/weather';
import axios from 'axios';
import SearchForm from './components/searchForm';
import Country from './components/country';
const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [chosenCountry, setChosenCountry] = useState(null)
  const [newWeather, setNewWeather] = useState(null)
  const [weatherError, setWeatherError]= useState(null)

  useEffect(() => {
    if(newSearch.trim()===''){
      setCountries([]);
      return;
    }

    entry
      .getAll(newSearch)
      .then(response => {
        setCountries(response || []);
        
    })
      .catch(error => console.error('Error fetching countries:', error));
  }, [newSearch])
    const api_key = import.meta.env.VITE_SOME_KEY
    
    useEffect(() => {
      if (!chosenCountry) return;
    
      const api_key = import.meta.env.VITE_SOME_KEY;
    
      weather
        .getAll(chosenCountry.capital[0], api_key)
        .then(response => {
          setNewWeather(response);
          setWeatherError(null);
        })
        .catch(error => {
          console.error('Error fetching weather data', error);
          setNewWeather(null);
          setWeatherError('Error fetching weather data');
        });
    }, [chosenCountry]);
  
  const handleShowButton = (country) => (
    setChosenCountry(country)
  )

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
    
  }

  return (
    <div>
      <h2>Country Search</h2>
      <SearchForm 
        newSearch={newSearch}
        handleSearchChange = {handleSearchChange}    
        />
      <ul>

      </ul>
      {newSearch.trim() === '' ? null : countries.length > 10 ? (
        <p>Too many countries, please make your search more specific</p>
      ) : countries.length >= 1 ? (
        countries.map(country => (
          <Country key={country.cca3} name={country.name.common} handleShowButton={handleShowButton} country={country}/>
        ))
      ) : null}
      
      {chosenCountry && (
        <div>
        <h2>{chosenCountry.name.common}</h2>
        
        <h3>languages: </h3>
        <ul>
        {Object.values(chosenCountry.languages).map((language, index) => (
        <li key={index}>{language}</li>
      ))}
        </ul>
        <img 
        src={chosenCountry.flags.png}
        
         />
        {
        newWeather && (
        <>
          <h3> Weather in {chosenCountry.capital[0]}</h3>
          <p> Temperature: {(newWeather.main.temp - 273.15).toFixed(2)}°C, feels like: {(newWeather.main.feels_like - 273.15).toFixed(2)}°C</p>
          <p>{newWeather.weather[0].description}</p>
          <img src = {`http://openweathermap.org/img/wn/${newWeather.weather[0].icon}.png`} alt = "Icon" width="100" height="120" ></img>
        </>
        )}
        {weatherError && <p>{weatherError}</p>}
        </div>
      ) }
    </div>
  );
};

export default App;