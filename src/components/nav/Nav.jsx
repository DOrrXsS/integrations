import React from 'react';
import styles from './nav.styl';
import { Link } from 'react-router-dom';
import setting from '../../assets/imgs/settings.svg';

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
            <div id='top-greeting'>
                <h1>paprika</h1>
            </div>
            <div id='navigation'>
                <div id='settings'>
                    <Link to='/settings'><img src={setting} /></Link>
                </div>
                { navList.map((navObj, index) => {
                    return <div className='nav-opt' key={index}>
                        <Link to={navObj.path}>{navObj.title}</Link>
                    </div>
                })}
            </div>
        </div>
    )
}
