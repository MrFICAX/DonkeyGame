import React, { Component } from 'react';
import MyDataView from './MyDataView';
import PlayerDataView from './PlayerDataView';

export default class PlayerDataList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: this.props.game,
        }


    }
    componentWillReceiveProps(nextProps) {
        this.setState({ players: nextProps.players })
    }

    render() {

        return (
            <div className="searchGame flexColumn">

                <h1>Game started:</h1>
                <h2></h2>
                <div className='playersListDiv'>
                    {
                        this.state.game.players.filter(player => player.user.userID.toString() !== localStorage.userID).map((player) => {
                            // player.userID !== localStorage.userID &&
                            return <PlayerDataView key={player.playerStateID} playerOnTheMove={this.state.game.playerOnTheMove} playerState={player} />
                        })
                    }

                    <MyDataView playerOnTheMove={this.state.game.playerOnTheMove} />
                </div>
            </div>
        );
    }
}