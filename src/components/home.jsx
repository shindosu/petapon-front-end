import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/sign_in">Log In</Link>
        <Link to="/sign_up">Sign Up</Link>
      </div>
    );
  }
}

export default Home;
