import profile from '../../../src/profile.svg';
import BlankCardsList from './BlankCardsList.js'

const PlayerDataView = ({ game, playerOnTheMove, playerState }) => {
    
    // var game = JSON.parse(localStorage.getItem('game'))
    // var loggedUsername = localStorage.username
    // var numOfCards = 4;
    // if (playerOnTheMove.userName === playerState.user.userName)
    //     this.numOfCards = 5;
    var donkey = "donkey"
    var tmpDonkey = donkey.slice(0, playerState.points) + "_".repeat(donkey.length - playerState.points)
    var playerOnTheMoveDiv = ""
    if (playerOnTheMove.userName === playerState.user.userName)
        playerOnTheMoveDiv = "playerOnTheMoveViewDiv"

    return (


        <div className={`playerDataViewDiv ${playerOnTheMoveDiv}`}>
            <img src={profile} alt="" width="200" height="100" />
            <div >
                <h4>{playerState.user.userName}</h4>
            </div>
            <div >
                {playerState.user.email}
                <br></br>
                <h2>Points: {tmpDonkey}</h2>
            </div>

            {playerOnTheMove.userName === playerState.user.userName &&
                <BlankCardsList cardsNumber={5} hasSpecialCard={playerState.hasSpecialCard} ></BlankCardsList>
            }
            {playerOnTheMove.userName !== playerState.user.userName &&
                <BlankCardsList cardsNumber={4} hasSpecialCard={playerState.hasSpecialCard}></BlankCardsList>
            }
        </div>

        // <div>
        //     <h3>{username}</h3>
        //     <h3>{email}</h3>
        // </div>
    );
}

export default PlayerDataView;
