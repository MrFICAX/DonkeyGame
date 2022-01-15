import React, { Component } from 'react';
import GameRow from './GameRow'

export default class GameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games: props.games,
        }
    }

    render() {
        return (
            <div className="container main-content">
                {
                    // this.props.games.forEach((game) => {
                    //    return <GameRow key={game.id} OwnerName={game.name} gameCode={game.gameCode} />
                    // })
                }
            </div>
        );
    }
}