import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import '../pictures/img1.jpg'





/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one and the same file.
 */
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


      //Get a List of all Users
      const response = await api.get('/users');
      var user1;
      var userExists = false;
      for(var i=0; i< response.data.length; i++) {
        if (response.data[i].username === username && response.data[i].password === password) {
          user1 = new User(response.data[i]);
          localStorage.setItem('token', user1.token);
          const requestBody = JSON.stringify({username, password});
          await api.post("statusOnline", requestBody)
          history.push(`/landing`);
          userExists = true;

        }
      }
      if(!userExists){
        alert('Username or Password false')
        history.push('login')
      }

    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const goToRegistration = async () => {
    try {
      history.push(`/registration`);
    } catch (error) {
      alert(`Something went wrong during the Registration: \n${handleError(error)}`);
    }
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

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
