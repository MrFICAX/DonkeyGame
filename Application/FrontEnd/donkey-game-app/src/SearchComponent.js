import { Button, TextField } from '@material-ui/core';
import React from 'react';

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

class GameRow extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
                connection: "",
                game: {
                    code: "",
                    email: "",
                    password: "",
                    pwconfirm: ""
                },
                gameSelected: {
                    game: this.game
                },
                btnTxt: "show",
                type: "password",
                score: "0"
        }
        localStorage.gameID = 3 //hardkodirano za testiranje
    };

    handleJoinGame() {
    const usernames = [];

    // players.filter(player => player.complete === true).forEach(element => {
    //     usernames.push(element.username);
    // });
        var msg = {
            "users": usernames,
            "game": {
                gameID: localStorage.gameID,
                gameOwnerID: localStorage.userID,
                gameCode: parseInt(localStorage.gameCode)
            }
        }


        fetch("https://localhost:5225/Game/JoinGame/" + localStorage.gameID +"/"+ localStorage.userID, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(msg)
        }).then(res => {
            if (res.ok) {
                res.json().then(async result => {
                    localStorage.gameID = result;
                    await this.sendCreateGameMessage(localStorage.lobbyID, result);
                });

            } else {
                this.setState({
                    errors: { message: res.message }
                });
            }
        })
            .catch(err => {
                console.log("Create game error: ", err);
            });
    }

    sendCreateGameMessage(lobbyID, gameID) {
        const msg = {
            lobbyID: lobbyID,
            gameID: gameID
        };

        if (this.connection.connectionStarted) {
            try {
                this.connection.send('CreateGame', msg);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }
    render() {
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            <span style={{ color: 'red' }}>
                {product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
                <td>
                    <Button color="primary" variant="contained" id="buttonJoinGame" onClick={() => this.handleJoinGame()}>JOIN GAME</Button>


                </td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
            if (product.name.indexOf(filterText) === -1) {
                return;
            }
            //Ova dva If-a treba izbaciti
            if (inStockOnly && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category} />
                );
            }
            rows.push(
                <GameRow
                    product={product}
                    key={product.name}
                />
            );
            lastCategory = product.category;
        });

        return (
            <div className='tabela'>
            <table className='DivSveTabele' width="300" border="1" cellSpacing="2" cellPadding="2">
                <thead>
                    <tr>
                        <th>GameOwner</th>
                        <th>GameCode</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            </div>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        return (
            <form>
                <TextField className="inputLogin"
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <h4>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockChange}
                    />
                    {' '}
                    Only show products in stock
                </h4>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

export default class SearchComponent extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            games : []
        };

        /*
        game = {
            dateOfStart: null,
            gameCode: "asdfasdfs",
            gameID: 11,
            gameOwner: {
                email: "fica@example.com",
                password: "",
                token: "sfsadfsadfa",
                
            }

        }
        
        
        */

        this.getAllGamesNotStarted = this.getAllGamesNotStarted.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.submitLogin = this.submitLogin.bind(this);
        // //this.submitSignup = this.submitSignup.bind(this);

        // this.validateForm = this.validateForm.bind(this);
        // this.pwHandleChange = this.pwHandleChange.bind(this);
    }
    
    componentDidMount(){
        this.getAllGamesNotStarted()
    }

    async getAllGamesNotStarted() {
        
        await fetch("https://localhost:5225/Game/GetAllGamesNotStarted", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "no-cors"
            }
            //body: JSON.stringify({ "UserID": 0, "UserName": user.usr, "Password": user.pw, "Email": user.email, "Token": "" })
        }).then(res => {
            if (res.ok) {
                res.json().then(games => {
                    alert("Games downloaded!");
                    //console.log(games);
                    this.setState((state) => {
                        return { games: games };
                    });
                })
            } else {
                alert("Games not downloaded!");

                this.setState({
                    errors: { message: "Error!" }
                });
            }
        })
            .catch(err => {
                alert("Games not downloaded: ", err);
                this.setState({
                    errors: { message: "Error!" }
                });
            });
    }
    
    
    
    render() {
        return (
            <div className='searchGame'>
            <h1>SEARCH ONLINE GAMES</h1>
            <FilterableProductTable products={PRODUCTS}  />
            </div>
        )
    }
}

const PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];
// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />,
//   document.getElementById('container')
// );