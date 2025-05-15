import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LikeButton from './LikeButton'
import RepostButton from './RepostButton'
import SaveButton from './SaveButton'
import HideButton from './HideButton'
import DeleteButton from './DeleteButton'
import '../../assets/styles/GetAllPosts.css'

const GetAllPosts = ({ currentUserId }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3001/api/posts', {
        withCredentials: true
      });
      console.log('Posts data:', response.data);
      setPosts(response.data.allPosts || []);      
      setError(null);
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError('Failed to load posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts])
  }

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`)
  }

  const handleDeleteSuccess = (deletedPostId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.p_id !== deletedPostId))
  }

  return (
    <div className="post-feed-container">
      <div className="post-feed">
        {posts.map((post) => (
          <div key={post.p_id} className="post-item">
            <div className="post-header">
              <div className="post-author-avatar">
                <div className="default-avatar">
                  {post.p_creater.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="post-info">
                <span 
                  className="post-author-name" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${post.p_creater}`);
                  }}
                >
                  {post.p_creater}
                </span>
                <span className="post-timestamp">{new Date(post.p_create_at).toLocaleString()}</span>
              </div>
            </div>
            
            <p className="post-content">{post.p_content}</p>
            
            {post.p_image_url && (
              <div className="post-image-container">
                <img 
                  src={post.p_image_url}
                  alt="Post content"
                  className="post-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                  loading="lazy"
                />
              </div>
            )}

            <div className="post-actions">
              <LikeButton 
                postId={post.p_id}
                initialIsLiked={post.isLiked}
                currentUserId={currentUserId}
              />
              <RepostButton 
                postId={post.p_id}
                initialIsReposted={post.isReposted}
                currentUserId={currentUserId}
              />
              <SaveButton
                postId={post.p_id}
                initialIsSaved={post.isSaved}
              />
              <HideButton postId={post.p_id} />
              {post.p_creater === currentUserId && (
                <DeleteButton 
                  postId={post.p_id}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetAllPosts