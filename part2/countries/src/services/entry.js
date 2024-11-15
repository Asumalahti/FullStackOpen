import axios from 'axios'
const baseUrl = `https://restcountries.com/v3.1/name`

const getAll = (search) => {
  const request = axios.get(`https://restcountries.com/v3.1/name/${search}`)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(``)
  return request.then(response => {
    console.log('Resource deleted:', response.data);
  })
}

const update = (id, newObject) => {
  const request = axios.put(``, newObject)
  return request.then(response => response.data)
}


export default {getAll, create, remove, update}