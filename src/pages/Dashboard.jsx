import { useEffect, useState } from 'react'
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from '../services/taskService'

function Dashboard({ user }) {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editedTaskName, setEditedTaskName] = useState('')

  useEffect(() => {
    async function fetchTasks() {
      try {
        const foundTasks = await getAllTasks()
        setTasks(foundTasks)
      } catch (err) {
        console.log(err)
        setErrorMessage('Could not load tasks')
      }
    }

    fetchTasks()
  }, [])

  const handleAddTask = async () => {
    if (!input.trim()) return

    try {
      const newTask = await createTask({
        taskName: input,
        taskStatus: 'To Do'
      })

      setTasks([newTask, ...tasks])
      setInput('')
    } catch (err) {
      console.log(err)
      setErrorMessage('Could not add task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      const filteredTasks = tasks.filter((task) => task._id !== taskId)
      setTasks(filteredTasks)
    } catch (err) {
      console.log(err)
      setErrorMessage('Could not delete task')
    }
  }

  const handleStatusChange = async (task) => {
    let newStatus = 'To Do'

    if (task.taskStatus === 'To Do') {
      newStatus = 'In Progress'
    } else if (task.taskStatus === 'In Progress') {
      newStatus = 'Complete'
    } else {
      newStatus = 'To Do'
    }

    try {
      const updatedTask = await updateTask(task._id, {
        taskName: task.taskName,
        taskStatus: newStatus
      })

      const updatedTasks = tasks.map((oneTask) =>
        oneTask._id === task._id ? updatedTask : oneTask
      )

      setTasks(updatedTasks)
    } catch (err) {
      console.log(err)
      setErrorMessage('Could not update task')
    }
  }

  const handleStartEdit = (task) => {
    setEditingTaskId(task._id)
    setEditedTaskName(task.taskName)
  }

  const handleSaveEdit = async (task) => {
    if (!editedTaskName.trim()) return

    try {
      const updatedTask = await updateTask(task._id, {
        taskName: editedTaskName,
        taskStatus: task.taskStatus
      })

      const updatedTasks = tasks.map((oneTask) =>
        oneTask._id === task._id ? updatedTask : oneTask
      )

      setTasks(updatedTasks)
      setEditingTaskId(null)
      setEditedTaskName('')
    } catch (err) {
      console.log(err)
      setErrorMessage('Could not update task name')
    }
  }

  const handleCancelEdit = () => {
    setEditingTaskId(null)
    setEditedTaskName('')
  }

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.heading}>Welcome, {user.username}</h1>
        <p style={styles.text}>Here you can keep track of your tasks.</p>

        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="write a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAddTask} style={styles.addBtn}>
            Add
          </button>
        </div>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <div style={styles.taskArea}>
          {tasks.length === 0 ? (
            <p style={styles.empty}>No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} style={styles.taskCard}>
                <div style={styles.leftSide}>
                  {editingTaskId === task._id ? (
                    <input
                      type="text"
                      value={editedTaskName}
                      onChange={(e) => setEditedTaskName(e.target.value)}
                      style={styles.editInput}
                    />
                  ) : (
                    <p
                      style={{
                        ...styles.taskTitle,
                        textDecoration:
                          task.taskStatus === 'Complete' ? 'line-through' : 'none',
                        opacity: task.taskStatus === 'Complete' ? 0.6 : 1,
                      }}
                    >
                      {task.taskName}
                    </p>
                  )}

                  <p
                    style={{
                      ...styles.statusText,
                      backgroundColor:
                        task.taskStatus === 'Complete'
                          ? '#d8ead3'
                          : task.taskStatus === 'In Progress'
                          ? '#f6e7b2'
                          : '#efe4c8',
                    }}
                  >
                    {task.taskStatus}
                  </p>
                </div>

                <div style={styles.btnGroup}>
                  {editingTaskId === task._id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(task)}
                        style={styles.doneBtn}
                      >
                        Save
                      </button>

                      <button
                        onClick={handleCancelEdit}
                        style={styles.cancelBtn}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleStatusChange(task)}
                        style={styles.doneBtn}
                      >
                        Change Status
                      </button>

                      <button
                        onClick={() => handleStartEdit(task)}
                        style={styles.editBtn}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f5efe6',
    padding: '40px 20px',
  },
  box: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff7d6',
    padding: '30px',
    borderRadius: '18px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  heading: {
    color: '#1f1f1f',
    marginBottom: '8px',
    textAlign: 'center',
  },
  text: {
    color: '#444',
    marginBottom: '25px',
    textAlign: 'center',
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px',
  },
  input: {
    flex: 1,
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #d6c7a1',
    backgroundColor: '#ffffff',
    color: '#1f1f1f',
    outline: 'none',
  },
  addBtn: {
    backgroundColor: '#f6e7b2',
    color: '#1f1f1f',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  error: {
    color: '#b00020',
    marginBottom: '16px',
  },
  taskArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  empty: {
    color: '#555',
    textAlign: 'center',
    marginTop: '20px',
  },
  taskCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #eee2bc',
    borderRadius: '12px',
    padding: '14px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  taskTitle: {
    margin: 0,
    color: '#1f1f1f',
    fontSize: '16px',
  },
  statusText: {
    margin: 0,
    color: '#444',
    fontSize: '13px',
    padding: '4px 10px',
    borderRadius: '20px',
    display: 'inline-block',
    width: 'fit-content',
  },
  btnGroup: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  doneBtn: {
    backgroundColor: '#f6e7b2',
    color: '#1f1f1f',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  editBtn: {
    backgroundColor: '#efe4c8',
    color: '#1f1f1f',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#d9d9d9',
    color: '#1f1f1f',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#1f1f1f',
    color: '#ffffff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  editInput: {
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid #d6c7a1',
    backgroundColor: '#ffffff',
    color: '#1f1f1f',
    outline: 'none',
    minWidth: '220px',
  },
}

export default Dashboard