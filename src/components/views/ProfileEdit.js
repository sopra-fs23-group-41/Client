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

const ProfileEdit = () => {
  const history = useHistory();
  const idParam = useParams().id;
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [birthDate, setBirthDate] = useState(localStorage.getItem('birthDate'));

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
    try {
      const requestBody = JSON.stringify({username, birthDate});
      await api.put("/users/" + localStorage.userId, requestBody);

      localStorage.setItem("username", username);
      localStorage.setItem("birthDate", birthDate);

      history.push(`/profilepage/` + idParam);
    } catch (error) {
      alert(`Something went wrong during changing user data: \n${handleError(error)}`);
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
          <h1>Edit Profile</h1>
        <FormField
          label="New Username:"
          value={username}
          onChange={a => setUsername(a)}
          type = "text"
          placeholder = {user.username}
        />
        <FormField
          label="New Birthdate:"
          value={birthDate}
          onChange={b => setBirthDate(b)}
          type = "date"
          placeholder={user.birthDate}
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

export default ProfileEdit;
