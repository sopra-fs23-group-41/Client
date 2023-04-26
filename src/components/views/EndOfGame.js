import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/EndOfGame.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import Standings from "../../helpers/Standings";
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


const EndOfGame = () => {
    const [players, setPlayers] = useState([]);
    const [winner, setWinner] = useState(null);

    const gameId = localStorage.getItem('gameId');
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await api.get(`/lobbies/`+gameId);
                const playersJson = response.data.players;
                const players = playersJson.map(playerJson => Player.fromJson(playerJson));
                playerSort(players);
                setWinner(players[0]);
                setPlayers(players.slice(1));
            } catch (error) {
                console.error(`Something went wrong while fetching the players in leaderboard: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the players in leaderboard! See the console for details.");
            }
        };
        fetchPlayers();
    }, [gameId]);

    //  Plug into "end-of-game non-winners": <Standings className="end-of-game non-winner" players={users}/>


    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <button className="multiplayer home-button"><a className="multiplayer home-button-color" href="landing">Home</a></button>
                    </ul>
                </nav>
                <h1 className="multiplayer title">End of Game</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>

            {winner && (
            <div className="end-of-game leaderboard">
                <div className="end-of-game winner">
                    <h1 className="end-of-game crown">👑</h1>
                    <h1>{winner.playerName}</h1>
                    <h1>{winner.totalScore}</h1>
                </div>
                <div className="end-of-game non-winners">
                    <Standings players={players} />
                </div>
            </div>)}

            <div className="end-of-game buttons">
                <button className="end-of-game btn"><a href="item-list">View Items</a></button>
            </div>
        </BaseContainer>
    );
}

export default EndOfGame;
