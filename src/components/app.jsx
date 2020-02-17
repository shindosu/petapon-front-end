import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./sign_up";
import Dashboard from "./dashboard";
import ProtectedRoute from './protected_routes';

class App extends Component {
  constructor(props) {
    super(props);
    localStorage.setItem("url", 'https://railsjwtapi.herokuapp.com');
    if(process.env.NODE_ENV !== 'production') {
      localStorage.setItem("url", 'http://localhost:3001');
    }
    console.log(localStorage.url)
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/sign_up" exact component={SignUp} />
          <Route path="/sign_in" exact component={SignIn} />
          <ProtectedRoute
        path={"/dashboard"}
        exact component={Dashboard}
        />
          {/* {localStorage.jwt === null ? <Route path="/dashboard" component={Dashboard} /> : <Redirect to="/"/>} */}
        </Switch>
      </Router>
    )
  }
}

export default App;
