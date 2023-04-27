import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/ui/DisplayedItems.scss"
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import Item from "../../models/Item";

const DisplayItem = ({item}) => (
    <div className="item-list items">
        <div className="item-list container">
            <h3 className="item-list price">Price: {item.price} CHF</h3>
            <h3 className="item-list name">Name: {item.name}</h3>
            <img className="item-list picture" src={`https://${item.imageUrl}`} alt="Lol"/>
            <h3 className="item-list link"><a href={`https://asos.com/${item.url}`} target="_blank" rel="noreferrer">Link to Website</a></h3>
        </div>
    </div>
);

const ItemList = () => {
    const history = useHistory();
    const gameId = localStorage.getItem('gameId');
    console.log(gameId);
    const [items, setItems] = useState(null);

    useEffect(() => {
        async function fetchData(gameId) {
            try {
                const response = await api.get('/lobbies/'+gameId+'/articles');
                setItems(response.data);
                console.log(response);
            } catch (error) {
                alert(`Something went wrong while fetching the items: \n${handleError(error)}`);
            }
        }
        fetchData(gameId);
    }, [gameId]);

    let content = (<div></div>);
    if (items) {
        content = (

            <div className="item-list structure">
                    {items.map(item => (
                        <DisplayItem item={item} key={item.id}/>
                    ))}
                </div>

        );
    }

    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <a className="multiplayer home-button-color" href="landing"><button className="multiplayer home-button">Home</button></a>
                    </ul>
                </nav>
                <h1 className="multiplayer title">Displayed Products</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>
            
                {content}


        </BaseContainer>
    );
}

export default ItemList;
