import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (newBlog, headers) => {
  const request = axios.post(baseUrl,newBlog,{ headers:headers })
  return request.then(response => response.data)
}

const updateBlog = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const deleteBlog = async (id, headers) => {
  const response = await axios.delete(`${baseUrl}/${id}`,{ headers:headers })
  return response.data
}

export default { getAll, createBlog, updateBlog, deleteBlog }