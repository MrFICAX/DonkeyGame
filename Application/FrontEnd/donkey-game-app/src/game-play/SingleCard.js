import profile from '../../src/profile.svg';
import Button from '@material-ui/core/Button';
import logo from '../donkeyGamelogo.svg';


const SingleCard = ({ card, handleClick, selectedCard, turnsPassedWithSpecialCard }) => {

    var image = ""
    if (card.value)
        image = require(`../assets/images/${card.value + card.name}.png`)
    else
        image = require(`../assets/images/back_of_card.png`)

    var selectedCardDiv = ""
    if (selectedCard != undefined) {

        if (selectedCard?.value === card.value && selectedCard?.name === card.name) {

            selectedCardDiv = "selectedCardDiv"
        }
    }
    function handleClickOnCard() {
        if (card.value === 2) {
            if (turnsPassedWithSpecialCard === 2) {
                handleClick(card)
            } else {
                alert(turnsPassedWithSpecialCard + " turns passed!")
            }
        } else{
            handleClick(card)
        }

    }

    return (

        <div className={`CardViewDiv ${selectedCardDiv} p-3 m-3`} onClick={handleClickOnCard}>
            <img src={image} alt={logo} className="cardInHand" />
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
