import { useState, useEffect } from "react"
import {
  getComments,
  addComment,
  updateComment,
  deleteComment
} from "../services/taskService"

function Comments({ taskId }) {
  const [comments, setComments] = useState([])
  const [text, setText] = useState("")
  const [editId, setEditId] = useState(null)

useEffect(() => {
    getComments(taskId).then((data) => {
        setComments(data)
    })
}, [taskId])

const handleSubmit = async (e) => {
  e.preventDefault()

  if (editId) {
    const updated = await updateComment(editId, { text })

    setComments(
      comments.map(c => c._id === editId ? updated : c)
    )

    setEditId(null)
  } else {
    const newComment = await addComment(taskId, { text })
    setComments([...comments, newComment])
  }

 setText("")
}

const handleDelete = async (id) => {
  await deleteComment(id)
  setComments(comments.filter(c => c._id !== id))
}

const handleEdit = (comment) => {
  setText(comment.Content)
  setEditId(comment._id)
}

  return (
  <div>
    <h4>Comments</h4>

    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write comment"
      />
      <button>{editId ? "Update" : "Add"}</button>
    </form>

    {comments.map((c) => (
      <div key={c._id}>
        <p>{c.Content}</p>

        <button onClick={() => handleEdit(c)}>Edit</button>
        <button onClick={() => handleDelete(c._id)}>Delete</button>
      </div>
    ))}
  </div>
)
}

export default Comments