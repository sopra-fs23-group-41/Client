import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
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

    const history = useHistory();

    const [players, setPlayers] = useState([]);
    const [winner, setWinner] = useState(null);

    const gameId = localStorage.getItem('gameId');
    const isGm = localStorage.getItem('isGm');

    const endGame = async () => {
        const response = await api.post('lobbies/'+gameId+'/end')
        console.log(response)
        history.push('landing')
    }
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await api.get(`/lobbies/`+gameId);
                let temporaryPlayers = [];
                for(let i=0; i<response.data.players.length; i++){
                    const tempPlayer = new Player();
                    console.log(response.data.players[i].roundScore)
                    tempPlayer.playerName = response.data.players[i].playerName;
                    tempPlayer.roundScore = response.data.players[i].roundScore;
                    tempPlayer.totalScore = response.data.players[i].totalScore;
                    temporaryPlayers[i] = tempPlayer;
                }
                playerSort(temporaryPlayers);
                setWinner(temporaryPlayers[0]);
                setPlayers(temporaryPlayers.slice(1));
            } catch (error) {
                console.error(`Something went wrong while fetching the players in leaderboard: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the players in leaderboard! See the console for details.");
            }
        };
        fetchPlayers();
    }, [gameId]);




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
                <button className="end-of-game btn"
                        onClick={endGame}
                        disabled={!(isGm === 'true')}
                >End Game</button>

            </div>
        </BaseContainer>
    );
}

export default EndOfGame;
