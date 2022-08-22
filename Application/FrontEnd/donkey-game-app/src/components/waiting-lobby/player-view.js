import profile from '../../../src/profile.svg';
import Button from '@material-ui/core/Button';

const PlayerView = ({ userID, username, email, removePlayerHandle }) => {
    var game = JSON.parse(localStorage.getItem('game'))

    console.log(game);
    var loggedUsername = localStorage.username

    function handleRemoveOtherPlayer(){

        localStorage.userIDtoRemove = userID
        removePlayerHandle()
    }
    return (


        <div className='profileViewDiv'>
            <img src={profile} width="200" height="100" />
            <div >
                <h4>{username}</h4>
            </div>
            <div >
                {email}
            </div>

            {   game.gameOwner.userName === loggedUsername && username !== loggedUsername &&
                <Button color="primary" variant="contained" className="logoutBtn" onClick={handleRemoveOtherPlayer} >Remove user from game</Button>}
        </div>

        // <div>
        //     <h3>{username}</h3>
        //     <h3>{email}</h3>
        // </div>
    );
}

export default PlayerView;
