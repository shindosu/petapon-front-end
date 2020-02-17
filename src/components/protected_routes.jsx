
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            localStorage.jwt !== undefined ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default ProtectedRoute;