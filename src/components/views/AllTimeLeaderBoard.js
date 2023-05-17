import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Landing.scss";
import "styles/views/AllTimeLeaderBoard.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import { Link } from 'react-router-dom';

const Player = ({user}) => (
    <div className={`container`}>
        <Link to={"/profilepage/" + user.id}>
            <div className='innerContainer'>
                <div className='icon'>
                    <img src={require(`../Avatars/Avatar_${user.profilePicture}.jpg`)} alt="profile1" className="profileImage"/>
                </div>

                <div className="username">

                    {user.username}
                </div>
                <div>{user.numOfGameWon}</div>
            </div>
        </Link>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

const AllTimeLeaderBoard = () => {
    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const [users, setUsers] = useState(null);

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
        async function fetchData() {
            try {
                const response = await api.get('/users/leaderboard');
                setUsers(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    }, []);

    let content = (<div></div>);

    if (users) {
      content = (
        <div className="game">

          <div className="leaderboard">
          <h1>LeaderBoard</h1>
            {users.map(user => (
              <Player user={user} key={user.id} />
            ))}
          </div>
        </div>
      );
    }
  
    return (
        <BaseContainer className="landing container">
            <div className="landing navbar">
                <img className="landing img" src={logo} alt="LOL"/>
                <nav>
                    <ul className="nav__links">
                        <li><a href="allusers">Find User</a></li>
                        <li><a href={`profilepage/${userId}`}>View Profile</a></li>
                        <li><a href="landing">Home</a></li>
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

export default AllTimeLeaderBoard;
