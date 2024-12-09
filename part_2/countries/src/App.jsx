import { useState, useEffect } from 'react'
import connect from './services/connect'

const Search = ({searchTerm, handleSearchTerm}) => {
  return (<input type="text" placeholder='Search' value={searchTerm} onChange={handleSearchTerm}/>)
}

const CountryDetails = ({ country, weather }) => {
  const weatherData = weather && weather.list && weather.list.length > 0 ? weather.list[0] : null
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <img src={country.flags.png} alt={country.flags.alt} />
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      {weatherData ? (
        <>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Feels like: {weatherData.main.feels_like} °C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Wind: {weatherData.wind.deg} degrees, {weatherData.wind.speed} km/h</p>
        </>
      ) : (
        <p>No weather data available.</p>
      )}
    </>
  )
}

const ListOfCountries = ({filteredCountries, onSelectCountry, weather}) => {
  if(filteredCountries.length > 10) {
    return (
    <><p>Your search should be more specific.</p></>
  )}

  if(filteredCountries.length === 0) {
    return (
    <><p>No results found.</p></>
  )}

  // if (filteredCountries.length === 1) {
  //   const country = filteredCountries[0]
  //   return (
  //     <><CountryDetails country={country} weather={weather}/></>
  //   )
  // }

  return (
    <>
    <ul style={{ listStyleType: 'decimal'}}>
      {filteredCountries.map(country => (
        <li key={country.name.common}>{country.name.common}<button onClick={() => onSelectCountry(country)}>Show Details</button></li>
      ))}
    </ul>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [weather, setWeather] = useState('')
  useEffect(() => {
    connect.getAll().then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
      .catch(error=> ("Something went wrong", error))
  }, [])
  
  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
    if (event.target.value === '') {
      setSelectedCountry(null)
      setWeather(null)
    }
  }

  const handleSelectCountry = (country) => {
    setSelectedCountry(country)
    connect.getWeather(country.capital).then(response => {
      setWeather(response.data)
      console.log(response.data)
    })
    .catch(error => console.log("Could not fetch weather data", error))
}

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <Search searchTerm={searchTerm} handleSearchTerm={handleSearchTerm}/>
      <h2>List of Countries</h2>
      <ListOfCountries filteredCountries={filteredCountries} onSelectCountry={handleSelectCountry} weather={weather}/>
      {selectedCountry && <CountryDetails country={selectedCountry} weather={weather}/>}
    </div>
  )
}

export default App