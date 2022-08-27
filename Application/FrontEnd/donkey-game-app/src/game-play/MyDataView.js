import profile from '../../src/profile.svg';
import Button from '@material-ui/core/Button';
import logo from '../card-photos/back_of_card.png';
import CardsList from './CardsList'
import { useState } from 'react';

const MyDataView = ({ game, playerOnTheMove, clickOnCard, playerState }) => {

    const [myCards, setMyCards] = useState({ myCards: [] });

    //var game = localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game')) : [];

    var loggedUsername = localStorage.username
    var loggedUserID = localStorage.userID
    var loggedEmail = localStorage.email
    //setMyCards(localStorage.myCards ? JSON.parse(localStorage.myCards) : { myCards: []});

    window.addEventListener("myCards", () => {
        setMyCards(localStorage.myCards ? JSON.parse(localStorage.myCards) : { myCards: [] });
    });

    var playerOnTheMoveDiv = ""
    if (playerOnTheMove.userName === loggedUsername)
        playerOnTheMoveDiv = "playerOnTheMoveViewDiv"

    return (


        <div className={`playerDataViewDiv ${playerOnTheMoveDiv}`}>
            <img src={profile} width="200" height="100" />
            <div >
                <h4>{loggedUsername}</h4>
            </div>
            <div >
                {loggedEmail}
            </div>

            <CardsList game={game} playerState={playerState} cards={myCards} playerOnTheMove={playerOnTheMove} loggedUsername={loggedUsername} ></CardsList>



        </div>

        // <div>
        //     <h3>{username}</h3>
        //     <h3>{email}</h3>
        // </div>
    );
}

export default MyDataView;
