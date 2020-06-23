import axios from 'axios'
const baseUrl = '/api/persons'


const allPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

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
export default {create, deletePerson, updateNumber, allPersons}