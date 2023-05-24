import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/MultiPlayer.scss";
import "styles/views/PinCode.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import PinInput from "react-pin-input";
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';

const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

const PinCode = () => {
    const history = useHistory();
    const [pincode, setPincode] = useState(null);
    const userId = localStorage.getItem('userId');
    const joinGame = async () => {
        try {
            const requestBody = JSON.stringify({id:userId});
            const response = await api.post('/lobbies/joinGame/'+pincode, requestBody)
            const gameId = response.data.gameId;
            const playerId = response.data.playerId
            localStorage.setItem('playerId', playerId)
            localStorage.setItem('isGm', 'false');
            localStorage.setItem('gameId', gameId);
            history.push('/lobby');
        } catch (error) {
            alert(`Something went wrong with the pincode: \n${handleError(error)}`);
        }
    };

    return (
        <BaseContainer className="multiplayer container">
            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <a className="multiplayer home-button-color" href="landing"><button className="multiplayer home-button">Home</button></a>
                    </ul>
                </nav>
                <h1 className="multiplayer title">Pincode</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>

            <h1 className="pin-title">Enter the PIN here:</h1>
            <div className="pin-code">
                <PinInput
                    length={6}
                    focus type="text"
                    inputMode="text"
                    value={pincode}
                    onChange={a => setPincode(a.toLowerCase())}/>
            </div>
            <Button
                className="pin-code-button"
                onClick={() => joinGame()}
                disabled={!pincode || pincode.length !== 6}
            >
                Join Game
            </Button>
        </BaseContainer>
    );
}

export default PinCode;
