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
import PlayerView from '../components/waiting-lobby/player-view.js'
import { HubConnection } from '@microsoft/signalr';

const MyDataView = ({ game, playerOnTheMove, clickOnCard, playerStates, playerState, connectionProp }) => {

    const [myCards, setMyCards] = useState({ myCards: [] });
    const [sameNameOfAllCards, setSameNameOfAllCards] = useState(false);
    const [layDownHandClicked, setLayDownHandClicked] = useState(false);
    const [loserPlayerFound, setloserPlayerFound] = useState(false);
    const [layedUsersIds, setLayedUsersIds] = useState([]);
    const [connection, setConection] = useState(connectionProp);

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

    //INFINITE LOOP
    // useEffect(() => {
    //     setConection(JSON.parse(localStorage.connection));
    // }, [connection])

    //var game = localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game')) : [];

    var loggedUsername = localStorage.username
    var loggedUserID = localStorage.userID
    var loggedEmail = localStorage.email
    //setMyCards(localStorage.myCards ? JSON.parse(localStorage.myCards) : { myCards: []});

    window.addEventListener("myCards", () => {
        setMyCards(localStorage.myCards ? JSON.parse(localStorage.myCards) : { myCards: [] });
    });

    window.addEventListener("connectionSet", () => {
        setConection(localStorage.connection ? JSON.parse(localStorage.connection) : {});
    });

    window.addEventListener("userIDsDownloaded", () => {

        var playerStateIDs = localStorage.layedUsers ? JSON.parse(localStorage.layedUsers) : [];
        setLayedUsersIds([]);
        playerStateIDs.map(playerStateID => {
            setLayedUsersIds([...layedUsersIds, playerStates.find(state => state.playerStateID === parseInt(playerStateID))])
        })

    });

    var playerOnTheMoveDiv = ""
    if (playerOnTheMove.userName === loggedUsername)
        playerOnTheMoveDiv = "playerOnTheMoveViewDiv"

    function layDownHand() {
        if (layedUsersIds.find(state => state.playerStateID === playerState.playerStateID)) {
            setLayDownHandClicked(true);
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
                window.dispatchEvent(new Event("qwerty"));

            } else {
                alert("Connection expected to be undefined " + connection)
            }
        } catch (e) {
            console.log(e);
        }
        //setLayedUsersIds([...layedUsersIds, playerStates.find(state => state.playerStateID === playerState.playerStateID)])
        setLayDownHandClicked(true);
    }

    function handleToClose() {
        setLayDownHandClicked(false);
    };

    function startNewGame() {
        alert("Start new game clicked");
        setLayDownHandClicked(false)
    }

    return (


        <div className={`playerDataViewDiv ${playerOnTheMoveDiv}`}>
            <img src={profile} width="200" height="100" />
            <div >
                <h4>{loggedUsername}</h4>
            </div>
            <div >
                {loggedEmail}
            </div>

            <CardsList game={game} playerState={playerState} cards={myCards} sameNameOfAllCards={sameNameOfAllCards} layDownHand={layDownHand} playerOnTheMove={playerOnTheMove} loggedUsername={loggedUsername} ></CardsList>

            <Dialog open={layDownHandClicked} /*onClose={handleToClose} */ >
                <DialogTitle>{"Waiting for others to lay hand.."}</DialogTitle>
                <DialogContent>
                    <div>
                        POZDRAV IZ DIVA
                        {
                            layedUsersIds.map(playerState => {
                                return <PlayerView key={playerState.playerStateID} userID={playerState.user.userID} username={playerState.user.userName} email={playerState.user.email} removePlayerHandle={() => { }} />
                            })
                        }
                    </div>

                    <DialogContentText>
                        Waiting to resolve loser player...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={startNewGame} //disabled={!loserPlayerFound}
                        color="primary" autoFocus>
                        START NEW GAME
                    </Button>
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
