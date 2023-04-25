import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const FormField = props => {
    return (
      <div className="login field">
        <label className="login label">
          {props.label}
        </label>
        <input
          className="login input"
          placeholder="enter here.."
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    );
  };
  
  FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

const Registration = props => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
  
    const doRegister = async () => {
        try {
            const requestBody = JSON.stringify({username, name, password});
            const response = await api.post('/users', requestBody);
    
            // Get the returned user and update a new object.
            const user = new User(response.data);
    
            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('userId', user.id);

            // Login successfully worked --> navigate to the route /landing in the GameRouter
            history.push(`/landing`);
        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
        }
    };

    const goToLogin = () => {
        history.push(`/login`);
    };

    return (
        <BaseContainer>
            <div className="login container">
                <div className="login form">
                    <FormField
                        label="Enter your username here"
                        value={username}
                        onChange={un => setUsername(un)}
                    />

                    <FormField
                        label="Enter your name here"
                        value={name}
                        onChange={n => setName(n)}
                    />

                    <FormField
                        label="Enter your password here"
                        value={password}
                        onChange={p => setPassword(p)}
                    />
                    <div className="login button-container">
                        <Button
                            disabled={!username || !password || !name}
                            width="100%"
                            onClick={() => doRegister()}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="login button-container">
                        <Button

                            width="100%"
                            onClick={() => goToLogin()}
                        >
                            Go back to Login
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Registration;
