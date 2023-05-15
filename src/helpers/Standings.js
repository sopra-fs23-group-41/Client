import PropTypes from "prop-types";
import "styles/ui/Standings.scss";
import "styles/views/Avatars.scss";

import Avatar from '../components/Avatars/Avatar4.jpg'

const Player = ({user}) => (
    <div className="standings container">
        <img className="avatar" src={Avatar} alt="broken"/>
        <div className="standings username">{user.playerName}</div>
        <div className="standings roundscore">+{user.roundScore}</div>
        <div className="standings totalscore">{user.totalScore}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

const Standings = ({players}) => {

    let content = (
        <div className="standings">
            <ul className="standings user-list">
                   {players.map(user => (
                        <Player user={user} key={user.id}/>
                   ))}
            </ul>
        </div>
    );

    return(
        <h1>{content}</h1>
    )

}
export default Standings;