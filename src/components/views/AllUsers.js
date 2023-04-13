import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Landing.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import {Spinner} from "../ui/Spinner";
import {Link} from 'react-router-dom';

const Player = ({user}) => (
    <Link to={"/profilepage/" + user.id}>
        <div className="player container">
            <div className="player username">{user.username}</div>
            <div className="player name">{user.name}</div>
            <div className="player id">id: {user.id}</div>
        </div>
    </Link>
);

Player.propTypes = {
    user: PropTypes.object
};

const Allusers = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);
    console.log(users)
    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
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
        <BaseContainer className="landing container">

            <div className="landing navbar">
                <img className="landing img" src={logo} alt="LOL"/>
                <nav>
                    <ul className="nav__links">
                        <li><a href="allusers">Find User</a></li>
                        <li><a href="landing">Home</a></li>
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
            {content}
        </BaseContainer>
    );
}

export default Allusers;
