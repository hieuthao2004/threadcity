import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../components/CreatePost';
import GetAllPosts from '../components/GetAllPosts';
import SearchPosts from '../components/SearchPosts';
import SearchUsers from '../components/SearchUsers';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Header from '../components/Header/Header';
// import './Homepage.css';

function Homepage({ userData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goToMyProfile = () => {
    navigate('/my-profile');
  };

  return (
    <div className="homepage-container">
      <Header></Header>
      {/* <div className="homepage-header">
        <h1>Homepage</h1>
        <button 
          onClick={goToMyProfile}
          className="profile-button"
        >
          View Profile
        </button>
      </div>
      
      <p className="welcome-text">
        Hi {userData.user.username}
      </p>
      
      <div className="search-section">
        <div className="search-tabs">
          <h2>Search</h2>
          <div className="search-components">
            <SearchUsers currentUserId={userData.user.id} />
            <SearchPosts currentUserId={userData.user.id} />
          </div>
        </div>
      </div> */}

      {/* <CreatePost currentUserId={userData.user.id} /> */}
      {/* <NavigationBar></NavigationBar> */}
      {/* <GetAllPosts currentUserId={userData.user.id} /> */}
    </div>
  );
}

export default Homepage;