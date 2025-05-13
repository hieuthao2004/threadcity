import { useNavigate } from 'react-router-dom';
import '../../../assets/styles/NavigationBar.css'

const NavigationBar = ({username}) => {
  const navigate = useNavigate();
  
  const goToHomepage = () => {
    navigate('/');
  }
  const goToSearch = () => {
    navigate('/searching');
  };
  const goToMyProfile = () => {
    navigate(`/@${username}`)
  }


  return (
    <div className='navigation-bar'>
      <button onClick={goToHomepage}>Homepage</button>
      <button onClick={goToSearch}>Search</button>
      
      <button onClick={goToMyProfile}>Profile</button>
    </div>
  );
};

export default NavigationBar;
