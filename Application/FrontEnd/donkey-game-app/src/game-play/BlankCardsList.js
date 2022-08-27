import React, { Component } from 'react';
import MyDataView from './MyDataView';
import PlayerDataView from './PlayerDataView';
import logo from '../card-photos/back_of_card.png';
import SingleCard from './SingleCard';

export default class BlankCardsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardsNumber: this.props.cardsNumber,
            hasSpecialCard: this.props.hasSpecialCard,
            cardImages: [],
            image: {},
            selectedCard: {
                name: "",
                value: ""
            }
        }



    }

    componentDidMount(){
        if (this.state.hasSpecialCard === true) {
            this.setState((prevState) => ({ cardsNumber: prevState.cardsNumber - 1 }))
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ cards: nextProps.cards })
    }

    render() {

        return (
            <div className="cardsRow">
                <br />
                <div className='cardsDiv'>
                    {Array.apply(0, Array(this.state.cardsNumber)).map(function (x, i) {
                        return <SingleCard key={i} card={{}} selectedCard={{ name: "", value: "" }} handleClick={() => { }} />;
                    })}
                    {this.state.hasSpecialCard &&
                        <SingleCard key={-1} card={{ cardID: -1, value: 2, name: "CLUB" }} selectedCard={{ name: "", value: "" }} handleClick={() => { }} />

                    }
                </div>

                {/* <div className='flexRow'>
                    {this.state.cards.myCards.map((card, index) => {
                        <SingleCard card={card}></SingleCard>

                    })}

                </div> */}
            </div>
        );
    }
}