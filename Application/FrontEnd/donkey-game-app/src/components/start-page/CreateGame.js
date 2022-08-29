import React, { useState } from 'react'
import Spinner from "../../Spinner"
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
import { useEffect } from 'react';


export default function CreateGame() {

    const [gameCode, setGameCode] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    function handleCreateGame() {
        var value = 'default'
        if (gameCode !== "")
            value = gameCode;
        fetchCreateGame(value)
    }

    function fetchCreateGame(value) {
        setShowSpinner(true);

        fetch("https://localhost:5225/Game/CreateGame/" + localStorage.userID + "/" + value, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
            //body: JSON.stringify(msg)
        }).then(res => {
            setShowSpinner(false);
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
            }
        })
            .catch(err => {
                console.log("Create game error: ", err);
                setGameCode("")
                setShowSpinner(false);

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
