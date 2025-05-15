import SearchUsers from "../components/Searching/SearchUsers";
import SearchPosts from "../components/Searching/SearchPosts";
import { useState } from "react";

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  return (
    <div>
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