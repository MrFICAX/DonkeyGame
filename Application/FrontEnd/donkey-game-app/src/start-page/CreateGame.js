import React, { useState } from 'react'
import Spinner from "../Spinner"
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';



function CreateGame() {

    const [gameCode, setGameCode] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

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

                        <Button color="primary" variant="contained" id="buttonLogin" onClick={() => CreateGame()}>CREATE GAME</Button>

                    </div>

                </div>
                <div className="effect2">
                    <div className="aaa"></div>
                </div>
            </div>
        </div>
    )
    function CreateGame() {
        setShowSpinner(true);
        fetch("https://localhost:7225/Game/CreateGame", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "gameCode": gameCode })
        }).then(p => {
            if (p.ok) {
                setShowSpinner(false);
                p.json().then(data => {
                    localStorage.setItem("gameCode", data.gameCode);
                    console.log(data);
                    // window.location.replace("/Sobe");
                });
            }
            else {
                console.log("Game not created!");
                setShowSpinner(false);
            }
        }).catch(exc => {
            console.log("Game not created!");
            setShowSpinner(false);
        });
    }
}

export default CreateGame
