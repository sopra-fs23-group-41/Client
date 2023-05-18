import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Landing.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import icon1 from '../pictures/sp-icon.jpg'
import icon2 from '../pictures/pincode-icon.jpg'
import icon3 from '../pictures/mp-icon.jpg'


const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
        <div className="player name">{user.name}</div>
        <div className="player id">id: {user.id}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

const Landing = () => {
    const history = useHistory();
    const userId = localStorage.getItem('userId');

    const logout = async () => {
        try {
            await api.get('/users/'+localStorage.getItem('userId')+'/logout');
            localStorage.clear();
            history.push('/login');
        } catch (error) {
            alert(`Something went wrong during the logout: \n${handleError(error)}`);
            localStorage.clear();
            history.push('/login');
        }
    }


    return (
        <BaseContainer className="landing container">

            <div className="landing navbar">
                <img className="landing img" src={logo} alt="LOL"/>
                <nav>
                    <ul className="nav__links">
                        <li><a href="endofgame">EndOfGame</a></li>
                        <li><a href="allusers">Find User</a></li>
                        <li><a href={`profilepage/${userId}`}>View Profile</a></li>
                        <li><a href="most-expensive-item-game">MostExpensive</a></li>
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
            <div className="landing title">
                <h1>Show Me The Money</h1>
                <p>Money is the root of all evil. Or is it the root of all people?</p>
            </div>


            <div className="landing icons">
                <div className="landing icon1">
                    <h3 className="landing icon-description">Enter Pincode</h3>
                    <a href="pincode"><img className="landing icon" src={icon2} alt="LOL"/></a>
                </div>
                <div className="landing icon2">
                    <h3 className="landing icon-description">Singleplayer</h3>
                    <a href="singleplayer"><img className="landing icon" src={icon1} alt="LOL"/></a>
                </div>

                <div className="landing icon3">
                    <h3 className="landing icon-description">Multiplayer</h3>
                    <a href="multiplayer"><img className="landing icon" src={icon3} alt="LOL"/></a>
                </div>
            </div>
        </BaseContainer>
    );
}

export default Landing;