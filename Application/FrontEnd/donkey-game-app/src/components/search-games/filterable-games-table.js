import React from 'react';
import SearchBar from './search-bar';
import GamesTable from './games-table';

export default class FilterableGamesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            myGamesFilter: false
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleMyGamesChange = this.handleMyGamesChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleMyGamesChange(myGamesFilter) {
        this.setState({
            myGamesFilter: myGamesFilter
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    myGamesFilter={this.state.myGamesFilter}
                    onFilterTextChange={this.handleFilterTextChange}
                    handleMyGamesChange={this.handleMyGamesChange}
                />
                <GamesTable
                    games={this.props.games}
                    filterText={this.state.filterText}
                    myGamesFilter={this.state.myGamesFilter}
                />
            </div>
        );
    }
}