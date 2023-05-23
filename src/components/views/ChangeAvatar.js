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

/*import Avatar_ONE from '../Avatars/Avatar_ONE.jpg';
import Avatar_TWO from '../Avatars/Avatar_TWO.jpg';
import Avatar_THREE from '../Avatars/Avatar_THREE.jpg';
import Avatar_FOUR from '../Avatars/Avatar_FOUR.jpg';
import Avatar_FIVE from '../Avatars/Avatar_FIVE.jpg';
import Avatar_SIX from '../Avatars/Avatar_SIX.jpg';*/

const FormField = props => {
  return (
    <div className="avatar-radio">
      <label>
        <input
        value={props.value}
        onClick={e => props.onClick(e.target.value)}
        type = "radio"
        name = "avatar"
        />
        <img src={require(`../Avatars/Avatar_${props.value}.jpg`)} alt="Broken Avatar" />
      </label>
    </div>
  );
};
  
FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string
};

const ChangeAvatar = () => {
  const history = useHistory();
  const idParam = useParams().id;
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const password = localStorage.getItem('password');
  const birthdate = localStorage.getItem('birthdate');
  const username = localStorage.getItem('username');

  const cancel= () => {
    history.push('/profileedit/'+idParam)
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
    if (profilePicture === "") {
      alert("Choose the avatar.");
    } else {
      try {
        const requestBody = JSON.stringify({username, birthdate, profilePicture, password});
        await api.put("/users/" + idParam, requestBody);
        localStorage.setItem("profilePicture", profilePicture);
        history.push(`/profilepage/` + idParam);
      } catch (error) {
        alert(`Something went wrong during changing user data: \n${handleError(error)}`);
      }
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
    fetchData(idParam).catch((error) => {
        console.error(`An error occurred while executing the fetchData function: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("An error occurred while executing the fetchData function! See the console for details.");
    });
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
          <h1>Change Avatar</h1>
            <div className='avatarList'>
                <FormField
                    value="ONE"
                    onClick={p => setProfilePicture(p)}
                />
                <FormField
                    value="TWO"
                    onClick={p => setProfilePicture(p)}
                />
                <FormField
                    value="THREE"
                    onClick={p => setProfilePicture(p)}
                />
                <FormField
                    value="FOUR"
                    onClick={p => setProfilePicture(p)}
                />
                <FormField
                    value="FIVE"
                    onClick={p => setProfilePicture(p)}
                />
                <FormField
                    value="SIX"
                    onClick={p => setProfilePicture(p)}
                />
                <FormField
                    value="SEVEN"
                    onClick={p => setProfilePicture(p)}
                />
                <FormField
                    value="EIGHT"
                    onClick={p => setProfilePicture(p)}
                />
                <FormField
                    value="NINE"
                    onClick={p => setProfilePicture(p)}
                />
                <FormField
                    value="TEN"
                    onClick={p => setProfilePicture(p)}
                />
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

export default ChangeAvatar;
