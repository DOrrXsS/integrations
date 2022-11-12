import React from 'react';
import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { getUrlData, loadAllIcons } from './assets/data/webData';
import Nav from './components/nav/Nav';
import styles from './index.styl';

export default class App extends Component {
  constructor(props){
    super();
    loadAllIcons();
  }

  componentWillUnmount() {
    let urlData = getUrlData();
    urlData.then(data => {
      this.urlData = data;
    })
  }

  render() {
    return (
      <div id='application'>
        <Nav/>
        <Outlet />
      </div>
    )
  }
}

