import profile from '../../src/profile.svg';
import Button from '@material-ui/core/Button';
import logo from '../card-photos/back_of_card.png';
import BlankCardsList from './BlankCardsList'

const PlayerDataView = ({ game, playerOnTheMove, playerState }) => {
    
    // var game = JSON.parse(localStorage.getItem('game'))
    // var loggedUsername = localStorage.username
    // var numOfCards = 4;
    // if (playerOnTheMove.userName === playerState.user.userName)
    //     this.numOfCards = 5;
    var playerOnTheMoveDiv = ""
    if (playerOnTheMove.userName === playerState.user.userName)
        playerOnTheMoveDiv = "playerOnTheMoveViewDiv"

    return (


        <div className={`playerDataViewDiv ${playerOnTheMoveDiv}`}>
            <img src={profile} width="200" height="100" />
            <div >
                <h4>{playerState.user.userName}</h4>
            </div>
            <div >
                {playerState.user.email}
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
