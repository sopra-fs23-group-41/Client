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


    const [onlyOnce, setOnlyOnce] = useState(true);



    useEffect(() =>{
        if(onlyOnce){
            initializeLobby();
            setOnlyOnce(false);
        }
    }, [onlyOnce])

    const initializeLobby = async () => {
        game.rounds = 0;
        game.numOfPlayer = 1;
        game.category = "SNEAKERS";
        game.gameMode = "GuessThePrice";
        game.gameType = 'MULTI';
        const requestBody = JSON.stringify(game)
        const request = await api.post('lobbies', requestBody)
        localStorage.setItem('gameId', request.data.gameId)
        localStorage.setItem('pincode', request.data.gamePIN)
    }
    const createLobby = async () =>{

        game.gameType = 'MULTI'

        const requestBody = JSON.stringify(game)

        const gameId = localStorage.getItem('gameId')
        localStorage.setItem('isGm', 'true')

        const update = await api.put('/lobbies/'+gameId, requestBody)
        console.log(update)
        const pincode = localStorage.getItem('pincode')
        const userId = localStorage.getItem('userId');


            try {
                const requestBody2 = JSON.stringify({id:userId});
                const response = await api.post('/lobbies/joinGame/'+pincode, requestBody2)
                const playerId = response.data.playerId
                localStorage.setItem('playerId', playerId)

                history.push('/lobby');
            } catch (error) {
                console.log(pincode);
                alert(`Something went wrong with the pincode: \n${handleError(error)}`);
            }

    }

    const updateCategory = (category) => {
        game.category = category;
    }
    const updateNrOfRounds = (rounds) => {
        game.rounds = rounds;
    }
    const updateGameMode = (gameMode) => {
        game.gameMode = gameMode;
    }

    const updateNrOfPlayer = (players) => {
        game.numOfPlayer = players;
    }

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

                        <div className="list-choice-container">
                            <div className="list-choice">
                                <div className="list-choice-title">Category</div>
                                <div className="list-choice-objects">
                                    <label>
                                        <input value="SNEAKERS" type="radio" name="category" onClick={() => updateCategory("SNEAKERS")} /> <span>Sneakers</span>
                                    </label>
                                    <label>
                                        <input value="JEANS" type="radio" name="category" onClick={() => updateCategory("JEANS")} /> <span>Jeans</span>
                                    </label>
                                    <label>
                                        <input value="ACCESSORIES" type="radio" name="category" onClick={() => updateCategory("ACCESSORIES")} /> <span>Accessories</span>
                                    </label>
                                    <label>
                                        <input value="JACKETS" type="radio" name="category" onClick={() => updateCategory("JACKETS")} /> <span>Jackets</span>
                                    </label>
                                    <label>
                                        <input value="HOODIES" type="radio" name="category" onClick={() => updateCategory("HOODIES")} /> <span>Hoodies</span>
                                    </label>
                                    <label>
                                        <input value="JEWELRY" type="radio" name="category" onClick={() => updateCategory("JEWELRY")} /> <span>Jewelry</span>
                                    </label>
                                    <label>
                                        <input value="T_SHIRTS" type="radio" name="category" onClick={() => updateCategory("T_SHIRTS")} /> <span>T-Shirts</span>
                                    </label>
                                </div>
                            </div>



                        <div className="list-choice">
                            <div className="list-choice-title">Rounds</div>
                            <div className="list-choice-objects">
                                <label>
                                    <input value="4" type="radio" name="rounds" onClick={() => updateNrOfRounds("4")}/> <span>4</span>
                                </label>
                                <label>
                                    <input value="8" type="radio" name="rounds" onClick={() => updateNrOfRounds("8")}/> <span>8</span>
                                </label>
                                <label>
                                    <input value="12" type="radio" name="rounds" onClick={() => updateNrOfRounds("12")}/> <span>12</span>
                                </label>
                                <label>
                                    <input value="16" type="radio" name="rounds" onClick={() => updateNrOfRounds("16")}/> <span>16</span>
                                </label>
                                <label>
                                    <input value="20" type="radio" name="rounds" onClick={() => updateNrOfRounds("20")}/> <span>20</span>
                                </label>
                                <label>
                                    <input value="24" type="radio" name="rounds" onClick={() => updateNrOfRounds("24")}/> <span>24</span>
                                </label>
                                <label>
                                    <input value="28" type="radio" name="rounds" onClick={() => updateNrOfRounds("2")}/> <span>28</span>
                                </label>

                            </div>
                        </div>

                        <div className="list-choice">
                            <div className="list-choice-title">Game Mode</div>
                            <div className="list-choice-objects">
                                <label>
                                    <input value="GuessThePrice" type="radio" name="game-mode" onClick={() => updateGameMode("GuessThePrice")}/> <span>Guess the Price</span>
                                </label>
                                <label>
                                    <input value="HighOrLow" type="radio" name="game-mode" onClick={() => updateGameMode("HighOrLow")}/> <span>Higher or Lower</span>
                                </label>
                                <label>
                                    <input value="MostExpensiveItem" type="radio" name="game-mode" onClick={() => updateGameMode("MostExpensive")}/> <span>Most Expensive item</span>
                                </label>
                                <label>
                                    <input value="Mix" type="radio" name="game-mode" onClick={() => updateGameMode("Mix")}/> <span>Mash Up Da Place</span>
                                </label>
                            </div>
                        </div>

                        <div className="list-choice">
                            <div className="list-choice-title">Players</div>
                            <div className="list-choice-objects">
                                <label>
                                    <input value="1" type="radio" name="players" onClick={() => updateNrOfPlayer("1")}/> <span>1</span>
                                </label>
                                <label>
                                    <input value="2" type="radio" name="players" onClick={() => updateNrOfPlayer("2")}/> <span>2</span>
                                </label>
                                <label>
                                    <input value="3" type="radio" name="players" onClick={() => updateNrOfPlayer("3")}/> <span>3</span>
                                </label>
                                <label>
                                    <input value="4" type="radio" name="players" onClick={() => updateNrOfPlayer("4")}/> <span>4</span>
                                </label>
                                <label>
                                    <input value="5" type="radio" name="players" onClick={() => updateNrOfPlayer("5")}/> <span>5</span>
                                </label>
                            </div>
                        </div>
                    </div>

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
