import React, { useEffect, useState } from 'react';
import styles from './layout.styl';
import avatar from '../../assets/imgs/pics/16.jpg';
import { getUrlData, getUrlType } from '../../assets/data/webData';


export default function SideBar({ isVisible, setVisible }) {
  let [urlTypes, setUrlTypes] = useState([]);
  let sideBar = document.getElementById('side-bar');
  const clickCheck = (e) => {
    if (e.clientX >= window.innerWidth * 0.3 && sideBar?.className == 'slide-in') {
      sideBar.className = 'silde-out';
      document.removeEventListener('click', clickCheck);
      setTimeout(() => { setVisible(false); }, 950);
    }
  }
  useEffect(() => {
    getUrlType().then(data => {
      setUrlTypes(data);
    })
  }, []);
  useEffect(() => {
    sideBar = document.getElementById('side-bar');
  }, [isVisible])
  document.addEventListener('click', clickCheck)
  return isVisible ?
    (
      <div id='side-bar' className='slide-in'>
        <div id='avatar'>
          <img src={avatar} />
        </div>
        <div id='setting-opts'>
          <div className='setting-opt collects'>
            <span onClick={(e) => {
              let ul = document.querySelector('.setting-opt ul');
              ul.hidden = !ul.hidden;
            }}>收藏夹管理</span>
            <ul>
              { urlTypes.map((urlType, index) => {
                return <li key={index}>{urlType}</li>
              })}
              <li><input placeholder='newCollect' onKeyDown={(e) => {
                if(e.key == 'Enter') {
                  if(e.target.value == '') {
                    console.log('empty')
                    return ;
                  }
                  var newInput = e.target.value;
                  setUrlTypes([...urlTypes, newInput]);
                }
              }}/></li>
            </ul>
          </div>
          <div className='setting-opt'>
            <span>导出收藏夹</span>
          </div>
          <div className='setting-opt'>
            <span>清理本地数据</span>
          </div>
        </div>
        <div id='info'>
          <span>更新于:</span>
          <span>已运行:</span>
        </div>
      </div>
    ) :
    <div />
}
