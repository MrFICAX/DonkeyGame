import React, { Component } from 'react';
import PlayerView from './player-view'


export default class PlayerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: this.props.players,
        }


    }
    componentWillReceiveProps(nextProps) {
        this.setState({ players: nextProps.players })
    }

    render() {

        return (
            <div className="searchGame flexColumn">

                <h1>Waiting for players to Join:</h1>
                <h2></h2>
                <div className='lobbyDiv'>
                    {
                        this.state.players.map((player) => {
                            return <PlayerView key={player.playerStateID} userID={player.user.userID} username={player.user.userName} email={player.user.email} removePlayerHandle={this.props.removePlayerHandle} />
                        })
                    }
                </div>
            </div>
        );
    }
}