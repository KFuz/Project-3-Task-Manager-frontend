import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/tasks`
const COMMENTS_URL = `${import.meta.env.VITE_BACKEND_URL}/comments`

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
  const response = await axios.get(COMMENTS_URL, {
    headers: getAuthHeaders(),
  })

  return response.data.filter((comment) => {
    const commentTaskId = comment.Task?._id || comment.Task
    return commentTaskId === taskId
  })
}

const addComment = async (taskId, commentData) => {
  const response = await axios.post(
    COMMENTS_URL,
    {
      Content: commentData.text,
      Task: taskId,
    },
    {
      headers: getAuthHeaders(),
    }
  )

  return response.data
}

const updateComment = async (commentId, commentData) => {
  const response = await axios.put(
    `${COMMENTS_URL}/${commentId}`,
    {
      Content: commentData.text,
    },
    {
      headers: getAuthHeaders(),
    }
  )

  return response.data
}

const deleteComment = async (commentId) => {
  await axios.delete(`${COMMENTS_URL}/${commentId}`, {
    headers: getAuthHeaders(),
  })
}


export { getAllTasks, createTask, updateTask, deleteTask, getComments, addComment, updateComment, deleteComment }
