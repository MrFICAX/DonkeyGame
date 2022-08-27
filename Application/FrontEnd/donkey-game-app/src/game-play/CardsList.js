import React, { Component } from 'react';
import MyDataView from './MyDataView';
import PlayerDataView from './PlayerDataView';
import logo from '../card-photos/back_of_card.png';
import SingleCard from './SingleCard';
import Button from '@material-ui/core/Button';

export default class CardsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: this.props.game,
            cards: this.props.cards,
            turnsPassedWithSpecialCard: this.props.playerState.turnsPassedWithSpecialCard,
            playerOnTheMove: this.props.playerOnTheMove,
            loggedUsername: this.props.loggedUsername,
            cardImages: [],
            loggedUserID: localStorage.userID,
            image: {},
            btnClickable: false,
            selectedCard: {
                name: "",
                value: ""
            },
            cardSelected: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ cards: nextProps.cards })
        this.setState({ game: nextProps.game })
        this.setState({ playerOnTheMove: nextProps.game.playerOnTheMove})
        this.setState({ turnsPassedWithSpecialCard: nextProps.playerState.turnsPassedWithSpecialCard})

    }

    passACardToNextPlayer(card) {
        fetch("https://localhost:5225/Game/PassACard/" + this.state.game.gameID + "/" + parseInt(this.state.loggedUserID) + "/" + card.cardID, {
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

    handleClick(card) {
        if (this.state.playerOnTheMove.userName === this.state.loggedUsername) {

            if (this.state.selectedCard.name === card.name && this.state.selectedCard.value == card.value) {
                this.setState({
                    selectedCard: { name: "", value: "" },
                    btnClickable: false,
                    cardSelected: false
                })
                // this.setState({ btnClickable: false })
                // this.setState({ cardSelected: false})
                return;
            }
            this.setState({ selectedCard: card, btnClickable: true, cardSelected: true })
            // this.setState({ btnClickable: true })
            // this.setState({ cardSelected: true })

        }
    }

    handlePassSelectedCard() {
        if (this.state.selectedCard) {
            this.passACardToNextPlayer(this.state.selectedCard);
        } else {
            alert("Card not selected!");
        }
    }

    render() {

        return (
            <div className="cardsList" >

                <div className="cardsRow">
                    <br />
                    <div className='cardsDiv'>
                        {
                            this.state.cards.myCards.map((card, index) => {
                                return <SingleCard key={index} card={card} turnsPassedWithSpecialCard={this.state.turnsPassedWithSpecialCard} selectedCard={this.state.selectedCard} handleClick={this.handleClick}></SingleCard>
                            })
                        }
                    </div>
                </div>

                {this.state.playerOnTheMove.userName == this.state.loggedUsername &&
                    <Button className="passACardButton" disabled={!this.state.btnClickable} color="primary" variant="contained" id="buttonJoinGame" onClick={() => this.handlePassSelectedCard()}>PASS SELECTED CARD</Button>
                }

                {/* <div className='flexRow'>
                    {this.state.cards.myCards.map((card, index) => {
                        <SingleCard card={card}></SingleCard>
                        
                    })}
                    
                </div> */}
            </div>
        );
    }
}