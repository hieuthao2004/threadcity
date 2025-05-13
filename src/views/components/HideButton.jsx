import React, { useState } from 'react'
import axios from 'axios'


const HideButton = ({ postId, onHideSuccess }) => {
  const [loading, setLoading] = useState(false)

  const handleHide = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        `http://localhost:3001/api/posts/${postId}/hide`,
        {},
        { withCredentials: true }
      )

      if (response.data.hidden) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error hiding post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      className="hide-button"
      onClick={handleHide}
      disabled={loading}
    >
      {loading ? 'Hiding...' : 'Hide'}
    </button>
  )
}

export default HideButton