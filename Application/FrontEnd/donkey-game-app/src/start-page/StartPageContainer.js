import { React, useState, useEffect} from 'react'
import SearchComponent from "../SearchBar";

export function StartPageContainer () {

    const[connection, setConnection] = useState(null);

    function handleCreateGame() {
        const usernames = [];

        // players.filter(player => player.complete === true).forEach(element => {
        //     usernames.push(element.username);
        // });

        var msg = {
            "users": usernames,
            "mapID": parseInt(localStorage.mapID)
        }

        fetch("https://localhost:44348/api/User/CreateGame", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(msg)
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {
                    localStorage.gameID = result;
                    await sendCreateGameMessage(localStorage.lobbyID, result);
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

    async function sendCreateGameMessage(lobbyID, gameID) {
        const msg = {
            lobbyID: lobbyID,
            gameID: gameID,
            mapID: parseInt(localStorage.mapID)
        };

        if (connection.connectionStarted) {
            try {
                await connection.send('CreateGame', msg);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    function handleLogOut() {
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

    return (
            <div>
                <div className="navDiv">
                    <div>
                        <a href="/gamePage"><img className="logoImg" src="http://127.0.0.1:10000/devstoreaccount1/rizzyco-container/Logo.png" alt="gamePage" /></a>
                    </div>
                    <div className="logoutDiv">
                        <label>{localStorage.username}</label>
                        <button className="logoutBtn" onClick={handleLogOut} >Log out</button>
                        <br />
                    </div>
                </div>
                <div className="lobbyDiv">
                    <SearchComponent maps={localStorage.getItem("allMaps")} />
                    <div>
                        <br />
                        <div className="playersDiv">
                            <label>Players:</label>
                            {/* <div>
                                    <PlayerList players={players} togglePlayer={togglePlayer} />
                                </div>
                                <div className="clearPlayersDiv">
                                    <button className="clearPlayersBtn" onClick={handleClearPlayers}>Clear Players</button>
                                    <p>{players.filter(player => player.complete).length} players invited</p>
                                </div> */}
                        </div>
                    </div>
                    <br />
                    <button className="startNewGameBtn" onClick={handleCreateGame}>Create game</button>
                    <br />
                    <br />
                    <label>{localStorage.lobbyID}</label>
                </div>
            </div>
        )
}

export default StartPageContainer
