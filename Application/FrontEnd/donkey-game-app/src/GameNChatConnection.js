import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Chat from './components/chat/Chat';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

const GameNChatConnection = (props) => {
    const [connection, setConnection] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [chatName] = useState(props.gameCode);
    const [game] = useState(props.game);

    useEffect(() => {

        startConnection()
        // window.addEventListener("layDownFired", function ({ detail }) {
        //     console.log(detail)
        //     var playerstateid = detail.stateID.toString()
        //     var gamecode = detail.gameCode
        //     qwerty(playerstateid, gamecode )

        //     // if (connection !== undefined) {

        //     //     connection.invoke("LayDownHand", { playerstateid, gamecode });
        //     // }
        // });

        // window.addEventListener("qwerty", () => {
        //     console.log("qwerty");
        // })
        return () => {
            this.closeConnection()
        }
    }, [])

    useEffect(() => {
        if (connection !== undefined) {

            if (game.gameCode !== "mockGame") {
                CreateSingleGroupForUser()
            }
            window.addEventListener("layDownFired", function ({ detail }) {
                console.log(detail)
                var playerstateid = detail.stateID.toString()
                var gamecode = detail.gameCode
                LayDownHand(playerstateid, gamecode)
            });

            window.addEventListener("getLayDownHands", function ({ detail }) {
                console.log(detail)
                var playerstateid = detail.stateID.toString()
                var gamecode = detail.gameCode
                getLayDownHands(playerstateid, gamecode)
            });
        }
    }, [connection])

    function CreateSingleGroupForUser() {
        if (game.dateOfStart != null) {

            var myPlayerState = game.players.find(singlePlayerState => {
                return singlePlayerState.user.userID === parseInt(localStorage.userID);
            });
            connection.invoke("CreateSingleGroup", myPlayerState.playerStateID.toString());
            props.getMyCards();
        }

    }

    function LayDownHand(playerstateid, gamecode) {
        connection.invoke("LayDownHand", { playerstateid, gamecode });
    }

    function getLayDownHands(playerstateid, gamecode) {
        connection.invoke("GetLayDownHands", { playerstateid, gamecode });
    }

    const joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:5225/gameNchat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                setMessages(messages => [...messages, { user, message }]);
            });

            connection.on("UsersInRoom", (users) => {
                setUsers(users);
            });

            // connection.on("GroupCreated", (user) => {
            //     //alert(user + " group created!");
            // });

            connection.on("newGame", (game) => {
                console.log(game);
                const array = localStorage.games;
                const parsedArray = array ? JSON.parse(array) : [];
                console.log(parsedArray);
                const newArray = [...parsedArray, game];
                console.log(newArray);
                localStorage.games = JSON.stringify(newArray);
                window.dispatchEvent(new Event("storage"));
            })

            connection.on("myCards", (myCards) => {
                // console.log("STAMPAM MOJE KARTE:")

                //localStorage.myCards = null;
                //alert("Cards downloaded via hub!")
                //console.log(myCards);
                localStorage.myCards = JSON.stringify(myCards);
                window.dispatchEvent(new Event("myCards"));
            })

            connection.on("updateLayedUsers", (userIDs) => {
                // console.log("STAMPAM MOJE KARTE:")

                //localStorage.myCards = null;
                //alert("Cards downloaded via hub!")
                //console.log(myCards);
                localStorage.layedUsers = JSON.stringify(userIDs);
                window.dispatchEvent(new Event("userIDsDownloaded"));
            })

            connection.on("updateGame", (game) => {
                const array = localStorage.games;
                const parsedArray = array ? JSON.parse(array) : [];

                const singleGame = localStorage.game
                const parsedGame = singleGame ? JSON.parse(singleGame) : [];
                if (parsedGame?.gameCode === game.gameCode) {
                    localStorage.game = JSON.stringify(game);
                    window.dispatchEvent(new Event("storageGame"));
                }

                const updatedGames = parsedArray.map(singleGame => {
                    // 👇️ if id equals 2, update country property
                    if (singleGame.gameCode === game.gameCode) {
                        return game;
                    }
                    return singleGame;
                });
                localStorage.games = JSON.stringify(updatedGames);
                window.dispatchEvent(new Event("storage"));
            })

            connection.on("gameStarted", (game) => {
                var myId = localStorage.userID;
                getMyCards(myId, game.gameID);

                console.log(game);
                const array = localStorage.games;
                const parsedArray = array ? JSON.parse(array) : [];
                console.log(parsedArray);

                const singleGame = localStorage.game
                const parsedGame = singleGame ? JSON.parse(singleGame) : [];
                if (parsedGame?.gameCode === game.gameCode) {
                    localStorage.game = JSON.stringify(game);
                    window.dispatchEvent(new Event("storageGame"));
                }

                const updatedGames = parsedArray.map(singleGame => {
                    // 👇️ if id equals 2, update country property
                    if (singleGame.gameCode === game.gameCode) {
                        return game;
                    }
                    return singleGame;
                });
                localStorage.games = JSON.stringify(updatedGames);
                window.dispatchEvent(new Event("storage"));

                window.dispatchEvent(new Event("closeDialog"));



                //---------------------------------------------------
                if (game.gameOwner.userID === parseInt(myId)) {
                    var gameCode = game.gameCode
                    connection.invoke("ClearList", gameCode);

                    connection.on("ClearListFinished", () => {
                        //alert("List of layed users cleared!");
                    });
                }

                var myPlayerState = game.players.find(singlePlayerState => {
                    return singlePlayerState.user.userID === parseInt(myId);
                });
                connection.invoke("CreateSingleGroup", myPlayerState.playerStateID.toString());

                connection.on("GroupCreated", (user, message) => {
                    //setMessages(messages => [...messages, { user, message }]);
                    //alert("Group created for playerStateID: " + user);

                });
            })

            connection.on("gameFinished", (game) => {
                var myId = localStorage.userID;
                //getMyCards(myId, game.gameID);

                console.log(game);
                const array = localStorage.games;
                const parsedArray = array ? JSON.parse(array) : [];
                console.log(parsedArray);

                const singleGame = localStorage.game
                const parsedGame = singleGame ? JSON.parse(singleGame) : [];
                if (parsedGame?.gameCode === game.gameCode) {
                    localStorage.game = JSON.stringify(game);
                    window.dispatchEvent(new Event("storageGame")); //gameLobby
                }

                const updatedGames = parsedArray.map(singleGame => {
                    // 👇️ if id equals 2, update country property
                    if (singleGame.gameCode === game.gameCode) {
                        return game;
                    }
                    return singleGame;
                });
                localStorage.games = JSON.stringify(updatedGames);
                window.dispatchEvent(new Event("storage")); //search-games


                //---------------------------------------------------
                if (game.gameOwner.userID === parseInt(myId)) {
                    var gameCode = game.gameCode
                    connection.invoke("ClearList", gameCode);

                    connection.on("ClearListFinished", () => {
                        //alert("List of layed users cleared!");
                    });
                }

                // var myPlayerState = game.players.find(singlePlayerState => {
                //     return singlePlayerState.user.userID === parseInt(myId);
                // });
                // connection.invoke("CreateSingleGroup", myPlayerState.playerStateID.toString());

                // connection.on("GroupCreated", (user, message) => {
                //     //setMessages(messages => [...messages, { user, message }]);
                //     //alert("Group created for playerStateID: " + user);

                // });
            })

            connection.onclose(e => {
                setConnection(undefined);
                setMessages([]);
                setUsers([]);
            });

            await connection.start();
            await connection.invoke("JoinRoom", { user, room });
            console.log(connection)
            setConnection(connection);

            props.setConnection(connection)
            localStorage.connection = JSON.stringify(connection)
            window.dispatchEvent(new Event("connectionSet"));

        } catch (e) {
            console.log(e);
        }
    }

    const getMyCards = async (myId, gameID) => {
        fetch("https://localhost:5225/Game/GetMyCards/" + gameID + "/" + myId, {
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

    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

    async function startConnection() {

        var user = localStorage.username
        var room = chatName
        await joinRoom(user, room)
        return
    }

    return <div className='app'>
        <h1>MyChat</h1>
        {/* <Button disabled={isDisabled} color="primary" variant="contained" className='welcomeButton' onClick={startChat}>
            START CHAT
        </Button> */}
        <hr className='line' />
        {connection
            ? <Chat sendMessage={sendMessage} messages={messages} users={users} closeConnection={closeConnection} />
            : <div></div>
        }
    </div>
}

export default GameNChatConnection;
