import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import guccishoe from '../pictures/guccishoe.png';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import Timer from "../../helpers/Timer";

const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

const GTPGame = () => {
    // use react-router-dom's hook to access the history

    //const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    const [clicked3, setClicked3] = useState(false);
    const [clicked4, setClicked4] = useState(false);
    console.log(users)

    const firstAnswer = () => {
        setClicked(true);
    }

    const secondAnswer = () => {
        setClicked2(true);
    }

    const thirdAnswer = () => {
        setClicked3(true);
    }

    const forthAnswer = () => {
        setClicked4(true);
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
                <h1 className="multiplayer title">Guess The Price</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>
            <Timer seconds={6}/>

            <img className="gtp item-pic" src={guccishoe} alt="LOL"/>

            <div className="gtp answer-container">
                {(clicked || clicked2) && <h1>Your Guess</h1>}
                {!(clicked2 || clicked3 || clicked4) && <button
                    className="gtp answer-button"
                    onClick={firstAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked ? 'navajowhite' : 'floralwhite', scale: clicked ? '1.5' : '1', marginTop: clicked? '20px' : '0px'}}
                >
                    200CHF
                </button>}
                {!(clicked || clicked3 || clicked4) && <button
                    className="gtp answer-button"
                    onClick={secondAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked2 ? 'navajowhite' : 'floralwhite', scale: clicked2 ? '1.5' : '1', marginTop: clicked2? '20px' : '0px'}}
                >
                    300CHF
                </button>}

            </div>
            <div className="gtp answer-container">
                {(clicked3 || clicked4) && <h1>Your Guess</h1>}
                {!(clicked || clicked2 || clicked4) && <button
                    className="gtp answer-button"
                    onClick={thirdAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked3 ? 'navajowhite' : 'floralwhite', scale: clicked3 ? '1.5' : '1', marginTop: clicked3? '20px' : '0px'}}
                >
                    400CHF
                </button>}
                {!(clicked || clicked3 || clicked2) && <button
                    className="gtp answer-button"
                    onClick={forthAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked4 ? 'navajowhite' : 'floralwhite', scale: clicked4 ? '1.5' : '1', marginTop: clicked4? '20px' : '0px'}}
                >
                    500CHF
                </button>}
            </div>



        </BaseContainer>
    );
}

export default GTPGame;
