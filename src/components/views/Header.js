import React from "react";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import "../pictures/2.jpg";

const Header = (props) => (
    <div className="header container" style={{ height: props.height }}>
        <h1 className="header title">
            <span className="text">SHOW ME THE MONEY</span>
        </h1>
    </div>
);

Header.propTypes = {
    height: PropTypes.string,
};

export default Header;
