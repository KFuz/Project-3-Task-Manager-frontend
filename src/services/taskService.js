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

//Comments

const getComments = async (taskId) => {
  const response = await axios.get(`${BASE_URL}/${taskId}/comments`, {
    headers: getAuthHeaders()
  })
  return response.data.comments
}

const addComment = async (taskId, commentData) => {
  const response = await axios.post(
    `${BASE_URL}/${taskId}/comments`,
    commentData,
    {
      headers: getAuthHeaders()
    }
  )
  return response.data.comment
}

const updateComment = async (commentId, commentData) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/comments/${commentId}`,
    commentData,
    {
      headers: getAuthHeaders()
    }
  )
  return response.data.comment
}

const deleteComment = async (commentId) => {
  await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/comments/${commentId}`,
    {
      headers: getAuthHeaders()
    }
  )
}

export { getAllTasks, createTask, updateTask, deleteTask, getComments, addComment, updateComment, deleteComment }
