import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './layout.styl'

export default function SideBar({isVisible, setVisible}) {
  let sideBar = document.getElementById('side-bar');
  const clickCheck = (e) => {
    if (e.clientX >= window.innerWidth * 0.3 && sideBar?.className=='slide-in') {
      sideBar.className = 'silde-out';
      document.removeEventListener('click', clickCheck);
      setTimeout(()=>{setVisible(false);},950);
    }
  }
  useEffect(()=> {
    sideBar = document.getElementById('side-bar');
  },[isVisible])
  document.addEventListener('click', clickCheck)
  return isVisible ? 
  (
    <div id='side-bar' className='slide-in'>
      <div id='avatar'>
        avatar
      </div>
      <div id='setting-opts'>
        {[1, 2, 3, 4].map((num, index) => <div className='setting-opt' key={index}>set sth</div>)}
      </div>
      <div id='info'>
        this is paprika'space
      </div>
    </div>
  ) :
  <div/>
}
