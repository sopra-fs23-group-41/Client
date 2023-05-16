import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

export const GameGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to="/login"/>;
};

GameGuard.propTypes = {
  children: PropTypes.node
};
