import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';

const Players = ({user}) => (
    <div className="player container">
        <div className="player username">{user.playerName}</div>
    </div>
);

const Lobby = () => {
    const history = useHistory();
    const gameId = localStorage.getItem('gameId');
    const isGm = localStorage.getItem('isGm');
    localStorage.setItem('streak', '0')
    localStorage.setItem('currentRound', '1');

    const [rounds, setRounds] = useState(null);
    const [pin, setPin] = useState(null);
    const [category, setCategory] = useState(null);
    const [gameMode, setGameMode] = useState(null);
    const [players, setPlayers] = useState(null);

    const startGame = async () => {
        api.post('lobbies/'+gameId+'/begin')
    }


    useEffect(() => {
        const interval = setInterval(() => {
            async function fetchData(gameId) {
                try {
                    const response = await api.get('/lobbies/'+gameId);
                    setGameMode(response.data.gameMode);
                    setRounds(response.data.rounds);
                    localStorage.setItem('rounds', response.data.rounds)
                    setCategory(response.data.category);
                    setPin(response.data.gamePIN);
                    setPlayers(response.data.players);
                    if(response.data.gameMode === 'GuessThePrice'){
                        localStorage.setItem('gameMode', 'GuessThePrice')
                        console.log(response.data.gameMode)
                    }else{
                        localStorage.setItem('gameMode', 'HighOrLow')
                        console.log(response.data.gameMode)

                    }

                    // To check the beginning of the game
                    const beginCheck = await api.get('/lobbies/'+gameId+'/beginStatus');
                    const begin = beginCheck.data;
                    console.log(begin);
                    if (begin === true) {
                        history.push('game-loading-buffer')
                    }
                } catch (error) {
                    alert(`Something went wrong while fetching the game: \n${handleError(error)}`);
                }
            }
            fetchData(gameId);
        }, 1000);
        return () => clearInterval(interval);
    }, [gameId, history]);

    let content = (<div></div>);
    if (players) {
        content = (
            <div className="game">
                <ul className="game user-list">
                    {players.map(user => (
                        <Players user={user} key={user.id}/>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <BaseContainer className="multiplayer container">
            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <button className="multiplayer home-button"><a className="multiplayer home-button-color" href="landing">Home</a></button>
                    </ul>
                </nav>
                <h1 className="multiplayer title">Game Lobby</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>
            <div className="multiplayer upper-part">
                <div className="multiplayer settings">
                    <h2>Settings</h2>
                    <p>Game Mode: {gameMode} </p>
                    <p>Rounds: {rounds} </p>
                    <p>Category: {category} </p>
                    <p>Pincode: {pin} </p>
                    <h2 className="multiplayer list-of-players">Players</h2>
                    <p>{content}</p>
                </div>
            </div>

            <div className="multiplayer lower-part">
                <div className="multiplayer settings">
                </div>
                <button className="multiplayer button"
                        onClick={startGame}
                        disabled={!(isGm === 'true')}
                >Start Game</button>
            </div>
        </BaseContainer>
    );
}

export default Lobby;
