import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/MultiPlayer.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';

const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

const SinglePlayer = () => {

    const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);
    console.log(users)



    const startSinglePlayer = () => {
        if(document.getElementById('game-mode').value === 'HighOrLow'){
            localStorage.setItem('gameMode', 'HighOrLow')
            history.push('higher-or-lower-game')
        }else{
            localStorage.setItem('gameMode', 'GuessThePrice')
            history.push('gtpgame')
        }
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
                        <a className="multiplayer home-button-color" href="landing"><button className="multiplayer home-button">Home</button></a>
                    </ul>
                </nav>
                <h1 className="multiplayer title">Singleplayer</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>
            <div className="multiplayer upper-part">
                <div className="multiplayer settings">
                    <h3>Settings</h3>
                    <p>Category</p>
                    <select className="multiplayer select" id="category">
                        <option value="SHOES">Shoes</option>
                        <option value="JEANS">Jeans</option>
                        <option value="ACCESSORIES">Accessories</option>
                    </select>
                    <p>Rounds</p>
                    <select className="multiplayer select" id="rounds">
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                        <option value="24">24</option>
                        <option value="30">30</option>
                    </select>
                    <p>Game Mode</p>
                    <select className="multiplayer select" id="game-mode">
                        <option value="GuessThePrice">Guess the Price</option>
                        <option value="HighOrLow">Higher or Lower</option>
                    </select>
                </div>
                
            </div>

            <div className="multiplayer lower-part">
                <button
                    className="singleplayer button"
                    onClick={startSinglePlayer}                >
                    Start Game</button>
            </div>

        </BaseContainer>
    );
}

export default SinglePlayer;
