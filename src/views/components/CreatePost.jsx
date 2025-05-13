import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'

const CreatePost = ({ onPostCreated }) => {
  // State management
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  // References
  const socketRef = useRef()
  const fileInputRef = useRef(null)

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io('http://localhost:3001')
    
    return () => {
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [])

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB')
        return
      }
      
      setFile(selectedFile)
      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  // Remove selected image
  const handleRemoveImage = () => {
    setFile(null)
    setPreviewUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Reset form state
  const resetForm = () => {
    setContent('')
    setFile(null)
    setPreviewUrl('')
    setError('')
    setSuccess('')
  }

  // Handle modal open/close
  const openCreatePostModal = () => {
    setShowModal(true)
  }
  
  const closeCreatePostModal = () => {
    setShowModal(false)
    resetForm()
  }

  // Submit handler for post creation
  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    
    if (!content.trim()) {
      setError('Content cannot be empty')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Create FormData to handle file upload
      const formData = new FormData()
      formData.append('content', content.trim())
      
      if (file) {
        formData.append('image', file)
      }
      
      console.log('Sending post data with' + (file ? '' : 'out') + ' image')
      
      const response = await axios.post(
        'http://localhost:3001/api/create_post', 
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      console.log('Server response:', response.data)
      
      if (response.status === 200) {
        // Emit event with new post data
        socketRef.current.emit('new_post', response.data.post)
        
        // Reset form
        setContent('')
        setFile(null)
        setPreviewUrl('')
        setSuccess('Post created successfully!')
        
        // Call the callback to refresh posts
        if (onPostCreated) {
          onPostCreated(response.data.post)
        }
        
        // Close modal if open
        if (showModal) {
          setTimeout(() => {
            setShowModal(false)
            setSuccess('')
          }, 1500)
        } else {
          // Auto-clear success message
          setTimeout(() => setSuccess(''), 3000)
        }
      }
    } catch (error) {
      console.error('Error details:', error.response?.data)
      setError(error.response?.data?.message || 'Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Compact post creation UI in feed */}
      <div className="create-post">
        {(error || success) && (
          <p className={success ? 'success-message' : 'error-message'}>
            {success || error}
          </p>
        )}
        
        <div 
          className="create-post-input"
          onClick={openCreatePostModal}
        >
          <span className="create-post-placeholder">What's on your mind?</span>
        </div>
      </div>

      {/* Modal for expanded post creation UI */}
      {showModal && (
        <div className="modal-overlay">
          <div className="create-post-modal">
            <div className="modal-header">
              <button 
                className="modal-close-btn" 
                onClick={closeCreatePostModal}
              >
                Cancel
              </button>
              <h3 className="modal-title">Create post</h3>
              <div style={{width: '50px'}}></div> {/* Spacer for alignment */}
            </div>

            <div className="modal-content">
              <div className="modal-user-info">
                <div className="modal-user-avatar">
                  {/* First letter of username when available */}
                  ?
                </div>
                <div>
                  <div className="modal-username">Username</div>
                  <div className="modal-user-context">Posting publicly</div>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="modal-textarea"
                maxLength={500}
              />

              {previewUrl && (
                <div className="modal-image-preview">
                  <img src={previewUrl} alt="Preview" />
                  <button 
                    className="modal-remove-image"
                    onClick={handleRemoveImage}
                    type="button"
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="modal-tools">
                <div className="file-upload">
                  <input
                    type="file"
                    id="image-upload"
                    name="image"  // Important: must match backend field name
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="image-upload">
                    {file ? 'Change Image' : 'Add Image'}
                  </label>
                </div>
                <button 
                  onClick={handleSubmit}
                  className="modal-post-btn"
                  disabled={isSubmitting || !content.trim()}
                >
                  {isSubmitting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost