import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
//import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import Registration from "../../views/Registration";
import Landing from "../../views/Landing"
import Header from "../../views/Header";
import AllUsers from "../../views/AllUsers";
import ProfilePage from "../../views/ProfilePage";
import ProfileEdit from "../../views/ProfileEdit";
import LeaderBoard from "../../views/LeaderBoard";
import MultiPlayer from "../../views/MultiPlayer";
import SinglePlayer from "../../views/SinglePlayer";
import AllTimeLeaderBoard from "../../views/AllTimeLeaderBoard";
import PinCode from "../../views/PinCode";
import GTPGame from "../../views/GTPGame";
import EndOfGame from "../../views/EndOfGame";
import ItemList from "../../views/ItemList";
import HigherOrLowerGame from "../../views/HigherOrLowerGame";
import Lobby from "../../views/Lobby";
import GameLoadingBuffer from "../../views/GameLoadingBuffer";
/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game">
          <GameGuard>
            <GameRouter base="/game"/>
          </GameGuard>
        </Route>
        <Route exact path="/login">
          <Header height="100"/>

            <Login/>

        </Route>
        <Route exact path="/profilepage/:id">
         <GameGuard>
           <ProfilePage/>
         </GameGuard>
        </Route>
        <Route exact path="/profileedit/:id">
         <GameGuard>
           <ProfileEdit/>
         </GameGuard>
        </Route>
        <Route exact path="/game-loading-buffer">
          <GameGuard>
            <GameLoadingBuffer/>
          </GameGuard>
        </Route>
        <Route exact path="/multiplayer">
          <GameGuard>
            <MultiPlayer/>
          </GameGuard>
        </Route>
        <Route exact path="/singleplayer">
          <GameGuard>
            <SinglePlayer/>
          </GameGuard>
        </Route>
        <Route exact path="/pincode">
          <GameGuard>
            <PinCode/>
          </GameGuard>
        </Route>
        <Route exact path="/allusers">
          <GameGuard>
            <AllUsers/>
          </GameGuard>
        </Route>
        <Route exact path="/leaderboard">
          <GameGuard>
            <LeaderBoard/>
          </GameGuard>
        </Route>
        <Route exact path="/alltimeleaderboard">
          <GameGuard>
            <AllTimeLeaderBoard/>
          </GameGuard>
        </Route>
        <Route exact path="/gtpgame">
          <GameGuard>
            <GTPGame/>
          </GameGuard>
        </Route>
        <Route exact path="/higher-or-lower-game">
          <GameGuard>
            <HigherOrLowerGame/>
          </GameGuard>
        </Route>
        <Route exact path="/lobby">
          <GameGuard>
            <Lobby/>
          </GameGuard>
        </Route>
        <Route exact path="/endofgame">
          <GameGuard>
            <EndOfGame/>
          </GameGuard>
        </Route>
        <Route exact path="/item-list">
          <GameGuard>
            <ItemList/>
          </GameGuard>
        </Route>
        <Route exact path="/landing">
          <GameGuard>
            <Landing/>
          </GameGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/game"/>
        </Route>
        <Route exact path="/registration">
          <Header height="100"/>

            <Registration/>

        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
