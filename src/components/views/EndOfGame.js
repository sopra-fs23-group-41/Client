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
import "styles/views/Avatars.scss"
import Avatar from "components/Avatars/Avatar4.jpg";



function playerSort(players) {
    let maxScore = -Infinity;
    let winners = [];
    for (let i = 0; i < players.length; i++) {
        if (players[i].totalScore > maxScore) {
            winners = [players[i]];
            maxScore = players[i].totalScore;
        } else if (players[i].totalScore === maxScore) {
            winners.push(players[i]);
        }
    }
    return winners;
}


const EndOfGame = () => {

    const history = useHistory();

    const [players, setPlayers] = useState([]);
    const [winners, setWinners] = useState([]);

    const gameId = localStorage.getItem('gameId');
    const isGm = localStorage.getItem('isGm');

    const endGame = async () => {
        history.push('landing')
        await api.get('lobbies/'+gameId+'/end')
        await api.post('lobbies/'+gameId+'/end')
    }
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await api.get(`/lobbies/`+gameId);
                let temporaryPlayers = [];
                for(let i=0; i<response.data.players.length; i++){
                    const tempPlayer = new Player();
                    tempPlayer.playerName = response.data.players[i].playerName;
                    tempPlayer.roundScore = response.data.players[i].roundScore;
                    tempPlayer.totalScore = response.data.players[i].totalScore;
                    temporaryPlayers[i] = tempPlayer;
                }
                setPlayers(temporaryPlayers);
                setWinners(playerSort(temporaryPlayers));

            } catch (error) {
                console.error(`Something went wrong while fetching the players in leaderboard: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the players in leaderboard! See the console for details.");
            }
        };
        fetchPlayers().catch((error) => {
            console.error(`An error occurred while executing the fetchData function: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("An error occurred while executing the fetchData function! See the console for details.");
        });
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
            <div className='multiplayer content'>
            {winners.length > 0 && (
                    <div className="end-of-game leaderboard">
                        <h2 className="end-of-game subtitle">Winners:</h2>
                        {winners.map((winner) => (
                            <div key={winner.playerName} className="end-of-game winner">
                                <h1 className="end-of-game crown">👑</h1>
                                <img className="avatar" src={Avatar} alt="broken"/>
                                <h1>{winner.playerName}</h1>
                                <h1>{winner.totalScore}</h1>
                            </div>
                        ))}
                        {players.length > winners.length && (
                            <div className="end-of-game non-winners">
                                <h2 className="end-of-game subtitle">Losers:</h2>
                                <Standings players={players.filter((player) => !winners.includes(player))} />
                            </div>
                        )}
                    </div>
            )}

                <div className="multiplayer lower-part center">
                    <div>
                        <button className="end-of-game btn"><a className="end-of-game ref" href="item-list">View Items</a></button>
                    </div>
                    <div>
                        <button className="end-of-game btn"
                            onClick={endGame}
                            disabled={!(isGm === 'true')}
                        >Close Game</button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
}

export default EndOfGame;
