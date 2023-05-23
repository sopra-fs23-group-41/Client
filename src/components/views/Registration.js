import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'styles/views/Registration.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const FormField = (props) => {
    return (
        <div className="login field">
            <label className="login label">{props.label}</label>
            <div className="login input-container">
                <input
                    className="login input"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    type={props.type}
                />
            </div>
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    showPassword: PropTypes.bool,
    onToggle: PropTypes.func,
};

const Registration = () => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);


    const doRegister = async () => {
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api.post('/users', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('password', user.password);
            localStorage.setItem('profilePicture', user.profilePicture);
            localStorage.setItem('username', user.username);

            // Login successfully worked --> navigate to the route /landing in the GameRouter
            history.push(`/landing`);
        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
        }
    };

    const goToLogin = () => {
        history.push(`/login`);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <BaseContainer>
            <div className="registration container">
                <div className="registration form">
                    <FormField
                        label="Username:"
                        value={username}
                        onChange={un => setUsername(un)}
                    />

                    <FormField
                        className="registration formfield"
                        label="Password:"
                        value={password}
                        onChange={(p) => setPassword(p)}
                        type={showPassword ? 'text' : 'password'}
                        showPassword={showPassword}
                        onToggle={togglePasswordVisibility}
                    />

                    <div className="registration button-container">
                        <Button
                            className="registration password-toggle"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </div>

                    <div className="registration button-container">
                        <Button
                            disabled={!username || !password}
                            width="100%"
                            onClick={() => doRegister()}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="registration button-container">
                        <Button
                            width="100%"
                            onClick={() => goToLogin()}
                        >
                            Back to Login
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Registration;
