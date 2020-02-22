import React, { Component } from 'react';
import axios from "axios";
import jwtDecode from "jwt-decode";
import {Link} from "react-router-dom"

class newProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Untitled"
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let jwt = window.localStorage.getItem('jwt');
    let result = jwtDecode(jwt);
    const title = document.getElementById("title").value;

    axios.post(
      localStorage.url + '/api/v1/projects',
      {
        user_id: result.id,
        title: title
      }
    )
      .then((response) => {
        this.props.history.push(`/dashboard`);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.hasOwnProperty('errors')) {
          const error_list = error.response.data.errors;
        console.log("title error present?", error_list.hasOwnProperty('title'))
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
      <React.Fragment>
      <div className="form-group">
        <h1>Create new Project</h1>
        <form onSubmit={this.handleSubmit} id="sign-up-form">
          <label htmlFor="title">title</label>
          <input className="form-control" type="title" id="title" name="title" value={this.state.title} onChange={this.handleChange} />
          <input type="submit" value="save" className="btn btn-primary" />
        </form>
      </div>
      <Link to="/dashboard">Back</Link>
      </React.Fragment>

    );
  }
}

export default newProject;
