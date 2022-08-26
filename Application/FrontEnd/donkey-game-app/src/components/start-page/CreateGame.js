import React, { useState } from 'react'
import Spinner from "../../Spinner"
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
import { useEffect } from 'react';


export default function CreateGame() {

    const [gameCode, setGameCode] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    // function CreateGame() {
    //     setShowSpinner(true);
    //     fetch("https://localhost:5225/Game/CreateGame", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ "gameCode": gameCode })
    //     }).then(p => {
    //         if (p.ok) {
    //             setShowSpinner(false);
    //             p.json().then(data => {
    //                 localStorage.setItem("gameCode", data.gameCode);
    //                 console.log(data);
    //                 // window.location.replace("/Sobe");
    //             });
    //         }
    //         else {
    //             console.log("Game not created!");
    //             setShowSpinner(false);
    //         }
    //     }).catch(exc => {
    //         console.log("Game not created!");
    //         setShowSpinner(false);
    //     });
    // }

    function handleCreateGame() {
        //const usernames = [];

        // players.filter(player => player.complete === true).forEach(element => {
        //     usernames.push(element.username);
        // });

        // var msg = {
        //     "users": usernames,
        //     "game": {
        //         gameOwnerID: localStorage.userID,
        //         gameCode: parseInt(localStorage.gameCode)
        //     }
        // }

        var value = 'default'
        if (gameCode !== "")
            value = gameCode;//setGameCode("default");
        fetchCreateGame(value)
    }

    function fetchCreateGame(value) {
        fetch("https://localhost:5225/Game/CreateGame/" + localStorage.userID + "/" + value, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
            //body: JSON.stringify(msg)
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {
                    localStorage.game = result;
                    // await sendCreateGameMessage(localStorage.lobbyID, result);
                    //alert("Game created")
                    localStorage.setItem('game', JSON.stringify(result))// = this.state.game;
                });
                window.location.href = "/gameLobby"

            } else {
                alert("Game not created")
                setGameCode("")
                // this.setState({
                //     errors: { message: res.message }
                // });
            }
        })
            .catch(err => {
                console.log("Create game error: ", err);
                setGameCode("")
            });
    }

    function sendCreateGameMessage(lobbyID, gameID) {
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

    return (
        <div>
            {showSpinner && <Spinner />}
            <div className="effect">
                <div className="effect1">
                    <div className="divLogin">

                        <h1>Create your first game!</h1>
                        <br /><br /><br /><br />
                        <h2>Input game Code!</h2>
                        <TextField className="inputLogin" placeholder="gameCode" type="text" value={gameCode} onChange={(ev) => setGameCode(ev.target.value)} />
                        <br /><br />
                        <p className="error"></p>

                        <Button color="primary" variant="contained" id="buttonLogin" onClick={() => handleCreateGame()}>CREATE GAME</Button>

                    </div>

                </div>
                <div className="effect2">
                    <div className="aaa"></div>
                </div>
            </div>
        </div>
    )

}
