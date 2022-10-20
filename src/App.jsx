import React from 'react';
import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/nav/Nav';
import styles from './index.styl';

export default class App extends Component {
  render() {
    return (
      <div id='application'>
        <Nav/>
        <Outlet />
      </div>
    )
  }
}
