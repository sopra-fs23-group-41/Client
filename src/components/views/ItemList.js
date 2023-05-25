import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/ui/DisplayedItems.scss"
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import {useHistory} from 'react-router-dom';

const DisplayItem = ({item}) => (
    <div className="item-list items">
        <div className="item-list container">
            <h3 className="item-list price">{item.price} USD</h3>
            <h3 className="item-list name">{item.name}</h3>
            <img className="item-list picture" src={`https://${item.imageUrl}`} alt="Lol"/>
            <h3 className="item-list link"><a href={`https://asos.com/us/${item.url}`} target="_blank" rel="noreferrer">Link to Website</a></h3>
        </div>
    </div>
);

const ItemList = () => {
    const history = useHistory();
    const gameId = localStorage.getItem('gameId');
    const playerId = localStorage.getItem('playerId');
    const [items, setItems] = useState(null);

    const endGame = async () => {
        await api.get('lobbies/'+gameId+'/end')
        await api.post('lobbies/'+gameId + '/' + playerId+'/end')
        history.push('landing')
    }

    useEffect(() => {
        async function fetchData(gameId) {
            try {
                const response = await api.get('/lobbies/'+gameId+'/articles');
                setItems(response.data);
            } catch (error) {
                alert(`Something went wrong while fetching the items: \n${handleError(error)}`);
            }
        }

        fetchData(gameId).catch((error) => {
            console.error(`An error occurred while executing the fetchData function: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("An error occurred while executing the fetchData function! See the console for details.");
        });
    }, [gameId]);

    let content = (<div></div>);
    if (items) {
        content = (
            <div className='multiplayer content'>
                <div className="item-list structure">
                    {items.map(item => (
                        <DisplayItem item={item} key={item.id}/>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <img className="multiplayer img" src={logo} alt="LOL"/>
                <h1 className="multiplayer title">Displayed Products</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>
            {content}
            <div className="multiplayer lower-part center below">
                <div>
                    <button className="end-of-game btn"
                        onClick={endGame}
                    >Close Game</button>
                </div>
            </div>
        </BaseContainer>
    );
}

export default ItemList;
