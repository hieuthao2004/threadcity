import { useNavigate } from 'react-router-dom';
import '../../../assets/styles/NavigationBar.css'

const NavigationBar = ({username, createPostHandler}) => {
  console.log(username);
  
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
      <img src="" alt="" />
      <button onClick={goToHomepage}>Homepage</button>
      <button onClick={goToSearch}>Search</button>
      <button onClick={createPostHandler}>Create Post</button>
      <button>Activity</button>
      <button onClick={goToMyProfile}>Profile</button>
    </div>
  );
};

export default NavigationBar;
