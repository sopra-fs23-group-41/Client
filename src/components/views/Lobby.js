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
    const [activateLoading, setActivateLoading] = useState(false);

    const [rounds, setRounds] = useState(null);
    const [pin, setPin] = useState(null);
    const [category, setCategory] = useState(null);
    const [gameMode, setGameMode] = useState(null);
    const [players, setPlayers] = useState(null);

    const startGame = async () => {
        setActivateLoading(true);
        try{
            await api.post('lobbies/' + gameId + '/begin')

        }catch(error){
            alert(error.response.data.message)
        }
    }
    const closeLobby = async () => {
        history.push('landing')
        await api.post('lobbies/'+gameId+'/end')
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
                    if (rounds !== null) {
                        localStorage.setItem('rounds', rounds.toString());
                    }
                    if(response.data.gameMode === 'GuessThePrice'){
                        localStorage.setItem('gameMode', 'GuessThePrice')
                    }else if(response.data.gameMode === 'HighOrLow'){
                        localStorage.setItem('gameMode', 'HighOrLow')
                    }else if(response.data.gameMode === 'MostExpensive'){
                        localStorage.setItem('gameMode', 'MostExpensive')
                    }else{
                        localStorage.setItem('gameMode', 'Mix')
                    }

                    // To check the beginning of the game
                    const beginCheck = await api.get('/lobbies/'+gameId+'/beginStatus');
                    const begin = beginCheck.data;
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
    }, [gameId, history, rounds]);

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
                <button className="lobby button"
                        onClick={closeLobby}
                        disabled={!(isGm === 'true')}
                >Close Lobby</button>
                <button className="lobby button"
                        onClick={startGame}
                        disabled={!(isGm === 'true')}
                >Start Game</button>
            </div>

            {activateLoading && <div className="loading ring">Loading
                <span></span>
            </div>}
            {!(isGm === 'true') && <div className="loading ring">Waiting
                <span></span>
            </div>}

        </BaseContainer>
    );
}

export default Lobby;
