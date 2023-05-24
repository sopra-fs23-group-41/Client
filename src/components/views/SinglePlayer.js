import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/MultiPlayer.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import Game from "../../models/Game";

const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

let game = new Game();

const SinglePlayer = () => {

    const history = useHistory();


    const [onlyOnce, setOnlyOnce] = useState(true);



    useEffect(() =>{
        if(onlyOnce){
            initializeLobby().then();
            setOnlyOnce(false);
        }
    }, [onlyOnce])

    const initializeLobby = async () => {
        game.rounds = 3;
        game.numOfPlayer = 1;
        game.category = "SNEAKERS";
        game.gameMode = "GuessThePrice";
        game.gameType = 'SINGLE';
        const requestBody = JSON.stringify(game)
        const request = await api.post('lobbies', requestBody)
        localStorage.setItem('gameId', request.data.gameId)
        localStorage.setItem('pincode', request.data.gamePIN)
    }
    const createLobby = async () =>{

        game.gameType = 'SINGLE'

        const requestBody = JSON.stringify(game)

        const gameId = localStorage.getItem('gameId')
        localStorage.setItem('isGm', 'true')

        await api.put('/lobbies/'+gameId, requestBody)
        const pincode = localStorage.getItem('pincode')
        const userId = localStorage.getItem('userId');


        try {
            const requestBody2 = JSON.stringify({id:userId});
            const response = await api.post('/lobbies/joinGame/'+pincode, requestBody2)
            const playerId = response.data.playerId
            localStorage.setItem('playerId', playerId)

            history.push('/lobby-single');
        } catch (error) {
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




    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <a className="multiplayer home-button-color" href="landing"><button className="multiplayer home-button">Home</button></a>
                    </ul>
                </nav>
                <h1 className="multiplayer title2">Singleplayer</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>
            <div className='multiplayer content'>
                <div className="singleplayer upper-part">
                    <div className="multiplayer settings">
                        <h2 className="multiplayer setting-title">Choose settings</h2>
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
                                    <input value="4" type="radio" name="rounds" onClick={() => updateNrOfRounds("3")}/> <span>3</span>
                                </label>
                                <label>
                                    <input value="8" type="radio" name="rounds" onClick={() => updateNrOfRounds("6")}/> <span>6</span>
                                </label>
                                <label>
                                    <input value="12" type="radio" name="rounds" onClick={() => updateNrOfRounds("9")}/> <span>9</span>
                                </label>
                                <label>
                                    <input value="16" type="radio" name="rounds" onClick={() => updateNrOfRounds("12")}/> <span>12</span>
                                </label>
                                <label>
                                    <input value="20" type="radio" name="rounds" onClick={() => updateNrOfRounds("15")}/> <span>15</span>
                                </label>
                                <label>
                                    <input value="24" type="radio" name="rounds" onClick={() => updateNrOfRounds("18")}/> <span>18</span>
                                </label>
                                <label>
                                    <input value="28" type="radio" name="rounds" onClick={() => updateNrOfRounds("21")}/> <span>21</span>
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
                                    <input value="MashUp" type="radio" name="game-mode" onClick={() => updateGameMode("Mix")}/> <span>Mix it up</span>
                                </label>
                            </div>
                        </div>

                        </div>
                    </div>

                </div>

                <div className="multiplayer lower-part center below">
                    <div>
                    <button
                        className="singleplayer button"
                        onClick={createLobby}
                    >
                        Start Game</button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
}

export default SinglePlayer;
