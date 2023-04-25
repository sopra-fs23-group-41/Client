import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/EndOfGame.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import Standings from "../../helpers/Standings";
import Player from "../../models/Player";



let p1 = {
    id: 1,
    username: "Tiago",
    points: 1615,
    rank: 1
}

let p2 = {
    id: 2,
    username: "Euni",
    points: 1315,
    rank: 3
}

let p3 = {
    id: 3,
    username: "Laurent",
    points: 1523,
    rank: 2
}

let p4 = {
    id: 4,
    username: "Yuqing",
    points: 1267,
    rank: 4
}

let p5 = {
    id: 5,
    username: "Timo",
    points: 12,
    rank: 5
}

let player1 = new Player(p1);
let player2 = new Player(p2);
let player3 = new Player(p3);
let player4 = new Player(p4);
let player5 = new Player(p5);
let players = [player1, player2, player3, player4, player5];


let temp;
function playerSort (players) {
    for(let i=0; i<players.length; i++){
        for(let j=0; j<players.length; j++){
            if(players[i].rank < players[j].rank){
                temp = players[j];
                players[j] = players[i];
                players[i] = temp;
            }
        }
    }
}
//Sort players based on Rank
playerSort(players);

//Set the winner and remove the winner from the array of players.
let winner = players[0];
players.shift();


const EndOfGame = () => {
    // use react-router-dom's hook to access the history

    //const history = useHistory();

    //  Plug into "end-of-game non-winners": <Standings className="end-of-game non-winner" players={users}/>

    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <button className="multiplayer home-button"><a className="multiplayer home-button-color" href="landing">Home</a></button>
                    </ul>
                </nav>
                <h1 className="multiplayer title">End of Game</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>

            <div className="end-of-game leaderboard">
                <div className="end-of-game winner">
                    <h1 className="end-of-game crown">👑</h1>
                    <h1>{winner.username}</h1>
                    <h1>{winner.points}</h1>
                </div>
                <div className="end-of-game non-winners">
                    <Standings players={players} />
                </div>
            </div>

            <div className="end-of-game buttons">
                <button className="end-of-game btn"><a href="item-list">View Items</a></button>
            </div>
        </BaseContainer>
    );
}

export default EndOfGame;
