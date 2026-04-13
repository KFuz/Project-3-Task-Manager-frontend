import { useState } from 'react'

function Dashboard({ user }) {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const handleAddTask = () => {
    if (!input.trim()) return

    const newTask = {
      id: Date.now(),
      title: input,
      done: false,
    }

    setTasks([...tasks, newTask])
    setInput('')
  }

  const handleDeleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(filteredTasks)
  }

  const handleToggleDone = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, done: !task.done }
      }
      return task
    })

    setTasks(updatedTasks)
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

        <div style={styles.taskArea}>
          {tasks.length === 0 ? (
            <p style={styles.empty}>No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} style={styles.taskCard}>
                <div>
                  <p
                    style={{
                      ...styles.taskTitle,
                      textDecoration: task.done ? 'line-through' : 'none',
                      opacity: task.done ? '0.6' : '1',
                    }}
                  >
                    {task.title}
                  </p>
                </div>

                <div style={styles.btnGroup}>
                  <button
                    onClick={() => handleToggleDone(task.id)}
                    style={styles.doneBtn}
                  >
                    {task.done ? 'Undo' : 'Done'}
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
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
  },
  text: {
    color: '#444',
    marginBottom: '25px',
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
  },
  taskTitle: {
    margin: 0,
    color: '#1f1f1f',
    fontSize: '16px',
  },
  btnGroup: {
    display: 'flex',
    gap: '8px',
  },
  doneBtn: {
    backgroundColor: '#f6e7b2',
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
}

export default Dashboard