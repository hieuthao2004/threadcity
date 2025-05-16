import SearchUsers from "../components/Searching/SearchUsers";
import SearchPosts from "../components/Searching/SearchPosts";
import { useState } from "react";
import GoBackButton from "../components/Buttons/GoBackButton";

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  return (
    <div>
      <GoBackButton></GoBackButton>
      <input
        type="text"
        value={keyword}
        onChange={ (e) => setKeyword(e.target.value)}
      ></input>
      <SearchUsers></SearchUsers>
      <SearchPosts></SearchPosts>
    </div>
  )
}

export default SearchPage;