import React, { Component } from 'react';
import MyDataView from './MyDataView';
import PlayerDataView from './PlayerDataView';
import logo from '../card-photos/back_of_card.png';
import SingleCard from './SingleCard';

export default class CardsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: this.props.cards,
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
                    {
                        this.state.cards.myCards.map((card, index) => {
                            return <SingleCard key={index} card={card}></SingleCard>
                        })
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