
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
    }

    componentDidMount() {
        //this.connectGameListener();

        this.connectChat();
        window.addEventListener("storageGame", () => {
            var updatedGame = JSON.parse(localStorage.game) || []
            var myPlayerState = updatedGame.players.find(playerState => playerState.user.userID == localStorage.userID)

            if (myPlayerState == undefined ) {
                var text = this.state.game.gameOwner.userName + " removed you from game with gameCode: " + this.state.game.gameCode + " !"
                //alert(text)
                window.location.href = '/startPage';
                //localStorage.myCards = null;
                localStorage.game = null;
            }

            this.setState({ game: JSON.parse(localStorage.game) || [] });
        });
    }


    componentWillUnmount() {
        this.connection.stop();
        //this.removePlayerFromGame();
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

    connectGameListener = async () => {
        try {
            this.gameConnection = new HubConnectionBuilder()
                .withUrl("https://localhost:44382/game")
                // , 
                // {
                //     skipNegotiation: true,
                //     transport: HttpTransportType.WebSockets
                // })
                .configureLogging(LogLevel.Information)
                .build();

            // this.gameConnection.on("ReceiveMessage", (user, message) => {
            //     this.setState((state, props) => ({
            //         messages: [...this.state.messages, { user, message }]
            //     }))    //setMessages(messages => [...messages, { user, message }]);
            // });

            // this.gameConnection.on("UsersInRoom", (users) => {
            //     this.setState({
            //         users: users
            //     })//setUsers(users);
            // });

            this.gameConnection.onclose(e => {
                this.setState({
                    gameConnection: ""
                })
                // setConnection();
                // setMessages([]);
                // setUsers([]);
            });

            this.gameConnection.start();
            var user = localStorage.username
            var room = this.state.game.gameCode
            //await this.connection.invoke("JoinGroup", { user, room });

            //setConnection(connection);

            this.setState({
                gameConnection: this.gameConnection
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
            //,body: JSON.stringify(msg)
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {
                    // localStorage.gameID = result;
                    // await this.sendCreateGameMessage(localStorage.lobbyID, result);
                    localStorage.game = null;
                    window.location.href = "/startPage";


                });

            } else if (res.status == 405) {
                this.setState({
                    errors: { message: "Unable to join again!" }
                });
                window.location.href = "/startPage";

            } else {
                this.setState({
                    errors: { message: res.message }
                });
                window.location.href = "/startPage";

            }
        })
            .catch(err => {
                console.log("Join game error: ", err);
                window.location.href = "/startPage";

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
                    // localStorage.gameID = result;
                    // await this.sendCreateGameMessage(localStorage.lobbyID, result);


                    // var userIDtoRemove = parseInt(localStorage.userIDtoRemove)
                    // this.setState(state => {
                    //     var tmp = state.game.players.filter(playerState => playerState.user.userID !== userIDtoRemove)
                    //     console.log(tmp);
                    //    return { game: tmp}
                    // });

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
                    // localStorage.gameID = result;
                    // await this.sendCreateGameMessage(localStorage.lobbyID, result);


                    // var userIDtoRemove = parseInt(localStorage.userIDtoRemove)
                    // this.setState(state => {
                    //     var tmp = state.game.players.filter(playerState => playerState.user.userID !== userIDtoRemove)
                    //     console.log(tmp);
                    //    return { game: tmp}
                    // });

                });

            } else if (res.status == 405) {
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
    }

    render() {
        return (
            <div>
                {this.state.game.gameOwner.email === localStorage.email ?
                    <Header logoutHandle={this.goBackToStartGamePage} buttonVisible={true} buttonText={"GO BACK"} ></Header>
                    :
                    <Header logoutHandle={this.removePlayerFromGame} buttonVisible={true} buttonText={"GO BACK"} ></Header>
                }
                <div className="searchGame gameLobbyDiv">
                    <h1>Game code: {this.state.game.gameCode}</h1>
                    <h2>Game owner: {this.state.game.gameOwner.userName}</h2>
                    <h2>Game owner email: {this.state.game.gameOwner.email}</h2>

                    {!this.state.game.dateOfStart &&

                        <PlayerList players={this.state.game.players} removePlayerHandle={this.removeOtherPlayerFromGame} />
                    }
                    {!this.state.game.dateOfStart && this.state.game.gameOwner.email === localStorage.email &&
                        <Button className="dugme" color="primary" variant="contained" id="buttonJoinGame" onClick={() => this.handleStartGame()}>START GAME</Button>
                    }

                    {this.state.game.dateOfStart && 
                        <PlayerDataList game={this.state.game}/>

                    }


                </div>
                <div>
                    <ChatOverall gameCode={this.state.game.gameCode} />
                </div>
            </div>
        );
    }
}