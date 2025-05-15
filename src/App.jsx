import { useEffect, useState } from 'react'
import './App.css'
import {
  Routes,
  Route,
} from 'react-router-dom';
import Homepage from './views/pages/Homepage';
import Register from './views/pages/Register';
import axios from 'axios';
import AuthenticationPage from './views/pages/AuthenticationPage';
import SearchPage from './views/pages/SearchPage';
import Profilepage from './views/pages/ProfilePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/protected', {
        withCredentials: true
      });
      console.log('Protected response:', response.data);

      if (response.data && response.data.user) {
        setIsAuthenticated(true);
        setUserData({
          user: {
            username: response.data.user.username,
            id: response.data.user.id,
            role: response.data.user.role
          }
        });
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  checkAuth();

}, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/register"
        element={<Register />} 
      />
      <Route
        path="/"
        element={
          isAuthenticated
            ? <Homepage userData={userData} />
            : <AuthenticationPage setAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
        }
      />
      <Route
        path='/searching'
        element={
          isAuthenticated
            ? <SearchPage></SearchPage>
            : <AuthenticationPage setAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
      }/>
      <Route
        path="/:username"
        element={
          isAuthenticated
          ? <Profilepage></Profilepage>
          : <AuthenticationPage setAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}></AuthenticationPage>
        }
      />
      
    </Routes>
  );
}

export default App;
