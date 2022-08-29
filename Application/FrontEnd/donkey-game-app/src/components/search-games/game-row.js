import { Button, TextField } from '@material-ui/core';
import React from 'react';

export default class GameRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            connection: "",
            game: this.props.game,
            btnTxt: "show",
            type: "password",
            score: "0"
        }
        localStorage.gameID = 3 //hardkodirano za testiranje
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ game: nextProps.game })
    }

    handleOpenGame() {
        localStorage.setItem('game', JSON.stringify(this.state.game))// = this.state.game;
        window.location.href = "/gameLobby";
    }
    handleJoinGame() {
        // const usernames = [];

        // // players.filter(player => player.complete === true).forEach(element => {
        // //     usernames.push(element.username);
        // // });
        // var msg = {
        //     "users": usernames,
        //     "game": {
        //         gameID: localStorage.gameID,
        //         gameOwnerID: localStorage.userID,
        //         gameCode: parseInt(localStorage.gameCode)
        //     }
        // }
        localStorage.setItem('game', JSON.stringify(this.state.game))// = this.state.game;


        fetch("https://localhost:5225/Game/JoinGame/" + this.state.game.gameID + "/" + localStorage.userID, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
            //,body: JSON.stringify(msg)
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {
                    // localStorage.gameID = result;
                    // await this.sendCreateGameMessage(localStorage.lobbyID, result);

                    //localStorage.setItem('game', JSON.stringify(this.state.game))// = this.state.game;
                    window.location.href = "/gameLobby";


                });

            } else if (res.status == 405) {
                this.setState({
                    errors: { message: "Unable to join again!" }
                });
                localStorage.setItem('game', null)// = this.state.game;

            } else {
                this.setState({
                    errors: { message: res.message }
                });
                localStorage.setItem('game', null)// = this.state.game;

            }
        })
            .catch(err => {
                console.log("Join game error: ", err);
            });
    }

    sendCreateGameMessage(lobbyID, gameID) {
        const msg = {
            lobbyID: lobbyID,
            gameID: gameID
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
    render() {
        const game = this.props.game;
        const myPlayerState = this.state.game.players.find(singlePlayerState => {
            return singlePlayerState.user.userID === parseInt(localStorage.userID)
        })

        const gameFinished = game.loserPlayer ?
            "gameFinished" : "";

        const notFinished = game.playerOnTheMove && !game.loserPlayer ?
            "notFinished" : "";

        return (
            <tr className={`${gameFinished} ${notFinished}`}>
                <td style={{ "borderWidth": "2px" }}>{this.props.game.gameOwner.userName}</td>
                <td style={{ "borderWidth": "2px" }}>{this.props.game.gameCode}</td>
                <td style={{ "borderWidth": "2px" }}>{this.props.game.players.length}</td>
                <td style={{ "borderWidth": "2px" }}>{this.props.game.playerOnTheMove?.userName}</td>
                <td style={{ "borderWidth": "2px" }}>{this.props.game.loserPlayer?.userName}</td>


                <td style={{ "borderWidth": "2px" }}>
                    {this.state.game.gameOwner.email === localStorage.email &&
                        <Button color="secondary" variant="contained" id="buttonJoinGame" onClick={() => this.handleOpenGame()}>OPEN GAME</Button>
                        // :
                        // myPlayerState ?
                        //     <Button color="secondary" variant="contained" id="buttonJoinGame" onClick={() => this.handleOpenGame()}>OPEN GAME</Button>
                        //     :
                        //     <Button color="primary" variant="contained" id="buttonJoinGame" onClick={() => this.handleJoinGame()}>JOIN GAME</Button>
                        
                    }
                    {this.state.game.gameOwner.email !== localStorage.email && myPlayerState &&
                        <Button color="secondary" variant="contained" id="buttonJoinGame" onClick={() => this.handleOpenGame()}>OPEN GAME</Button>
                            // :
                            // <Button color="primary" variant="contained" id="buttonJoinGame" onClick={() => this.handleJoinGame()}>JOIN GAME</Button>

                    }
                    {this.state.game.gameOwner.email !== localStorage.email && myPlayerState == undefined && 
                        <Button color="primary" variant="contained" id="buttonJoinGame" onClick={() => this.handleJoinGame()}>JOIN GAME</Button>

                    }


                </td>
            </tr>
        );
    }
}