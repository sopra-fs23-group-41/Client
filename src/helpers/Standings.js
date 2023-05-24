import PropTypes from "prop-types";
import "styles/ui/Standings.scss";
import "styles/views/Avatars.scss";
import {api, handleError} from "./api";
import {useEffect} from "react";

const Player = ({user}) => (
    <div className="standings container">
        <img src={require(`../helpers/AvatarsStandings/Avatar_${user.profilePicture}.jpg`)} alt="profile1" className="avatar"/>
        <div className="standings username">{user.playerName}</div>
        <div className="standings roundscore">+{user.roundScore}</div>
        <div className="standings totalscore">{user.totalScore}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

const Standings = ({players}) => {

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        async function fetchData(userId) {
            try {
                const response = await api.get("/users/" + userId);
                localStorage.setItem('profilePic', response.data.profilePicture)
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

    let content = (
        <div className="standings">

                   {players.map(user => (
                        <Player user={user} key={user.id}/>
                   ))}

        </div>
    );

    return(
        <h1>{content}</h1>
    )

}
export default Standings;