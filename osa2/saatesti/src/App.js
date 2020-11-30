import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'





function App() {
  const [weather, setWeather] = useState([])


  useEffect(() => {
  
         axios
          .get(`http://api.weatherstack.com/current?access_key=fc35064eafd56f334478558db6a50a53&query=Helsinki`)
          .then(response => {
            setWeather(response.data);
          });
      }, []);


  return (
    <div>
      <p>weather in: {weather.current.temperature}</p>
      <p>weather: {weather.current.wind_speed}</p>

    </div>
  );
}

export default App;
