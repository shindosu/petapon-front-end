import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./sign_up";
import Dashboard from "./dashboard";
import Project from "./project";
import newProject from "./newProject";
import ProtectedRoute from './protected_routes';
import Home from "./home"

class App extends Component {
  constructor(props) {
    super(props);
    localStorage.setItem("url", 'http://petapon-api.herokuapp.com/');
    if(process.env.NODE_ENV !== 'production') {
      localStorage.setItem("url", 'http://localhost:3001');
    }
    console.log(localStorage.url)
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign_up" exact component={SignUp} />
          <Route path="/sign_in" exact component={SignIn} />
          <ProtectedRoute
        path={"/dashboard"}
        exact component={Dashboard}
        />
        <ProtectedRoute
        path={"/new-project"}
        exact component={newProject}
        />
          <ProtectedRoute
        exact path={"/projects/:id"}
        component={Project}
        />
        </Switch>
      </Router>
    )
  }
}

export default App;
