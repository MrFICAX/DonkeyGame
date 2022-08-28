import profile from '../../src/profile.svg';
import Button from '@material-ui/core/Button';
import logo from '../card-photos/back_of_card.png';
import CardsList from './CardsList'
import { useState } from 'react';
import { useEffect } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LayedUserView from './LayedUserView.js'
import { HubConnection } from '@microsoft/signalr';

const MyDataView = ({ game, playerOnTheMove, clickOnCard, playerStates, playerState, connectionProp }) => {

    const [myCards, setMyCards] = useState({ myCards: [] });
    const [sameNameOfAllCards, setSameNameOfAllCards] = useState(false);
    const [getLayedCalled, setgetLayedCalled] = useState(false);
    const [layDownHandClicked, setLayDownHandClicked] = useState(false);
    const [dialogOpened, setDialogOpened] = useState(false);

    const [loserPlayerFound, setloserPlayerFound] = useState(false);
    const [loserPlayer, setloserPlayer] = useState({});

    const [layedUsersIds, setLayedUsersIds] = useState([]);
    const [connection, setConection] = useState(connectionProp);

    useEffect(() => {
        var stateID = playerState.playerStateID.toString()
        var gameCode = game.gameCode
        var selectionFired = new CustomEvent("getLayDownHands",
            { detail: { stateID: stateID, gameCode: gameCode } } // data: { stateID: stateID, gameCode: gameCode }
        );

        if (connection !== undefined && !getLayedCalled) {

            window.dispatchEvent(selectionFired);
            setgetLayedCalled(true);
        }
    }, [connection]);



    useEffect(() => {

        if (myCards.myCards.length !== 0) {
            if (myCards.myCards[0].value === myCards.myCards[1].value &&
                myCards.myCards[0].value === myCards.myCards[2].value &&
                myCards.myCards[0].value === myCards.myCards[3].value) {
                setSameNameOfAllCards(true);
            }
            else {
                setSameNameOfAllCards(false);
            }
        }
    }, [myCards]);

    useEffect(() => {
        checkIfLoserFound();
    }, [layedUsersIds])
    //INFINITE LOOP
    // useEffect(() => {
    //     setConection(JSON.parse(localStorage.connection));
    // }, [connection])

    //var game = localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game')) : [];

    var loggedUsername = localStorage.username
    var loggedUserID = localStorage.userID
    var loggedEmail = localStorage.email
    var donkey = "donkey"
    var tmpDonkey = donkey.slice(0, playerState.points) + "_".repeat(donkey.length - playerState.points)
    //setMyCards(localStorage.myCards ? JSON.parse(localStorage.myCards) : { myCards: []});

    window.addEventListener("myCards", () => {
        setMyCards(localStorage.myCards ? JSON.parse(localStorage.myCards) : { myCards: [] });
    });

    window.addEventListener("connectionSet", () => {
        setConection(localStorage.connection ? JSON.parse(localStorage.connection) : {});
    });

    window.addEventListener("closeDialog", () => {
        setLayDownHandClicked(false)
        setDialogOpened(false)
        

    });

    window.addEventListener("userIDsDownloaded", () => {
        var playerStateIDs = localStorage.layedUsers ? JSON.parse(localStorage.layedUsers) : [];
        //setLayedUsersIds([]);
        var array = []
        playerStateIDs.map(playerStateID => {
            var playerStateTmp = playerStates.find(state => state.playerStateID === parseInt(playerStateID))
            array.push(playerStateTmp);

            setDialogOpened(true);

            if (parseInt(playerStateID) === playerState.playerStateID){
                setLayDownHandClicked(true);
            }
        })

        setLayedUsersIds(array)
    });

    var playerOnTheMoveDiv = ""
    if (playerOnTheMove.userName === loggedUsername)
        playerOnTheMoveDiv = "playerOnTheMoveViewDiv"

    function checkIfLoserFound() {

        if (layedUsersIds.length === 4) {
            setloserPlayerFound(true);
            setloserPlayer(layedUsersIds[layedUsersIds.length - 1]);

        } else {
            setloserPlayerFound(false);
            setloserPlayer({});
        }

    }

    function layDownHand() {
        if (layedUsersIds.find(state => state.playerStateID === playerState.playerStateID)) {
            setLayDownHandClicked(true);
            setDialogOpened(true);
            return;
        } else {
            if (layDownHandClicked) {

                return;
            }

            try {
                var stateID = playerState.playerStateID.toString()
                var gameCode = game.gameCode
                if (connection !== undefined) {
                    //await connection.invoke("LayDownHand", { stateID, gameCode });
                    var selectionFired = new CustomEvent("layDownFired",
                        { detail: { stateID: stateID, gameCode: gameCode } } // data: { stateID: stateID, gameCode: gameCode }
                    );

                    window.dispatchEvent(selectionFired);
                    //window.dispatchEvent(new Event("qwerty"));

                } else {
                    alert("Connection expected to be undefined " + connection)
                }
            } catch (e) {
                console.log(e);
            }
        }
        //setLayedUsersIds([...layedUsersIds, playerStates.find(state => state.playerStateID === playerState.playerStateID)])
        // setLayDownHandClicked(true);
    }

    function handleToClose() {
        setLayDownHandClicked(false);
        setDialogOpened(false);
    };

    function startNewGame() {
        alert("Start new game clicked");
        givePointsAndRefreshGame()
    }

    function givePointsAndRefreshGame() {
        fetch("https://localhost:5225/Game/GivePointAndRefreshGame/" + game.gameID + "/" + loserPlayer.user.userID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            //body: JSON.stringify(msg)
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {

                    setLayDownHandClicked(false)
                    setDialogOpened(false);
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

    return (


        <div className={`playerDataViewDiv ${playerOnTheMoveDiv}`}>
            <img src={profile} width="200" height="100" />
            <div >
                <h4>{loggedUsername}</h4>
            </div>
            <div >
                {loggedEmail}
                <br></br>
                <h2>Points: {tmpDonkey}</h2>
            </div>

            <CardsList game={game} playerState={playerState} cards={myCards} sameNameOfAllCards={sameNameOfAllCards} layDownHand={layDownHand} playerOnTheMove={playerOnTheMove} loggedUsername={loggedUsername} ></CardsList>

            <Dialog open={dialogOpened} /*onClose={handleToClose} */ >
                <DialogTitle>{"Waiting for others to lay hand.."}</DialogTitle>
                <DialogContent>
                    <div className='lobbyDiv'>
                        {
                            layedUsersIds.map((playerState, index) => {
                                return <LayedUserView key={playerState.playerStateID} loserPlayer={loserPlayer} loserPlayerFound={loserPlayerFound} username={playerState.user.userName} email={playerState.user.email} />
                            })
                        }
                    </div>


                    <DialogContentText>
                        Waiting to resolve loser player...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {!layedUsersIds.find(singlePlayerState => singlePlayerState.playerStateID === playerState.playerStateID) &&

                        <Button className="passACardButton" disabled={layDownHandClicked} color="primary" variant="contained" id="buttonJoinGame" onClick={layDownHand}>LAY DOWN HAND </Button>
                    }
                    {game.gameOwner.userID === playerState.user.userID &&

                        <Button onClick={startNewGame} variant="contained" disabled={!loserPlayerFound}
                            color="primary">
                            START NEW GAME
                        </Button>
                    }
                </DialogActions>
            </Dialog>

        </div>

        // <div>
        //     <h3>{username}</h3>
        //     <h3>{email}</h3>
        // </div>
    );
}

export default MyDataView;
