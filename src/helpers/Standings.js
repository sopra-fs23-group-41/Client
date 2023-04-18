import PropTypes from "prop-types";
import "styles/ui/Standings.scss";

const Player = ({user}) => (
    <div className="standings container">
        <div className="standings username">{user.rank} </div>
        <div className="standings username">{user.username}</div>
        <div className="standings username">{user.points}</div>
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