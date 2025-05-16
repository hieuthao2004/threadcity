import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditProfileModal from '../components/Profile/EditProfileModal';
import GoBackButton from '../components/Buttons/GoBackButton';

const ProfilePage = ({ isAuthenticated }) => {
  const [profile, setProfile] = useState();
  const [showModal, setShowModal] = useState(false);
  const { username } = useParams();
  const [firstChar, ...theRestChars] = username;
  const exactUsername = theRestChars.join('');

  const openEditProfileModal = () => {
    setShowModal(true);
  }


  const EditProfileButton = () => {
    return (
      <button onClick={openEditProfileModal}>Edit Profile</button>
    )
  }

  const fetchProfile = async () => {
    const response1 = await axios.get(`http://localhost:3001/api/profile/@:${exactUsername}`)
    console.log(response1.data);
    const response2 = await axios.get('http://localhost:3001/api/follows/followers');
    console.log(response2.data);
    
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div>
      <GoBackButton></GoBackButton>
      <h1></h1>
      <h2>{exactUsername}</h2>

      {
        isAuthenticated && <EditProfileButton></EditProfileButton>
      }
      {
        showModal && <EditProfileModal></EditProfileModal>
      }
    </div>
  );
};

export default ProfilePage;
