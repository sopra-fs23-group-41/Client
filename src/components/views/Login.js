import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import '../pictures/img1.jpg'

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

const Login = props => {
  const history = useHistory();
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({username, password});
      const response = await api.post('/users/login', requestBody);

      const user = new User(response.data);
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.id);

      // Registration successfully worked --> navigate to the route /landing in the GameRouter
      history.push(`/landing`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const goToRegistration = () => {
    history.push(`/registration`);
  };

  return (

    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            className="login formfield"
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
            className="login formfield"
            label="Password"
            value={password}
            onChange={p => setPassword(p)}
          />

          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
            </Button>
          </div>
          <div className="login button-container">
            <Button
                width="100%"
                onClick={() => goToRegistration()}
            >
              New here? Create an account!
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Login;
