import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (newBlog, headers) => {
  const request = axios.post(baseUrl,newBlog,{headers:headers})
  return request.then(response => response.data)
}

export default { getAll, createBlog }