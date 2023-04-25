import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import Standings from "../../helpers/Standings";
import Timer from "../../helpers/TimerLeaderboard";
import "styles/ui/Standings.scss";
import Player from "../../models/Player";

function playerSort (players) {
    let temp;
    for(let i=0; i<players.length; i++){
        for(let j=0; j<players.length; j++){
            if(players[i].totalScore > players[j].totalScore){
                temp = players[j];
                players[j] = players[i];
                players[i] = temp;
            }
        }
    }
}

const LeaderBoard = (props) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await api.get('/lobbies/${props}');
                const playersJson = response.data.players;
                const players = playersJson.map(playerJson => Player.fromJson(playerJson));
                playerSort(players);
                setPlayers(players);
            } catch (error) {
                console.error(`Something went wrong while fetching the players in leaderboard: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the players in leaderboard! See the console for details.");
            }
        };
        fetchPlayers();
    }, [props]);


    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <a className="multiplayer home-button-color" href="landing">
                            <button className="multiplayer home-button">Home</button>
                        </a>
                    </ul>
                </nav>
                <h1 className="multiplayer title">Current Standings</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>


            <h1 className="next-question-title">Next question starts in:</h1>
            <div className="next-question-timer">
                <Timer seconds={6}/>
            </div>
            <Standings players={players}/>


        </BaseContainer>
    );
}

export default LeaderBoard;