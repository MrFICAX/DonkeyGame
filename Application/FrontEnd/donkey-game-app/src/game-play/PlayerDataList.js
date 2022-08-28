import React, { Component } from 'react';
import MyDataView from './MyDataView';
import PlayerDataView from './PlayerDataView';

export default class PlayerDataList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: this.props.game,
            connection: this.props.connection
        }


    }
    componentWillReceiveProps(nextProps) {
        this.setState({ game: nextProps.game })
        this.setState({connection: nextProps.connection})
    }

    render() {

        return (
            <div className="searchGame flexPlayersColumn">

                <h1>Game started:</h1>
                <h2></h2>
                <div className='playersListDiv'>
                    {
                        this.state.game.players.map((player, index) => {
                            // player.userID !== localStorage.userID &&
                            if (player.user.userID !== parseInt(localStorage.userID)){
                                return <PlayerDataView className={`order${index}`} key={player.playerStateID} playerOnTheMove={this.state.game.playerOnTheMove} playerState={player} />
                            } else{
                                return <MyDataView key={-1} connection={this.state.connection} playerState={player} game={this.state.game} playerStates={this.state.game.players} className={`order${this.state.game.players.findIndex(player => player.user.userID.toString() === localStorage.userID)}`} playerOnTheMove={this.state.game.playerOnTheMove} />
                            }
                        })
                    }

                    {/* <MyDataView className={`order${this.state.game.players.findIndex(player => player.user.userID.toString() === localStorage.userID)}`} playerOnTheMove={this.state.game.playerOnTheMove} /> */}
                
                    {/* <MyDataView className={`order0`} playerOnTheMove={this.state.game.playerOnTheMove} /> */}

                </div>
            </div>
        );
    }
}