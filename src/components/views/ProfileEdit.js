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
      <div className="flexedit">
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
  const id = useParams().id;
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [birthDate, setBirthDate] = useState(localStorage.getItem('birthDate'));
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

const cancel= () => {
  history.push('/profilepage/'+id)
}

const changeAvatar= () => {
  history.push('/change-avatar/'+id)
}

const logout = async () => {
  try {
    await api.get('/users/'+localStorage.getItem('userId')+'/logout');
    localStorage.clear();
    history.push('/login');
  } catch (error) {
    alert(`Something went wrong during the logout: \n${handleError(error)}`);
  }
}


    
const saveChanges = async () => {
    try {
      const requestBody = JSON.stringify({id, username, birthDate});
      await api.put("/users/" + id, requestBody);

      localStorage.setItem("username", username);
      localStorage.setItem("birthDate", birthDate);

      history.push(`/profilepage/` + id);
    } catch (error) {
      alert(`Something went wrong during changing user data: \n${handleError(error)}`);
    }
  };

  useEffect(() => {
    async function fetchData(id) {
      try {
        const response = await api.get("/users/" + id);
        setUser(response.data);
      } catch (error) {
        alert(`Something went wrong while fetching the User: \n${handleError(error)}`);
      }
    }
    fetchData(id).catch((error) => {
      console.error(`An error occurred while executing the fetchData function: \n${handleError(error)}`);
      console.error("Details:", error);
      alert("An error occurred while executing the fetchData function! See the console for details.");
    });

  }, [id]);

  let content = (<div></div>);

  if (id !== localStorage.getItem('userId')) {
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
          <div className="grid">
            <div className='changeAvatar'>
              <img src={require(`../Avatars/Avatar_${user.profilePicture}.jpg`)} alt="profile1" className="profileImage"/>
              <Button className="changebtn" onClick={() => changeAvatar()}>change</Button>
            </div>
            <div>
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
              <FormField
                label="New Password:"
                value={password}
                onChange={p => setPassword(p)}
                type = "password"
                placeholder="Leave empty if you don't want to change"
              />
              <FormField
                label="Repeat New Password:"
                value={passwordCheck}
                onChange={pc => setPasswordCheck(pc)}
                type = "password"
                placeholder="Leave empty if you don't want to change"
              />
            </div>
          </div>
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
            <li><a href="/alltimeleaderboard">Leaderboard</a></li>
          </ul>
        </nav>
        <div className="landing button-container">
          <button
            className="button"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
      {content}
    </BaseContainer>
  );
}

export default ProfileEdit;
