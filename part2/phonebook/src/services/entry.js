import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`http://localhost:3001/api/persons/${id}`)
  return request.then(response => {
    console.log('Resource deleted:', response.data);
  })
}

const update = (id, newObject) => {
  const request = axios.put(`http://localhost:3001/api/persons/${id}`, newObject)
  return request.then(response => response.data)
}


export default {getAll, create, remove, update}