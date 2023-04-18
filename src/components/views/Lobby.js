import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/MultiPlayer.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import Player from "../../models/Player";
import Game from "../../models/Game";


const Pleyer = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
    </div>
);

Pleyer.propTypes = {
    user: PropTypes.object
};



let p1 = {
    username: "Timo",
    points: 1615,
    rank: 1
}

let p2 = {
    username: "Euni",
    points: 1315,
    rank: 3
}

let p3 = {
    username: "Tiago",
    points: 1523,
    rank: 2
}

let p4 = {
    username: "Yuqing",
    points: 1267,
    rank: 4
}

let p5 = {
    username: "Laurent",
    points: 12,
    rank: 5
}

let player1 = new Player(p1);
let player2 = new Player(p2);
let player3 = new Player(p3);
let player4 = new Player(p4);
let player5 = new Player(p5);
let players = [player1, player2, player3, player4, player5];

let mg = {
    numberOfRounds: 12,
    pincode: 2222,
    category: "shoes",
    gameMode: "Guess The Price"
}

let mockGame = new Game(mg);
console.log(mockGame);

const Lobby = () => {
    // use react-router-dom's hook to access the history

    //const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);
    console.log(users)


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

    let content = (
            <div className="game">
                <ul className="game user-list">
                    {players.map(user => (
                        <Pleyer user={user} key={user.username}/>
                    ))}
                </ul>
            </div>
    );


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

                    <p>Game Mode: {mockGame.gameMode} </p>

                    <p>Rounds: {mockGame.numberOfRounds} </p>

                    <p>Category: {mockGame.category}</p>

                    <p>Pincode: {mockGame.pincode} </p>

                    <h2 className="multiplayer list-of-players">Players</h2>
                    <p>{content}</p>

                </div>
            </div>

            <div className="multiplayer lower-part">
                <div className="multiplayer settings">

                </div>

                <button className="multiplayer button"><a href="gtpgame">Start Game</a></button>
            </div>

        </BaseContainer>
    );
}

export default Lobby;
