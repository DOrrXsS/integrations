import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './layout.styl'

export default function SideBar({isVisible, setVisible}) {
  const navigate = useNavigate();
  const clickCheck = (e) => {
    if (e && e.clientX >= window.innerWidth * 0.3) {
      document.getElementById('side-bar').className = 'silde-out';
      setTimeout(()=>{setVisible(false);},950);
    }
  }
  useEffect(() => {
    document.addEventListener('mouseup', clickCheck)
    return () => {
      document.removeEventListener('mouseup', clickCheck);
    }
  }, [])
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
