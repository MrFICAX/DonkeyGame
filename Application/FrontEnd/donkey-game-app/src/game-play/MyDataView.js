import profile from '../../src/profile.svg';
import Button from '@material-ui/core/Button';
import logo from '../card-photos/back_of_card.png';
import CardsList from './CardsList'

const MyDataView = ({ playerOnTheMove, clickOnCard }) => {
    var game = JSON.parse(localStorage.getItem('game'))

    var loggedUsername = localStorage.username
    var loggedEmail = localStorage.email
    var myCards = localStorage.myCards ? JSON.parse(localStorage.myCards) : [];

    window.addEventListener("myCards", () => {
        myCards = JSON.parse(localStorage.myCards)
    });
    
    return (


        <div className='profileViewDiv p-1 m-3'>
            <img src={profile} width="200" height="100" />
            <div >
                <h4>{loggedUsername}</h4>
            </div>
            <div >
                {loggedEmail}
            </div>

            <CardsList cards={myCards} ></CardsList>
            {/* <img src={logo} width="200" height="100" /> */}
        </div>

        // <div>
        //     <h3>{username}</h3>
        //     <h3>{email}</h3>
        // </div>
    );
}

export default MyDataView;
