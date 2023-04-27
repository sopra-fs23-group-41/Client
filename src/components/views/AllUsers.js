import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Landing.scss";
import "styles/views/AllUsers.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import { Link } from 'react-router-dom';

const Player = ({user}) => (
    <Link to={"/profilepage/" + user.id}> 
    <div className={`userlist container ${user.status}`}>
        <div className="username">{user.username}</div>
        <div className="name">{user.name}</div>
    </div>
    </Link>
  );

Player.propTypes = {
    user: PropTypes.object
};

const AllUsers = () => {
    const history = useHistory();
    const [users, setUsers] = useState(null);
    console.log(users)
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
                const response = await api.get('/users');
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
          <ul className="userlist">
            {users.map(user => (
              <Player user={user} key={user.id}/>
            ))}
          </ul>
        </div>
      );
    }
  
    return (
        <BaseContainer className="landing container">
            <div className="landing navbar">
                <img className="landing img" src={logo} alt="LOL"/>
                <nav>
                    <ul className="nav__links">
                        <li><a href="leaderboard">Leaderboard</a></li>
                        <li><a href="profilepage">View Profile</a></li>
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

export default AllUsers;

//Push3