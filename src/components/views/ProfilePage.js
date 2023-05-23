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


const ProfilePage = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const userId = useParams().id;

  const editProfile = () => {
    history.push('/profileedit/' + userId)
  }

  const goList = () => {
      history.push('/allusers')
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

  useEffect(() => {
    async function fetchData(userId) {
      try {
        const response = await api.get("/users/" + userId);
        setUser(response.data);
      } catch (error) {
        alert(`Something went wrong while fetching the Profile: \n${handleError(error)}`);
      }
    }
    fetchData(userId).catch((error) => {
      console.error(`An error occurred while executing the fetchData function: \n${handleError(error)}`);
      console.error("Details:", error);
      alert("An error occurred while executing the fetchData function! See the console for details.");
    });
  }, [userId]);

  let content = (<div></div>);
  let button = (<div></div>);

  if (user) {
    if (userId === localStorage.getItem('userId')) {
      button = (
        <div>
          <Button onClick={() => editProfile()}>
            Edit
          </Button>
          <Button onClick={() => goList()}>
            List
          </Button>
        </div>
      )
    } else {
      button = (
        <div>
          <Button onClick={() => goList()}>
            List
          </Button>
        </div>
      )
    }

    content = (
      <div className="profile">
        <div className="container">
          <h1>Profile</h1>
          <div className="grid">
            <div>
              <img src={require(`../Avatars/Avatar_${user.profilePicture}.jpg`)} alt="profile1" className="profileImage"/>
            </div>
            <div>
              <div className="flex">
                <div>Username: </div>
                <div>{user.username}</div>
              </div>
              <div className="flex">
                <div>Status: </div>
                <div>{user.status}</div>
              </div>
              <div className="flex">
                <div>Created: </div>
                <div>{user.creationDate}</div>
              </div>
              <div className="flex">
                <div>Birthdate: </div>
                <div>{user.birthdate}</div>
              </div>
              <div className="flex">
                <div>Number of Games Won: </div>
                <div>{user.numOfGameWon}</div>
              </div>
            </div>
          </div>
          {button}
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

export default ProfilePage;
