import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const API_KEY = import.meta.env.VITE_SOME_KEY

const getAll = () => {
  return axios.get(`${baseUrl}/api/all`)
}

const getOne = name => {
  return axios.get(`${baseUrl}/api/name/${name}`)
}

const getWeather = countryCapital => {
    return axios.get(`https://api.openweathermap.org/data/2.5/find?q=${countryCapital}&units=metric&APPID=${API_KEY}`)
}

export default { 
  getAll: getAll, 
  getOne: getOne,
  getWeather: getWeather
}