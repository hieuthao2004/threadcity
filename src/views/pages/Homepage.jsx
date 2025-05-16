import CreatePost from '../components/CreatePost/CreatePostModal';
import GetAllPosts from '../components/Posts/GetAllPosts';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Header from '../components/Header/Header';
import '../../assets/styles/Homepage.css';
import { useState } from 'react';
import CreatePostModal from '../components/CreatePost/CreatePostModal';

function Homepage({ userData }) {  
  const [showModal, setShowModal] = useState(false);
  const handleOpenPostModal = () => {
    setShowModal(true)
  }
  const handleClosePostModal = () => {
    setShowModal(false)
  }

  return (
    <div className="homepage-container">
      <Header></Header>
      <div className='body-container'>
        <NavigationBar username={userData.user.username} createPostHandler={handleOpenPostModal}></NavigationBar>
              {showModal && (
        <CreatePostModal 
          onClose={handleClosePostModal}
        />
      )}
        <div className='container'>
          <CreatePost currentUserId={userData.user.id} showModal={showModal} setShowModal={setShowModal} openCreatePostModal={handleOpenPostModal} />
          <GetAllPosts currentUserId={userData.user.id} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;