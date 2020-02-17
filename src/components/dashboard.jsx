import React, { Component } from 'react';
import jwtDecode from "jwt-decode";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount(){
    let jwt = window.localStorage.getItem('jwt');
    let result = jwtDecode(jwt);
    this.setState({email:result.email})
    console.log(`The result is`, result);
    console.log(`the current dashboard state is`, window.localStorage);
  }

  handleClick = (event) => {
    event.preventDefault();
    delete localStorage.jwt
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <h1>HELLO! {this.state.email}</h1>
        <button onClick={this.handleClick}>Sign out</button>
      </div>
    );
  }
}

export default Dashboard;
