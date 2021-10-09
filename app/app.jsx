import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import * as styles from './app.module.less';

import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './components/MainPage/MainPage';
import AddItem from './components/AddItem/AddItem';
import ItemList from './components/ItemList/ItemList';
import Item from './components/Item/Item';

/* eslint-disable react/prefer-stateless-function  */

export default class App extends Component {
  render() {
    return (
      <div>
        <div className={styles.itemheader}>
          HomeItems React App
        </div>

        <Router>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              Home
            </a>
            <div className="navbar-nav mr-auto">              
              <li className="nav-item">
                <Link to="/addItem" className="nav-link">
                  Add Item
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/itemList" className="nav-link">
                   Item List
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>            
              <Route path="/addItem" component={AddItem} />
              <Route path="/itemList" component={ItemList} />
              <Route path="/items/:id" component={Item} />
              <Route path="/">
                <MainPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
