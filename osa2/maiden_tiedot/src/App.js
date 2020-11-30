import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Filter = ({ setSearch, handleSearchChange }) => {
  return (
    <div>Filter countries: <input value={setSearch} onChange={handleSearchChange} /></div>
  )
}
//Maan tarkemmat tiedot + sää
const Country = ({ country, filteredCountries}) => {
  
  //Säätietojen hakeminen

  const [weather, setWeather] = useState('')

  useEffect(() => {
 
    const capital = filteredCountries.map(country => country.capital);
    
      axios
      .get(`http://api.weatherstack.com/current?access_key=6ead52662f7091a49b7f1d0d7ebbd69c&query=${capital[0]}`)
      .then(response => {
        setWeather(response.data);
      });
    
    }, [filteredCountries]) 
    console.log(weather.current)
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
    </div>
  )
}
//Maalistaus 
const Countries = ({ countries, search, setSearch }) => {

  const filteredCountries = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
  

  if (filteredCountries.length === 1) {

    return (
      <div>
        {filteredCountries.map(country => {
          console.log(countries)
          return <Country key={country.name} country={country} filteredCountries={filteredCountries} />
        })}
      </div>)
  }


  if (filteredCountries.length > 10 && search.length >= 1) {
    return (
      <div>Too many matches, add more letters to search</div>
    )
  }

  if (filteredCountries.length > 1 && filteredCountries.length < 11) {
    return (
      <ul className="Country">
        {filteredCountries.map(country =>
          <p key={country.name}>
            {country.name}
            <button id={country.name} onClick={() => {
              setSearch(country.name)
            }}> show
                        </button>
          </p>)}
      </ul>
    )
  }


  return (
    <div>
      {filteredCountries.map(country =>
        <ul key={country.name} country={country}>{country.name}</ul>)}
    </div>
  )
}




function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountry] = useState([])

  //Haetaan maat rajapinnasta
  useEffect(() => {
    console.log('maat')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('maat haettu')
        setCountry(response.data)
      })
  }, [setSearch])



  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <Countries countries={countries} search={search} setSearch={setSearch} />
    </div>
  )
}

export default App;
