import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route {...rest} render={props => auth ? <Component {...props} />: <Redirect to={{ pathname:'/login', state: { from: props.location }}} /> }/>
        );
};

export default ProtectedRoute;