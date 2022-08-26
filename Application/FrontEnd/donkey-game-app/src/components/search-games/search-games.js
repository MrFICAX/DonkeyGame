import { Button, TextField } from '@material-ui/core';
import React from 'react';
import FilterableGamesTable from './filterable-games-table'

export default class SearchComponent extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            games : JSON.parse(localStorage.games)
        };


        window.addEventListener("storage", () => {
            this.setState({ games: JSON.parse(localStorage.games) || [] });
        });
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
                    // alert("Games downloaded!");
                    console.log(games);
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
                <FilterableGamesTable games={this.state.games}  />
            </div>
        )
    }
}
