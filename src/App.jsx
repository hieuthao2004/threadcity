import { useEffect, useState } from 'react'
import './App.css'
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Homepage from './views/pages/Homepage';
import Register from './views/pages/Register';
import axios from 'axios';
import AuthenticationPage from './views/pages/AuthenticationPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
  const path = location.pathname;
  const publicPaths = ['/login', '/register'];

  if (!publicPaths.includes(path)) {
    checkAuth();
  } else {
    setLoading(false);
  }
}, [location.pathname]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated
            ? <Homepage userData={userData} />
            : <AuthenticationPage setAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
        }
      />
      <Route path="/login" element={
        <AuthenticationPage setAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
      } />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
