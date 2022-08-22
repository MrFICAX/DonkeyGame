import React from 'react';
import { Button, TextField } from '@material-ui/core';


export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleMyGamesChange = this.handleMyGamesChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleMyGamesChange(e) {
        this.props.handleMyGamesChange(e.target.checked);
    }

    render() {
        return (
            <form>
                <TextField className="inputLogin"
                    type="text"
                    placeholder="Search by gameCode..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <h2>
                    <input
                        type="checkbox"
                        className={this.props.myGamesFilter ? "checked" : ""}
                        checked={this.props.myGamesFilter}
                        onChange={this.handleMyGamesChange}
                    />
                    {' '}
                    Show my games
                </h2>
            </form>
        );
    }
}