import React, { Component } from 'react';
import jwtDecode from "jwt-decode";
import axios from "axios";
import {Link} from "react-router-dom"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      projects: []
    };
  }

  componentDidMount(){
    let jwt = window.localStorage.getItem('jwt');
    let result = jwtDecode(jwt);
    this.setState({
      email:result.email
    })
    // console.log(this.props)
    // console.log(`The result is`, result);
    // console.log(`the current dashboard state is`, window.localStorage);

    axios.get(
      localStorage.url + '/api/v1/projects',
    )
      .then((response) => {
        const userProjects = response.data.filter(project => {return project.user_id === result.id})
        this.setState({
          projects: userProjects
        })
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  }

  handleClick = (event) => {
    event.preventDefault();
    delete localStorage.jwt
    this.props.history.push("/")
  }

  handleDelete = (event) => {
    let jwt = window.localStorage.getItem('jwt');
    let result = jwtDecode(jwt);
    const projectId = event.target.parentNode.id
    const projectNumber = projectId.split("_").pop()
    console.log(projectId)

    axios.delete(
      localStorage.url + `/api/v1/projects/${projectNumber}`
    )
      .then((response) => {
        console.log(this.state.projects)
        document.getElementById(projectId).remove();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>HELLO! {this.state.email}</h1>
        <h2>Projects</h2>
        <ul id="project-list">
        {this.state.projects.map(project => 
          <li key={project.id} id={`project_${project.id}`}> 
            <Link to ={`/projects/${project.id}`}>{project.title}</Link>
            <button id={`delete_project_${project.id}`}onClick={this.handleDelete}>Delete</button>
          </li>
        )}
        </ul>
        <button onClick={this.handleClick}>Sign out</button>
        <Link to="/new-project">Create new project</Link>
      </div>
    );
  }
}

export default Dashboard;
