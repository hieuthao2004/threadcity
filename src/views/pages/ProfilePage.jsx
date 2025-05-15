import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState();
  const { username } = useParams(); 
  const [firstChar, ...theRestChars] = username;
  const exactUsername = theRestChars.join('')

  const fetchProfile = async () => {
    const response = await axios.get(`http://localhost:3001/api/profile/@:${exactUsername}`)
    console.log(response.data);
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div>
      <h1></h1>
      <h2>{exactUsername}</h2>
    </div>
  );
};

export default ProfilePage;
