import React from 'react'
import threadsLogo from '../../../assets/images/threads.png'
import '../../../assets/styles/Header.css'


const Header = () => {
  return (
    <div className='container'>
        <img className='logo' src={threadsLogo} alt="threads logo" />
        <div className='small-container'>
            <button className='top-button'>For you</button>
            <button className='top-button'>Following</button>
        </div>
    </div>
  ) 
}

export default Header
