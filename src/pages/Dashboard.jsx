import { useState } from 'react'

function Dashboard({ user }) {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const addTask = () => {
    if (input === '') return

    const newTask = {
      id: Date.now(),
      text: input
    }

    setTasks([...tasks, newTask])
    setInput('')
  }

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome {user.username}</h1>

      <h2>Your Tasks</h2>

      <div>
        <input
          type="text"
          placeholder="add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              {task.text}
              <button onClick={() => deleteTask(task.id)}>
                delete
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Dashboard