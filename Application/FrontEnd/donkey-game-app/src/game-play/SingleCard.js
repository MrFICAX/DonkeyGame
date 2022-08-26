import profile from '../../src/profile.svg';
import Button from '@material-ui/core/Button';
import logo from '../donkeyGamelogo.svg';


const SingleCard = ({ card }) => {

    var image = ""
    if (card.value)
        image = require(`../assets/images/${card.value + card.name}.png`)
    else 
        image = require(`../assets/images/back_of_card.png`)

    return (

        <div className='CardViewDiv p-3 m-3'>
            <img src={image} alt={logo} width="125" height="175" />
            {/* <div >
                {<h4>{card.value}</h4>}
            </div>
            <div >
                {card.name}
            </div> */}
        </div>

        // <div>
        //     <h3>{username}</h3>
        //     <h3>{email}</h3>
        // </div>
    );
}

export default SingleCard;
