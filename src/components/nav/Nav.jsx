import React from 'react';
import styles from './nav.styl';
import { Link } from 'react-router-dom';

export default function Nav() {
    const navList = [
        {
            title: '首页',
            path: '/',
        },
        {
            title: '文章',
            path: '/passages'
        },
        {
            title: '实验室',
            path: '/experiments'
        }
    ]
    return (
        <div>
            <div id='top-greeting'>paprikaの部屋</div>
            <div id='navigation'>
                { navList.map((navObj, index) => {
                    return <div className='nav-opt' key={index}>
                        <Link to={navObj.path}>{navObj.title}</Link>
                    </div>
                })}
            </div>
        </div>
    )
}
