import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Filter = ({ setSearch, handleSearchChange }) => {
  return (
    <div>Filter countries: <input value={setSearch} onChange={handleSearchChange} /></div>
  )
}



const Countries = ({ countries, search, setSearch}) => {


  const Country = ({ country }) => {
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
        <img src={country.flag} width="120px" alt=""/>
      </div>
    )
  }



  const filteredCountries = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))

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

  if (filteredCountries.length === 1) {
    
    return (
      <div>
        {filteredCountries.map(country => {
          console.log(countries)
          return <Country key={country.name} country={country} />
        })}
      </div>)
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
  const [weather, setWeather] = useState([])



  useEffect(() => {
    console.log('maat')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('maat haettu')
        setCountry(response.data)
      })
  }, [])

const Weather = ({weather, setWeather, countries}) => {
  useEffect(() => {
    console.log('sää')
    axios
      .get('http://api.weatherstack.com/current?access_key=fc35064eafd56f334478558db6a50a53&query='+countries.capital)
      .then(response => {
        console.log('sää haettu')
        setWeather(response.data)
        console.log(weather)
      })
  }, [])

}

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
