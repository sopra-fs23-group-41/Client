import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/MultiPlayer.scss";
import "styles/ui/DisplayedItems.scss"
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import louisshoe from '../pictures/luisvuittonshoe.png';
import guccishoe from '../pictures/guccishoe.png';
import diorshoe from '../pictures/diorshoe.png';
import versaceshoe from '../pictures/versaceshoe.png';
import pleinjacket from '../pictures/pleinjacket.png';
import carlocolluci from '../pictures/carlocollucipulli.png';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import Item from "../../models/Item";

const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

let obj1 = {
    price: 965,
    picture: louisshoe,
    link: "https://hypebeast.com/2019/7/louis-vuitton-gives-its-luxembourg-rivoli-sneaker-an-iridescent-makeover",
    name: "Louis Vuitton Shoe"
};

let obj2 = {
    price: 730,
    picture: guccishoe,
    link: "https://www.gucci.com/ch/de/pr/women/shoes-for-women/sneakers-for-women/womens-ace-sneaker-with-bee-p-43194202JP09064?gclid=Cj0KCQjwocShBhCOARIsAFVYq0huBNmqxDgCYZkg8u1NvupyGacGxViHwjXgb_Gx3JjDtUOhQmPiJv0aAk5uEALw_wcB&gclsrc=aw.ds",
    name: "Gucci Shoe"
};

let obj3 = {
    price: 16132,
    picture: diorshoe,
    link: "https://www.farfetch.com/li/shopping/men/jordan-jordan-x-dior-air-jordan-1-high-sneakers-item-15624504.aspx?size=31&storeid=11218&utm_source=google&utm_medium=cpc&utm_keywordid=203023571&utm_shoppingproductid=15624504-31&pid=google_search&af_channel=Search&c=19614476347&af_c_id=19614476347&af_siteid=&af_keywords=pla-299013484467&af_adset_id=144242387006&af_ad_id=646114329810&af_sub1=203023571&af_sub5=15624504-31&is_retargeting=true&shopping=yes&gclid=Cj0KCQjwocShBhCOARIsAFVYq0juFWEDE35oi7BtcWq4n70LEx5yF6ALRNYSwkBYZqMQ7gSM4rG4YcQaAj0CEALw_wcB",
    name: "Dior Shoe"
};

let obj4 = {
    price: 870,
    picture: versaceshoe,
    link: "https://www.versace.com/international/en/odissea-sneakers-1y420/1004524-1A02259_DSS_420_1Y420__.html?glCountry=CH&&wt_mc=ch.shopping.google.link.shopping&gclid=Cj0KCQjwocShBhCOARIsAFVYq0iULuCUvgM7df_RzpaVQkwBbv1BT1PRbyFSdRS9uZDMBFkVJtU9x3UaAttxEALw_wcB&gclsrc=aw.ds",
    name: "Versace Shoe"
};

let obj5 = {
    price: 12090,
    picture: pleinjacket,
    link: "https://www.plein.com/an/python-leather-bomber-skull/SACC-MLB1538-PLE029P_10.html?cgid=men-clothing-leather#cgid=men-clothing-leather&pmin=1.00&prefn1=hasPicture&prefv1=true&start=2",
    name: "Plein Jacket"
};

let obj6 = {
    price: 370,
    picture: carlocolluci,
    link: "https://www.zalando.ch/carlo-colucci-strickpullover-navy-cap22q00s-k11.html?size=XXS&allophones=0&wmc=SEM410_NB_GO._4127843883_710948826_40757020927.&opc=2211&mpp=google|v1||pla-297612067635||1003297||g|c||163886194967||pla|CAP22Q00S-K110XXS000|297612067635|1|&gclsrc=aw.ds&gclid=Cj0KCQjwocShBhCOARIsAFVYq0g09oNKIpaVMjvs4qnk_D2-ue5VzAZIMZ2QVrndA4Si7L9QKAzJ-_waAoITEALw_wcB",
    name: "Carlo Colluci Pullover"
};


let item2 = new Item(obj2);
let item1 = new Item(obj1);
let item3 = new Item(obj3);
let item4 = new Item(obj4);
let item5 = new Item(obj5);
let item6 = new Item(obj6);
let itemList = [item1, item2];
console.log(itemList);

const DisplayItem = ({item}) => (
    <div className="item-list container">
        <h3 className="item-list price">Price: {item.price} CHF</h3>
        <h3 className="item-list name">Article Name: {item.name}</h3>
        <img className="item-list picture" src={item.picture} alt="Lol"/>
        <h3 className="item-list link"><a href={item.link} target="_blank">Link to Website</a></h3>
    </div>
);


const ItemList = () => {
    // use react-router-dom's hook to access the history

    //const history = useHistory();

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);
    console.log(users)


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



    let itemss = <DisplayItem item={item1}/>
    let itemsss = <DisplayItem item={item2}/>
    let itemssss = <DisplayItem item={item3}/>
    let itemsssss = <DisplayItem item={item4}/>
    let itemssssss = <DisplayItem item={item5}/>
    let itemsssssss = <DisplayItem item={item6}/>





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
            <div className="item-list structure">
                <div className="item-list items">{itemss}</div>
                <div className="item-list items">{itemsss}</div>
                <div className="item-list items">{itemssss}</div>
                <div className="item-list items">{itemsssss}</div>
                <div className="item-list items">{itemssssss}</div>
                <div className="item-list items">{itemsssssss}</div>
            </div>

        </BaseContainer>
    );
}

export default ItemList;
