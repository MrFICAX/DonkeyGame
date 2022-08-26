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
            cardImages: [],
            image: {}
        }

    }
    componentWillReceiveProps(nextProps) {
        this.setState({ cards: nextProps.cards })
    }

    render() {

        return (
            <div className="flexRow">
                <br />
                <div className='lobbyDiv'>
                    {Array.apply(0, Array(this.state.cardsNumber)).map(function (x, i) {
                        return <SingleCard key={i} card={{}}/>;
                    })}
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