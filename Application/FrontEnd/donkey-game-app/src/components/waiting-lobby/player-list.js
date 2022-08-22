import React, { Component } from 'react';
import PlayerView from './player-view'


export default class PlayerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: props.players,
        }
    }

    render() {
        return (
            <div className="searchGame lobbyDiv">

                <h1>Waiting Lobby</h1>
                <h2></h2>
                {
                    this.state.players.map((player) => {
                        return <PlayerView key={player.playerStateID} userID = {player.user.userID} username={player.user.userName} email={player.user.email} removePlayerHandle={this.props.removePlayerHandle} />
                    })
                }
            </div>
        );
    }
}