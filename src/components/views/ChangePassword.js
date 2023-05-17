import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Landing.scss";
import "styles/views/Profile.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import {useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import PropTypes from "prop-types";

const FormField = props => {
    return (
      <div className="flex">
        <label>
          {props.label}
        </label>
        <input
          className="login input"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          type = {props.type}
          placeholder={props.placeholder}
        />
      </div>
    );
  };
  
FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string
};

const ChangePassword = () => {
  const history = useHistory();
  const idParam = useParams().id;
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const cancel= () => {
    history.push('/profilepage/'+idParam)
  }

/*const logout = async () => {
  try {
    await api.get('/users/'+localStorage.getItem('userId')+'/logout');
    localStorage.clear();
    history.push('/login');
  } catch (error) {
    alert(`Something went wrong during the logout: \n${handleError(error)}`);
  }
}
*/
    
const saveChanges = async () => {
    console.log(JSON.stringify({password}));
    if (password === "") {
        alert("Input the password");
    } else if (password === passwordCheck && password !== "") {
        try {
            const requestBody = JSON.stringify({password});
            await api.post("/users/" + localStorage.userId, requestBody);
            history.push(`/profilepage/` + idParam);
          } catch (error) {
            alert(`Something went wrong during changing user data: \n${handleError(error)}`);
            
          }
    } else {
        alert("Passwords are not same.");
    }
  };

  useEffect(() => {
    async function fetchData(idParam) {
      try {
        const response = await api.get("/users/" + idParam);
        setUser(response.data);
      } catch (error) {
        alert(`Something went wrong while fetching the User: \n${handleError(error)}`);
      }
    }
    fetchData(idParam);
  }, [idParam]);

  let content = (<div></div>);

  if (idParam !== localStorage.getItem('userId')) {
    content = (
      <div className='editProfile'>
        <p>This is not your profile so that you cannot edit it. 
          <br/>You can edit only yours.
        </p>
        <Button width="100%" onClick={() => cancel()}>
          Back
        </Button>
      </div>
    );
  } else if (user) {
    content = (
      <div className='profile'>
        <div className="container">
          <h1>Change Password</h1>
          <FormField
            label="New Password:"
            value={password}
            onChange={p => setPassword(p)}
            type = "password"
            placeholder="Leave empty if you don't want to change the password"
          />
          <FormField
            label="Repeat New Password:"
            value={passwordCheck}
            onChange={pc => setPasswordCheck(pc)}
            type = "password"
            placeholder="Leave empty if you don't want to change the password"
          />
          <Button onClick={() => saveChanges()}>
            Save
          </Button>
          <Button onClick={() => cancel()}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <BaseContainer className="landing container">
      <div className="landing navbar">
        <img className="landing img" src={logo} alt="LOL"/>
        <nav>
          <ul className="nav__links">
            <li><a href="/allusers">Find User</a></li>
            <li><a href="/landing">Home</a></li>
            <li><a href="/leaderboard">Leaderboard</a></li>
          </ul>
        </nav>
      </div>
      {content}
    </BaseContainer>
  );
}

export default ChangePassword;
