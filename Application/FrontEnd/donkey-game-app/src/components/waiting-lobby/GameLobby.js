
import React from 'react'
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import SearchComponent from "../search-games/search-games";
import Header from '../start-page/Header.js';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatOverall from '../../ChatOverall';
import PlayerList from './player-list';
import { Button } from '@material-ui/core';
import PlayerDataList from '../../game-play/PlayerDataList';
import Moment from 'moment';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LayedUserView from "../../game-play/LayedUserView.js"

const theme = createTheme({
    palette: {
        primary: purple,
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});
export default class GameLobby extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: JSON.parse(localStorage.getItem('game')),//localStorage.game,
            btnTxt: "show",
            type: "password",
            score: "0",
            connection: "",
            gameConnection: "",
            messages: [],
            users: ["marko", "jovan"]
        }

        this.removePlayerFromGame = this.removePlayerFromGame.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.removeOtherPlayerFromGame = this.removeOtherPlayerFromGame.bind(this);
        this.getMyCards = this.getMyCards.bind(this);
        this.setConnection = this.setConnection.bind(this);
    }

    setConnection(connection) {
        this.setState({ connection: connection });
    }

    componentDidMount() {

        this.connectChat();
        window.addEventListener("storageGame", () => {
            var updatedGame = JSON.parse(localStorage.game) || []
            var myPlayerState = updatedGame.players.find(playerState => playerState.user.userID == localStorage.userID)

            if (myPlayerState == undefined) {
                var text = this.state.game.gameOwner.userName + " removed you from game with gameCode: " + this.state.game.gameCode + " !"
                //alert(text)
                window.location.href = '/startPage';
                //localStorage.myCards = null;
                localStorage.game = null;
                localStorage.myCards = JSON.stringify({ myCards: [] });
            }

            this.setState({ game: JSON.parse(localStorage.game) || [] });
        });
    }


    componentWillUnmount() {
        this.connection.stop();
        //this.removePlayerFromGame();
    }

    getMyCards() {
        if (this.state.game.dateOfStart) {
            fetch("https://localhost:5225/Game/GetMyCards/" + this.state.game.gameID + "/" + localStorage.userID, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
                //body: JSON.stringify(msg)
            }).then(res => {
                if (res.ok) {
                    res.json().then(async result => {
                        // localStorage.game = result;
                        // // await sendCreateGameMessage(localStorage.lobbyID, result);
                        // alert("Game created")
                        // localStorage.setItem('game', JSON.stringify(result))// = this.state.game;
                    });
                    // window.location.href = "/gameLobby"

                } else {
                    alert("GetMyCards didnt fetch cards!")
                    // setGameCode("")
                    // this.setState({
                    //     errors: { message: res.message }
                    // });
                }
            })
                .catch(err => {
                    console.log("Create game error: ", err);
                    // setGameCode("")
                });
        }

    }

    connectChat = async () => {
        try {
            this.connection = new HubConnectionBuilder()
                .withUrl("https://localhost:44382/chat")
                .configureLogging(LogLevel.Information)
                .build();

            this.connection.on("ReceiveMessage", (user, message) => {
                this.setState((state, props) => ({
                    messages: [...this.state.messages, { user, message }]
                }))    //setMessages(messages => [...messages, { user, message }]);
            });

            this.connection.on("UsersInRoom", (users) => {
                this.setState({
                    users: users
                })//setUsers(users);
            });

            this.connection.onclose(e => {
                this.setState({
                    connection: "",
                    messages: [],
                    users: []
                })
                // setConnection();
                // setMessages([]);
                // setUsers([]);
            });

            this.connection.start();
            var user = localStorage.username
            var room = this.state.game.gameCode
            await this.connection.invoke("JoinRoom", { user, room });
            //setConnection(connection);
            this.setState({
                connection: this.connection
            })
        } catch (e) {
            console.log(e);
        }
    }

    removePlayerFromGame() {
        console.log(this.state);
        var gameID = this.state.game.gameID

        fetch("https://localhost:5225/Game/RemovePlayer/" + gameID + "/" + localStorage.userID, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {

                    localStorage.game = null;
                    localStorage.myCards = JSON.stringify({ myCards: [] });
                    window.location.href = "/startPage";

                });

            } else if (res.status == 405) {
                this.setState({
                    errors: { message: "Unable to join again!" }
                });
                window.location.href = "/startPage";
                localStorage.myCards = JSON.stringify({ myCards: [] });

            } else {
                this.setState({
                    errors: { message: res.message }
                });
                window.location.href = "/startPage";
                localStorage.myCards = JSON.stringify({ myCards: [] });

            }
        })
            .catch(err => {
                console.log("Join game error: ", err);
                window.location.href = "/startPage";
                localStorage.myCards = JSON.stringify({ myCards: [] });

            });
    }

    removeOtherPlayerFromGame() {
        console.log(this.state);
        var gameID = this.state.game.gameID

        fetch("https://localhost:5225/Game/RemovePlayer/" + gameID + "/" + localStorage.userIDtoRemove, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
            //,body: JSON.stringify(msg)
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {

                });

            } else if (res.status == 405) {
                this.setState({
                    errors: { message: "Unable to join again!" }
                });
            } else {
                this.setState({
                    errors: { message: res.message }
                });
            }
        })
            .catch(err => {
                console.log("Join game error: ", err);
            });
    }

    handleStartGame() {
        var gameID = this.state.game.gameID

        fetch("https://localhost:5225/Game/StartGame/" + gameID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            //,body: JSON.stringify(msg)
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {

                });

            } else if (res.status === 405) {
                this.setState({
                    errors: { message: "Unable to start game!" }
                });
                console.log("Unable to start game!")
                alert("No enough players in game!")
            } else {
                this.setState({
                    errors: { message: res.message }
                });
                console.log("Route not found! Error code: " + res.status)
            }
        })
            .catch(err => {
                console.log("Join game error: ", err);
            });
    }

    goBackToStartGamePage() {
        localStorage.game = null;
        window.location.href = "/startPage";
        localStorage.myCards = JSON.stringify({ myCards: [] });
    }

    render() {
        return (
            <div>
                {this.state.game.gameOwner.email === localStorage.email &&
                    <Header logoutHandle={this.goBackToStartGamePage} buttonVisible={true} buttonText={"GO BACK"} ></Header>
                    // :
                    // <Header logoutHandle={this.removePlayerFromGame} buttonVisible={true} buttonText={"DISCONNECT FROM GAME"} ></Header>
                }
                {this.state.game.gameOwner.email !== localStorage.email && this.state.game.dateOfStart == null &&
                    <Header logoutHandle={this.removePlayerFromGame} buttonVisible={true} buttonText={"DISCONNECT FROM GAME"} ></Header>
                }
                {this.state.game.gameOwner.email !== localStorage.email && this.state.game.dateOfStart != null &&
                    <Header logoutHandle={this.goBackToStartGamePage} buttonVisible={true} buttonText={"GO BACK"} ></Header>
                }

                <div className="searchGame gameLobbyDiv">
                    <h1>Game code: {this.state.game.gameCode}</h1>
                    <h2>Game owner: {this.state.game.gameOwner.userName}</h2>
                    <h2>Game owner email: {this.state.game.gameOwner.email}</h2>
                    {console.log(this.state.game.dateOfStart)}
                    <h2>Date of start: {this.state.game.dateOfStart ? Moment(this.state.game.dateOfStart).format('MMMM Do YYYY, h:mm:ss a') : "Game not started"}</h2>

                    {!this.state.game.dateOfStart &&

                        <PlayerList players={this.state.game.players} removePlayerHandle={this.removeOtherPlayerFromGame} />
                    }
                    {!this.state.game.dateOfStart && this.state.game.gameOwner.email === localStorage.email &&
                        <Button className="dugme" color="primary" variant="contained" id="buttonJoinGame" onClick={() => this.handleStartGame()}>START GAME</Button>
                    }

                    {this.state.game.dateOfStart &&
                        <PlayerDataList game={this.state.game} connection={this.state.connection} />

                    }

                    {this.state.game.loserPlayer &&

                        <Dialog open={true} /*onClose={handleToClose} */ >
                            <DialogTitle>{"GAME FINISHED"}</DialogTitle>
                            <DialogContent>
                                <div className='lobbyDiv'>
                                    {
                                        this.state.game.players.map((playerState, index) => {
                                            var flag = false;
                                            if (playerState.user.userID === this.state.game.loserPlayer.userID){
                                                flag = true;
                                            }
                                            return <LayedUserView key={playerState.playerStateID} loserPlayer={this.state.game.players.find(state => state.user.userID === this.state.game.loserPlayer.userID)} loserPlayerFound={flag} username={playerState.user.userName} email={playerState.user.email} />
                                        })
                                    }
                                </div>


                                <DialogContentText>
                                    Go back to start page...
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>

                                <Button onClick={this.goBackToStartGamePage} variant="contained"
                                    color="primary">
                                    GO BACK TO START PAGE
                                </Button>

                            </DialogActions>
                        </Dialog>
                    }

                </div>
                <div>
                    <ChatOverall getMyCards={this.getMyCards} gameCode={this.state.game.gameCode} setConnection={this.setConnection} game={this.state.game} />
                </div>
            </div>
        );
    }
}