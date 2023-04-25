import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/MultiPlayer.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import Game from "../../models/Game.js";
import {useHistory} from "react-router-dom";


const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

let game = new Game();

const MultiPlayer = () => {
    // use react-router-dom's hook to access the history

    const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);
    console.log(users)


    const createLobby = async () =>{

        game.rounds = document.getElementById("rounds").value
        game.numOfPlayer = document.getElementById("players").value
        game.category = document.getElementById("category").value
        game.gameMode = document.getElementById("game-mode").value
        game.gameType = 'MULTI'

        console.log(game)
        const requestBody = JSON.stringify(game)
        console.log(requestBody)
        const request = await api.post('lobbies', requestBody)
        localStorage.setItem('gameId', request.data.gameId)
        localStorage.setItem('pincode', request.data.gamePIN)
        console.log(request.data.gameId)
        console.log(request)

        history.push('lobby')
    }

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users');

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setUsers(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);


    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <button className="multiplayer home-button"><a className="multiplayer home-button-color" href="landing">Home</a></button>
                    </ul>
                </nav>
                <h1 className="multiplayer title">Multiplayer</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>
            <div className="multiplayer upper-part">
                <div className="multiplayer settings">
                    <h2>Choose Settings</h2>
                    <p>Category</p>
                    <select className="multiplayer select" id="category">
                        <option>Choose</option>
                        <option value="SHOES">Shoes</option>
                        <option value="JEANS">Jeans</option>
                        <option value="ACCESSORIES">Accessories</option>
                    </select>
                    <p>Rounds</p>
                    <select className="multiplayer select" id="rounds">
                        <option>Choose</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                        <option value="24">24</option>
                        <option value="30">30</option>
                    </select>
                    <p>Game Mode</p>
                    <select className="multiplayer select" id="game-mode">
                        <option>Choose</option>
                        <option value="GuessThePrice">Guess the Price</option>
                        <option value="HighOrLow">Higher or Lower</option>
                    </select>
                    <p>Number of Players</p>
                    <select className="multiplayer select" id="players">
                        <option>Choose</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>

            <div className="multiplayer lower-part">
                <div className="multiplayer settings">
                </div>
                <button className="multiplayer button"
                        onClick={createLobby}
                >
                    Create Lobby
                </button>
            </div>

        </BaseContainer>
    );
}

export default MultiPlayer;
