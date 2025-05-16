import React, { useState } from 'react'
import axios from 'axios'

const DeleteButton = ({ postId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      setLoading(true)
      const response = await axios.put(
        `http://localhost:3001/api/posts/${postId}/softdelete`,
        {},
        { withCredentials: true }
      )

      if (response.data.success) {
        onDeleteSuccess(postId)
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      className="delete-button"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}

export default DeleteButton