import axios from 'axios'


const getAll = (capital, key) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}`)
  return request.then(response => response.data)
}



export default {getAll}