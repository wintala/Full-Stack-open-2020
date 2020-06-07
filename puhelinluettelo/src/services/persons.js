import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = id => {
  axios.delete(`${baseUrl}/${id}`)
}

const updateNumber = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
export default {create, deletePerson, updateNumber}