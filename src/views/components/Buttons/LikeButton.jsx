import React, { useState } from 'react'
import axios from 'axios'
// No longer importing component-specific CSS

const LikeButton = ({ postId, initialIsLiked = false }) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [loading, setLoading] = useState(false)

  const handleLikeAction = async () => {
    if (!postId) {
      console.error('Missing post ID:', postId)
      return
    }

    setLoading(true)
    try {
      console.log('Handling like action for post:', postId) // Debug log

      if (isLiked) {
        await axios.delete(`/api/posts/${postId}/disliked`, {
          withCredentials: true,
          baseURL: 'http://localhost:3001'
        })
      } else {
        await axios.post(`/api/posts/${postId}/liked`, {}, {
          withCredentials: true,
          baseURL: 'http://localhost:3001'
        })
      }

      setIsLiked(!isLiked)
    } catch (error) {
      console.error('Like action failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLikeAction}
      disabled={loading}
      className={`action-button like-button ${isLiked ? 'active' : ''} ${loading ? 'button-loading' : ''}`}
    >
      <svg className="button-icon" viewBox="0 0 24 24">
        {isLiked ? (
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        ) : (
          <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
        )}
      </svg>
      <span className="action-button-text">Like</span>
    </button>
  )
}

export default LikeButton