import { React, useState, useEffect, Component } from 'react'
import SearchComponent from "../SearchComponent";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import './StartPage.css'

import GameList from "../games-preview/GameList"
import CreateGame from './CreateGame';
export default class StartPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connection: "",
            game: {
                code: "",
                email: "",
                password: "",
                pwconfirm: ""
            },
            btnTxt: "show",
            type: "password",
            score: "0"
        }
        this.getGames();
        this.handleChange = this.handleChange.bind(this);

    };


    handleChange(event) {
        const field = event.target.name;
        const game = this.state.game;
        game[field] = event.target.value;

        this.setState({
            game
        });
    }

    getGames() {
        fetch("https://localhost:7225/Game/GetGames", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {
                    localStorage.games = result;
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
        fetch("https://localhost:7225/Game/AccessGame", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: { gameID: ""}
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {
                    localStorage.games = result;
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
    handleCreateGame() {
        const usernames = [];

        // players.filter(player => player.complete === true).forEach(element => {
        //     usernames.push(element.username);
        // });

        var msg = {
            "users": usernames,
            "mapID": parseInt(localStorage.mapID)
        }

        fetch("https://localhost:7225/Game/CreateGame", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(msg)
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {
                    localStorage.gameID = result;
                    await this.sendCreateGameMessage(localStorage.lobbyID, result);
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

    sendCreateGameMessage(lobbyID, gameID) {
        const msg = {
            lobbyID: lobbyID,
            gameID: gameID,
            mapID: parseInt(localStorage.mapID)
        };

        if (this.connection.connectionStarted) {
            try {
                this.connection.send('CreateGame', msg);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

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
                <div className="navDiv">
                    <div className='TitleDiv'>
                        <h1 className='pageTitle'>DONKEY GAME</h1>
                        <img className="logoImg" src="donkeyGameLogo.png" alt="asePage" />
                    </div>
                    <div className="logoutDiv">
                        <h2>UserName: </h2>
                        <h2>{localStorage.username}</h2>
                        <Button color="primary" variant="contained" className="logoutBtn" onClick={this.handleLogOut} >LOG OUT</Button>
                        <br />
                    </div>
                </div>
                <div className="lobbyDiv">
                    <SearchComponent maps={localStorage.getItem("allMaps")} />
                    <GameList games={localStorage.getItem("games")} />
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
                        <CreateGame></CreateGame>
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
            </div>
        );
    }
}