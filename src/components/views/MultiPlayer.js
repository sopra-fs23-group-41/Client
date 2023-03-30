import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/MultiPlayer.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import {Spinner} from "../ui/Spinner";

const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

const MultiPlayer = () => {
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

    let content = <Spinner/>;

    if (users) {
        content = (
            <div className="game">
                <ul className="game user-list">
                    {users.map(user => (
                        <Player user={user} key={user.id}/>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <img className="multiplayer img" src={logo} alt="LOL"/>
                <h1 className="multiplayer title">Multiplayer</h1>
                <nav>
                    <ul className="nav__links">
                        <li><a href="landing">Home</a></li>
                    </ul>
                </nav>
            </div>
            <div className="multiplayer upper-part">
                <div className="multiplayer settings">
                    <h3>Settings</h3>
                    <p>Category</p>
                    <select className="multiplayer select">
                        <option>Choose</option>
                        <option>Men</option>
                        <option>Women</option>
                        <option>Shoes</option>
                        <option>Gucci</option>
                        <option>Dior</option>
                    </select>
                    <p>Rounds</p>
                    <select className="multiplayer select">
                        <option>Choose</option>
                        <option>6</option>
                        <option>12</option>
                        <option>18</option>
                        <option>24</option>
                        <option>30</option>
                    </select>
                    <p>Game Mode</p>
                    <select className="multiplayer select">
                        <option>Choose</option>
                        <option>Guess the Price</option>
                        <option>Higher or Lower</option>
                    </select>
                    <p>Number of Players</p>
                    <select className="multiplayer select">
                        <option>Choose</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div>
                    <h2 className="multiplayer pin">PINCODE: 123456</h2>
                </div>
            </div>

            <div className="multiplayer lower-part">
                <div className="multiplayer settings">
                    <h3>Players</h3>
                    {content}
                </div>

                <button className="multiplayer button">Start Game</button>
            </div>

        </BaseContainer>
    );
}

export default MultiPlayer;
