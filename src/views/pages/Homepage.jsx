import CreatePost from '../components/CreatePost';
import GetAllPosts from '../components/GetAllPosts';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import Header from '../components/Header/Header';
import '../../assets/styles/Homepage.css';

function Homepage({ userData }) {

  return (
    <div className="homepage-container">
      <Header></Header>
      <div className='body-container'>
        <NavigationBar></NavigationBar>
        <div className='container'>
          <CreatePost currentUserId={userData.user.id} />
          <GetAllPosts currentUserId={userData.user.id} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;