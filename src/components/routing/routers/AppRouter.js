import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import Login from "components/views/Login";
import Registration from "../../views/Registration";
import Landing from "../../views/Landing"
import Header from "../../views/Header";
import AllUsers from "../../views/AllUsers";
import ProfilePage from "../../views/ProfilePage";
import ProfileEdit from "../../views/ProfileEdit";
import ChangeAvatar from "../../views/ChangeAvatar";
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
import LobbySingle from "../../views/LobbySingle";
import GameLoadingBuffer from "../../views/GameLoadingBuffer";
import MostExpensiveItem from "../../views/MostExpensiveItem";
import DelayBuffer from "../../views/DelayBuffer";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import DelayBufferAfterLobby from "../../views/DelayBufferAfterLobby";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login">
                    <Header height="100"/>
                    <LoginGuard>
                        <Login/>
                    </LoginGuard>
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

                <Route exact path="/change-avatar/:id">
                    <GameGuard>
                        <ChangeAvatar/>
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

                <Route exact path="/most-expensive-item-game">
                    <GameGuard>
                        <MostExpensiveItem/>
                    </GameGuard>
                </Route>

                <Route exact path="/delay-buffer">
                    <GameGuard>
                        <DelayBuffer/>
                    </GameGuard>
                </Route>

                <Route exact path="/delay-buffer-after-lobby">
                    <GameGuard>
                        <DelayBufferAfterLobby/>
                    </GameGuard>
                </Route>

                <Route exact path="/lobby">
                    <GameGuard>
                        <Lobby/>
                    </GameGuard>
                </Route>

                <Route exact path="/lobby-single">
                    <GameGuard>
                        <LobbySingle/>
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
                    <Redirect to="/landing"/>
                </Route>

                <Route exact path="/registration">
                    <Header height="100"/>
                    <Registration/>
                </Route>

            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;
