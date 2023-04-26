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




    const [rounds, setRounds] = useState(null);
    const [pin, setPin] = useState(null);
    const [category, setCategory] = useState(null);
    const [gameMode, setGameMode] = useState(null);
    const [players, setPlayers] = useState(null);

    const startGame = async () => {
        api.post('lobbies/'+gameId+'/begin')
        history.push('game-loading-buffer')
    }

    localStorage.setItem('currentRound', '1');


    useEffect(() => {
        const interval = setInterval(() => {
            async function fetchData(gameId) {
                try {
                    const response = await api.get('/lobbies/'+gameId);
                    console.log(response)
                    setGameMode(response.data.gameMode);
                    setRounds(response.data.rounds);
                    setCategory(response.data.category);
                    setPin(response.data.gamePIN);
                    setPlayers(response.data.players);
                } catch (error) {
                    alert(`Something went wrong while fetching the game: \n${handleError(error)}`);
                }
            }
            fetchData(gameId);
        }, 1000);
        return () => clearInterval(interval);
    }, [gameId]);

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
                        disabled={!isGm}
                >Start Game</button>
            </div>

        </BaseContainer>
    );
}

export default Lobby;
