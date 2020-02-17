import React, { Component } from 'react';
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password_confirmation = document.getElementById("password_confirmation").value;

    axios.post(
      localStorage.url + '/api/v1/users',
      {
        user:
        {
          email,
          password,
          password_confirmation,
        }
      }
    )
      .then((response) => {
        localStorage.setItem("jwt", response.data.jwt);
        this.props.history.push(`/dashboard`);
      })
      .catch((error) => {
        console.log(error.response.data);
        const error_list = error.response.data.errors;
        if (error_list.email !== undefined) {
          const email_error = error_list.email;
          document.getElementsByClassName("email-error")[0].innerText = email_error
        }
        if (error_list.password !== undefined) {
          const password_error = error_list.password;
          document.getElementsByClassName("password-error")[0].innerText = password_error[0]
        }
        if (error_list.password_confirmation !== undefined) {
          const password_confirmation_error = error_list.password_confirmation;
          document.getElementsByClassName("password-confirmation-error")[0].innerText = password_confirmation_error
        }
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="form-group">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit} id="sign-up-form">
          <label htmlFor="email">email</label>
          <input className="form-control" type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
          <div className="email-error"></div>
          <label htmlFor="password">password</label>
          <input className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
          <div className="password-error"></div>
          <label htmlFor="password_confirmation">password_confirmation</label>
          <input className="form-control" type="password" id="password_confirmation" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} />
          <div className="password-confirmation-error"></div>
          <input type="submit" value="sign up" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default SignUp;
