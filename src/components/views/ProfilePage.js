import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Landing.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import {useParams} from 'react-router-dom'
import {Button} from 'components/ui/Button';;

const ProfilePage = () => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const userId = useParams().id;
  
    const editProfile = () => {
      history.push('/edit-profile/' + userId)
    }

    const goList = () => {
        history.push('/allusers')
    }
/*    const logout = async () => {
        try {
            await api.get('/users/'+localStorage.getItem('userId')+'/logout');
            localStorage.clear();
            history.push('/login');
        } catch (error) {
            alert(`Something went wrong during the logout: \n${handleError(error)}`);
        }
    }
*/
    
  useEffect(() => {
    async function fetchData(userId) {
      try {
        const response = await api.get("/users/" + userId);
        setUser(response.data);
      } catch (error) {
        alert(`Something went wrong while fetching the Profile: \n${handleError(error)}`);
      }
    }
    fetchData(userId);
  }, [userId]);

  let content = (<div></div>);

  if (user) {
    content = (
      <div className="game">
        <ul className="game user-list">
            <div className="player container">
              <div className="player username">Username: </div>
              <div className="player id">{user.username}</div>
            </div>
            <div className="player container">
              <div className="player username">Status: </div>
              <div className="player id">{user.status}</div>
            </div>
            <div className="player container">
              <div className="player username">Created: </div>
              <div className="player id">{user.creationDate}</div>
            </div>
            <div className="player container">
              <div className="player username">Birthdate: </div>
              <div className="player id">{user.birthdate}</div>
            </div>
        </ul>

        <Button width="100%" onClick={() => editProfile()}>
          Edit
        </Button>
        <Button width="100%" onClick={() => goList()}>
          List
        </Button>
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

                <div className="landing button-container">
                {content}

                </div>
        </BaseContainer>
    );
}

export default ProfilePage;
