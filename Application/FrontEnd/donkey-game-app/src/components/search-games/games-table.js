import React from 'react';
import GameRow from './game-row'

export default class GamesTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const myGamesFilter = this.props.myGamesFilter;

        const rows = [];
        let lastCategory = null;

        this.props.games.forEach((game) => {
            if (game.gameCode.indexOf(filterText) === -1) {
                return;
            }
            // //Ova dva If-a treba izbaciti
            // if (inStockOnly && !product.stocked) {
            //     return;
            // }
            // if (product.category !== lastCategory) {
            //     rows.push(
            //         <ProductCategoryRow
            //             category={product.category}
            //             key={product.category} />
            //     );
            // }
            if (game.gameOwner.email !== localStorage.email && myGamesFilter){
                return;
            }
            rows.push(
                <GameRow
                    game={game}
                    key={game.gameCode}
                />
            );
            //lastCategory = product.category;
        });

        return (
            <div className='tabela'>
                <table className="table" style={{"borderWidth":"3px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}} width="300" border="1" cellSpacing="2" cellPadding="2">
                    <thead>
                        <tr>
                            <th>GameOwner</th>
                            <th>GameCode</th>
                            <th>Players count</th>
                            <th>Player on the move</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}