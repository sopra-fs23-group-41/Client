import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Landing.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import {Spinner} from "../ui/Spinner";
import {Button} from 'components/ui/Button';
import {useParams} from 'react-router-dom';

const ProfilePage = () => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const userId = useParams().id;

    const editProfile = () => {
        history.push('/editprofile/' + userId)
      }

    const goList = () => {
        history.push('/landing')
    }

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    useEffect(() => {
        async function fetchData(userId) {
            try {
                const response = await api.get('/user/' + userId);
                setUser(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData(userId);
    }, [userId]);

    let content = <Spinner/>;

    if (user) {
        content = (
          <div className="game">
            <ul className="game user-list">
                <div className="player container">
                  <div className="player category">Username: </div>
                  <div className="player content">{user.username}</div>
                </div>
                <div className="player container">
                  <div className="player category">Name: </div>
                  <div className="player content">{user.name}</div>
                </div>
                <div className="player container">
                  <div className="player category">Username: </div>
                  <div className="player content">{user.username}</div>
                </div>
                <div className="player container">
                  <div className="player category">Status: </div>
                  <div className="player content">{user.status}</div>
                </div>
            </ul>
          </div>
        )
      }
    
    let edit =("");
    if (userId == localStorage.getItem('userId')) { 
      edit = (
        <Button width="100%" onClick={() => editProfile()}>
          Edit
        </Button>
      );
    }

    let back = (
      <Button width="100%" onClick={() => goList()}>
      Back
      </Button>
    );

    return (
        <BaseContainer className="landing container">

            <div className="landing navbar">
                <img className="landing img" src={logo} alt="LOL"/>
                <nav>
                    <ul className="nav__links">
                        <li><a href="allusers">Find User</a></li>
                        <li><a href="landing">Home</a></li>
                        <li><a href="leaderboard">Leaderboard</a></li>
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
            {edit}
            {back}
        </BaseContainer>
    );
}

export default ProfilePage;
