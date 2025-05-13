import SearchPage from '../../pages/SearchPage'
import CreatePost from '../CreatePost'
import SearchUsers from '../SearchUsers'

const NavigationBar = () => {
  return (
    <div>
        <SearchPage></SearchPage>
        <CreatePost></CreatePost>
    </div>
  )
}

export default NavigationBar