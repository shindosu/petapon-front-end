import React, { Component } from 'react';
import axios from "axios";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post(
      localStorage.url + '/api/v1/tokens',
      {
          email,
          password
      }
    )
      .then((response) => {
        localStorage.setItem("jwt", response.data.jwt);
        this.props.history.push(`/dashboard`);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        const password_field = document.getElementById("password");
        const error_list = error.response.data.errors;
        // document.getElementsByClassName("error-list")[0].childNodes[0].innerText
        document.getElementsByClassName("error")[0].innerText = error_list
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className = "form-group">
      <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">email</label>
          <input className="form-control" type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} ref={(node) => { this.inputNode1 = node; }} />
          <label htmlFor="password">password</label>
          <input className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} ref={(node) => { this.inputNode2 = node; }} />
          <input type="submit" value="sign in" />
        </form>
        <div className="error">
        </div>
      </div>
    );
  }
}

export default SignIn;
