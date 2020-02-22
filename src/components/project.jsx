import React, { Component } from 'react';
import axios from "axios";
import jwtDecode from "jwt-decode";
import {Link} from "react-router-dom";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      project: {}
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id
    let jwt = window.localStorage.getItem('jwt');
    let result = jwtDecode(jwt);
    console.log(id)
    axios.get(
      localStorage.url + `/api/v1/projects/${id}`,
    )
      .then((response) => {
        this.setState({
          title: response.data.title,
          project: response.data
        })
        console.log(this.state.project)
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  }

  handleSubmit = (event) => {
    const id = this.props.match.params.id
    let jwt = window.localStorage.getItem('jwt');
    let result = jwtDecode(jwt);
    console.log(result.id)

    axios.patch(
      localStorage.url + `/api/v1/projects/${id}`,
      {
        user_id: result.id,
        title: this.state.title
      }
    )
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
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
        <h1>Update</h1>
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

export default Project;
