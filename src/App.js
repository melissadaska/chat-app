import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <nav className="navbar">
            <ul className="navbar-list">
            <li className="navbar-item">
            <Link to="/mynetwork" className="navbar-link">My Network</Link>
            </li>
            <li className="navbar-item">
            <Link to="/messaging" className="navbar-link">Messaging</Link>
            </li>
            </ul>
          </nav>
        </Router>
      </div>
    );
  }
}
export default App;
