import React, { useState, useEffect } from 'react'
import axios from 'axios'



const CountryWithWeather = ({ country, filteredCountries }) => {

    //Säätietojen hakeminen
  
    const [weather, setWeather] = useState(null)
  
    useEffect(() => {
  
      const capital = filteredCountries.map(country => country.capital);
  
      axios
        .get(`http://api.weatherstack.com/current?access_key=6ead52662f7091a49b7f1d0d7ebbd69c&query=${capital[0]}`)
        .then(response => {
          setWeather(response.data);
        })
    }, [filteredCountries])
    
    if (weather !== null) {
    return (
      <div>
        <h2>{country.name}</h2>
        <p><b>Capital:</b> {country.capital}</p>
        <p><b>Population:</b> {country.population}</p>
        <h3><b>Languages:</b></h3>
        <ul>
          {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <br></br>
        <p></p>
        <img src={country.flag} width="120px" alt="" />
        <h3>Weather in {country.capital}</h3>
        <img scr={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}></img>
        <p><b>Temperature:</b> {weather.current.temperature}°C</p>
        <p><b>Wind speed:</b> {weather.current.wind_speed} km/h, direction {weather.current.wind_dir}</p>
  
      </div>
    )}
    return (
      <div>Loading country information.</div>
    )
  }

  export default CountryWithWeather