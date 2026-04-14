import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/tasks`

const getToken = () => {
  return localStorage.getItem('token')
}

const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`
  }
}

const getAllTasks = async () => {
  const response = await axios.get(BASE_URL, {
    headers: getAuthHeaders()
  })
  return response.data.tasks
}

const createTask = async (taskData) => {
  const response = await axios.post(BASE_URL, taskData, {
    headers: getAuthHeaders()
  })
  return response.data.task
}

const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${BASE_URL}/${taskId}`, taskData, {
    headers: getAuthHeaders()
  })
  return response.data.task
}

const deleteTask = async (taskId) => {
  await axios.delete(`${BASE_URL}/${taskId}`, {
    headers: getAuthHeaders()
  })
}

export { getAllTasks, createTask, updateTask, deleteTask }