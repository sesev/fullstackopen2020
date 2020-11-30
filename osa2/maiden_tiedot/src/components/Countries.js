import CountryWithWeather from  './CountryWithWeather'
import React from 'react'


const Countries = ({ countries, search, setSearch }) => {

    const filteredCountries = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
  
  
    if (filteredCountries.length === 1) {
  
      return (
        <div>
          {filteredCountries.map(country => {
            console.log(countries)
            return <CountryWithWeather key={country.name} country={country} filteredCountries={filteredCountries} />
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
  
  export default Countries