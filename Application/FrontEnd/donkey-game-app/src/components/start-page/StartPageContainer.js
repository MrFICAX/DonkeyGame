import { React, useState, useEffect, Component } from 'react'
import SearchComponent from "../search-games/search-games";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import './StartPage.css'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import logo from '../../donkeyGamelogo.svg';

import GameList from "../../games-preview/GameList"
import CreateGame from './CreateGame';
import Chat from '../../chat/Chat';
import ChatOverall from '../../ChatOverall';
import Header from './Header.js';

export default class StartPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: {
                code: "",
                email: "",
                password: "",
                pwconfirm: ""
            },
            gameSelected: {
                game: this.game
            },
            btnTxt: "show",
            type: "password",
            score: "0",
            connection: undefined,
            gameConnection: "",
            messages: [],
            users: ["marko", "jovan"]
        }
        this.getGames();
        this.handleChange = this.handleChange.bind(this);
        this.connectGameListener = this.connectGameListener.bind(this);
    };

    componentDidMount() {
        localStorage.game = null;
        //localStorage.myCards = null;
        localStorage.userIDtoRemove = null;
    }


    handleChange(event) {
        const field = event.target.name;
        const game = this.state.game;
        game[field] = event.target.value;

        this.setState({
            game
        });
    }

    componentDidMount() {
        //this.connectGameListener();
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

            this.gameConnection.on("ReceiveMessage", (user, message) => {
                this.setState((state, props) => ({
                    messages: [...this.state.messages, { user, message }]
                }))    //setMessages(messages => [...messages, { user, message }]);
            });

            this.gameConnection.on("UsersInRoom", (users) => {
                this.setState({
                    users: users
                })//setUsers(users);
            });

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

    getGames() {
        fetch("https://localhost:5225/Game/GetAllGamesNotStarted", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {
                    localStorage.games = JSON.stringify(result);
                    window.dispatchEvent(new Event("storage"));
                });

            } else {
                this.setState({
                    errors: { message: res.message }
                });
            }
        })
            .catch(err => {
                console.log("Create game error: ", err);
            });
    }

    AccessGame() {

        //gameSelected

        fetch("https://localhost:5225/Game/JoinGame/" + this.gameSelected.gameID + "/" + localStorage.userID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {
                    localStorage.game = result;
                });

            } else {
                this.setState({
                    errors: { message: res.message }
                });
            }
        })
            .catch(err => {
                console.log("Create game error: ", err);
            });
    }
    // handleCreateGame() {
    //     const usernames = [];

    //     // players.filter(player => player.complete === true).forEach(element => {
    //     //     usernames.push(element.username);
    //     // });

    //     var msg = {
    //         "users": usernames,
    //         "mapID": parseInt(localStorage.mapID)
    //     }

    //     fetch("https://localhost:5225/Game/CreateGame"+ localStorage.userID, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(msg)
    //     }).then(res => {
    //         if (res.ok) {
    //             res.json().then(async result => {
    //                 localStorage.gameID = result;
    //                 await this.sendCreateGameMessage(localStorage.lobbyID, result);
    //             });

    //         } else {
    //             this.setState({
    //                 errors: { message: res.message }
    //             });
    //         }
    //     })
    //         .catch(err => {
    //             console.log("Create game error: ", err);
    //         });
    // }

    // sendCreateGameMessage(lobbyID, gameID) {
    //     const msg = {
    //         lobbyID: lobbyID,
    //         gameID: gameID
    //     };

    //     if (this.connection.connectionStarted) {
    //         try {
    //             this.connection.send('CreateGame', msg);
    //         }
    //         catch (e) {
    //             console.log(e);
    //         }
    //     }
    //     else {
    //         alert('No connection to server yet.');
    //     }
    // }

    componentDidMount() {
        //this.startConnection()
    }

    componentWillUnmount() {
        //this.closeConnection();
    }

    // startConnection = async () => {
    //     try {
    //         this.connection = new HubConnectionBuilder()
    //             .withUrl("https://localhost:44382/chat")
    //             .configureLogging(LogLevel.Information)
    //             .build();

    //         this.connection.on("ReceiveMessage", (user, message) => {
    //             this.setState((state, props) => ({
    //                 messages: [...this.state.messages, { user, message }]
    //             }))    //setMessages(messages => [...messages, { user, message }]);
    //         });

    //         this.connection.on("UsersInRoom", (users) => {
    //             this.setState({
    //                 users: users
    //             })//setUsers(users);
    //         });

    //         this.connection.onclose(e => {
    //             this.setState({
    //                 connection: "",
    //                 messages: [],
    //                 users: []
    //             })
    //             // setConnection();
    //             // setMessages([]);
    //             // setUsers([]);
    //         });

    //         await this.connection.start();
    //         var user = localStorage.username
    //         var room = "startPage"
    //         await this.connection.invoke("JoinRoom", { user, room });
    //         //setConnection(connection);
    //         this.setState({
    //             connection: this.connection
    //         })
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // sendMessage = async (message) => {
    //     try {
    //         await this.connection.invoke("SendMessage", message);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // closeConnection = async () => {
    //     try {
    //         await this.connection.stop();
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    handleLogOut() {
        // if (connection.connectionStarted) {
        //     try {
        //         await connection.send('LeaveLobbyGroup', localStorage.lobbyID, localStorage.username);
        //     }
        //     catch (e) {
        //         console.log(e);
        //     }
        // }
        // else {
        //     alert('No connection to server yet.');
        // }

        localStorage.clear();
        window.location.href = "/";
    }
    render() {
        return (
            <div>
                <Header logoutHandle={this.handleLogOut} buttonVisible={true} buttonText={"LOG OUT"} ></Header>

                <div className="lobbyDiv">
                    {/* <SearchComponent maps={localStorage.getItem("allMaps")} /> */}
                    <SearchComponent />

                    {/* <GameList games={localStorage.getItem("games")} /> */}
                    {/* <div className="playersDiv">
                                <label>Players:</label>
                                <div>
                                    <PlayerList players={players} togglePlayer={togglePlayer} />
                                    </div>
                                    <div className="clearPlayersDiv">
                                    <button className="clearPlayersBtn" onClick={handleClearPlayers}>Clear Players</button>
                                    <p>{players.filter(player => player.complete).length} players invited</p>
                                </div>
                            </div> */}
                    <div className="createGame">
                        <CreateGame /*handleCreateGame={this.handleCreateGame}*/></CreateGame>
                        {/* <form>
                            <TextField className="textfield"
                                type="input"
                                name="pwconfirm"
                                label="Input Game Code..."
                                value={this.state.game.code}
                                onChange={this.handleChange}
                            />
                            <br />
                            <Button color="primary" variant="contained"
                                className="signUpSubmit"
                                primary={true.toString()}
                                type="submit"
                                label="Create Game"
                            >Create Game</Button>
                        </form> */}
                    </div>
                    <label>{localStorage.lobbyID}</label>
                </div>
                <div>
                    <ChatOverall gameCode={"startPage"} getMyCards = {() =>{}} game={ { gameCode: "mockGame"} } />

                </div>

                {/* <div className='chat'>
                    {this.connection
                        ?
                        <Chat sendMessage={this.sendMessage} messages={this.messages} users={this.users} closeConnection={this.closeConnection} />
                        :
                        <div></div>
                    }
                </div> */}
            </div>
        );
    }
}