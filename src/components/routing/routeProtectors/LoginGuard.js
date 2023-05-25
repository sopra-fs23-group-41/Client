import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";

export const LoginGuard = props => {
    if (!localStorage.getItem("token")) {
        return props.children;
    }
    // if user is already logged in, redirects to the main /app
    return <Route render={() => <Redirect to="/landing"/>}/>;
};

LoginGuard.propTypes = {
    children: PropTypes.node
}

//router
