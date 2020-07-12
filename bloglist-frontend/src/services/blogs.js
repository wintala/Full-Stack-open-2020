import axios from 'axios'

const baseUrl = '/api/blogs'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const createBlog = (newBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}`},
  }
  
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response =>  response.data)
}


const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}`},
  }
  axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, createBlog, update, deleteBlog }