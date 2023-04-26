import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Landing.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import icon1 from '../pictures/sp-icon.jpg'
import icon2 from '../pictures/pincode-icon.jpg'
import icon3 from '../pictures/mp-icon.jpg'
import {Button} from "../ui/Button";


const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
        <div className="player name">{user.name}</div>
        <div className="player id">id: {user.id}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

const Landing = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();


    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);
    console.log(users)


    const logout = async () => {
        try {
            await api.get('/users/'+localStorage.getItem('userId')+'/logout');
            localStorage.clear();
            history.push('/login');
        } catch (error) {
            alert(`Something went wrong during the logout: \n${handleError(error)}`);
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


    let content
    console.log(users)
    if (users) {
        content = (
            <div className="game">
                <ul className="game user-list">
                    {users.map(user => (
                        <Player user={user} key={user.id}/>
                    ))}
                </ul>
                <Button
                    width="100%"
                    onClick={() => logout()}
                >
                    Logout
                </Button>
            </div>
        );
    }
    console.log(content)


    return (
        <BaseContainer className="landing container">

            <div className="landing navbar">
                <img className="landing img" src={logo} alt="LOL"/>
                <nav>
                    <ul className="nav__links">
                        <li><a href="endofgame">EndOfGame</a></li>
                        <li><a href="allusers">Find User</a></li>
                        <li><a href="profilepage">View Profile</a></li>
                        <li><a href="leaderboard">Leaderboard</a></li>
                    </ul>
                </nav>
                <div className="landing button-container">

                    <button
                        className="button"
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="landing title">
                <h1>Show Me The Money</h1>
                <p>Money is the root of all evil. Or is it the root of all people?</p>
            </div>


            <div className="landing icons">
                <div className="landing icon1">
                    <h3 className="landing icon-description">Enter Pincode</h3>
                    <a href="pincode"><img className="landing icon" src={icon2} alt="LOL"/></a>
                </div>
                <div className="landing icon2">
                    <h3 className="landing icon-description">Singleplayer</h3>
                    <a href="singleplayer"><img className="landing icon" src={icon1} alt="LOL"/></a>
                </div>

                <div className="landing icon3">
                    <h3 className="landing icon-description">Multiplayer</h3>
                    <a href="multiplayer"><img className="landing icon" src={icon3} alt="LOL"/></a>
                </div>
            </div>
        </BaseContainer>
    );
}

export default Landing;
