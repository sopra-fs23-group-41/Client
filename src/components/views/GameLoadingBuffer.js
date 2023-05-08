
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import "styles/ui/Standings.scss";
import TimerLeaderboard from "../../helpers/TimerLeaderboard";



const GameLoadingBuffer = () => {

    const isGm = localStorage.getItem('isGm')
    let time;
    if(isGm === 'true'){
        time = 5;
    }else{
        time = 5;
    }

    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <a className="multiplayer home-button-color" href="landing">
                            <button className="multiplayer home-button">Home</button>
                        </a>
                    </ul>
                </nav>
                <h1 className="multiplayer title">Wait to load into Game...</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>


            <h1 className="next-question-title">Game starts in:</h1>
            <div className="next-question-timer">
                <TimerLeaderboard seconds={time}/>
            </div>



        </BaseContainer>
    );
}

export default GameLoadingBuffer;