import React, { Component } from "react";
import LoginForm from "./LoginForm.js";
const FormValidators = require("./Validate");
const validateLoginForm = FormValidators.validateLoginForm;

export default class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            user: {
                username: "",
                password: "Aa1234@@@@"
            },
            btnTxt: "show",
            type: "password",
        };

        this.pwMask = this.pwMask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        //this.submitSignup = this.submitSignup.bind(this);

        this.validateForm = this.validateForm.bind(this);
        this.pwHandleChange = this.pwHandleChange.bind(this);
    }

    handleChange(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    pwHandleChange(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    // async handleGetMaps(){
    //   var existingEntries = JSON.parse(localStorage.getItem("allMaps"));
    //   if(existingEntries.length === 0)
    //   {
    //       existingEntries = [];
    //       const res = await fetch("https://localhost:44348/api/Map", { method: "GET"})
    //       if (res.ok) {
    //         const d = await res.json()
    //               d.forEach(element => {
    //                   var entry = {
    //                       "id": element.id,
    //                       "name": element.name
    //                   };
    //                   localStorage.setItem("entry", JSON.stringify(entry));
    //                   existingEntries.push(entry);
    //               });
    //               localStorage.setItem("allMaps", JSON.stringify(existingEntries));  
    //       } else {
    //         this.setState({
    //           errors: { message: res.message }
    //         });
    //       }  
    //   }    
    // }

    // async submitSignup(user) {
    //     var a = 10
    //     //localStorage.setItem("allMaps", JSON.stringify([]));
    //     //await this.handleGetMaps();
    //     await fetch("https://localhost:5225/User/SignUp", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "no-cors"
    //         },
    //         body: JSON.stringify({ userName: user.usr, password: user.pw, email: user.email, token: "" })
    //     }).then(res => {
    //         if (res.ok) {
    //             res.json().then(d => {
    //                 localStorage.token = d.token;
    //                 localStorage.userID = d.id;
    //                 localStorage.username = d.username;
    //                 localStorage.isAuthenticated = true;

    //                 //Obratiti paznju na ovaj if
    //                 if (localStorage.getItem("redirect"))
    //                     window.location.href = localStorage.getItem("redirect");
    //                 else
    //                     window.location.href = "/login";
    //             })
    //         } else if (res.status === 405) {
    //             this.setState({
    //                 errors: { message: "User not found with this username and password!" },
    //                 user: { username: "", email: "", password: "", pwconfirm: "" }
    //             });
    //         } else {
    //             alert("Sign up data error! Check connection");

    //             this.setState({
    //                 errors: { message: "Error!" }
    //             });
    //         }
    //     })
    //         .catch(err => {
    //             alert("Sign up data error! Check connection" + err);
    //         });
    // }

    async submitLogin(user) {
        var a = 10
        //localStorage.setItem("allMaps", JSON.stringify([]));
        //await this.handleGetMaps();
        await fetch("https://localhost:5225/User/LogIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "no-cors"
            },
            body: JSON.stringify({ "UserID": 0, "UserName": user.usr, "Password": user.pw, "Email": user.email, "Token": "" })
        }).then(res => {
            if (res.ok) {
                res.json().then(d => {
                    localStorage.token = d.token;
                    localStorage.userID = d.userID;
                    localStorage.username = d.userName;
                    localStorage.email = d.email;
                    localStorage.isAuthenticated = true;
                    localStorage.games = [];
                    window.location.href = "/startpage";

                    // //Obratiti paznju na ovaj if
                    // if (localStorage.getItem("redirect"))
                    //   window.location.href = localStorage.getItem("redirect");
                    // else
                    //   window.location.href = "/";
                })
            } else if (res.status === 405) {
                this.setState({
                    errors: { message: "User not found with this username and password!" },
                    user: { username: "", email: "", password: "", pwconfirm: "" }
                });
            } else {
                alert("Sign up data submit error! Check connection");

                this.setState({
                    errors: { message: "Error!" }
                });
            }
        })
            .catch(err => {
                alert("Sign up data submit error: ", err);
            });
    }

    validateForm(event) {
        event.preventDefault();
        var payload = validateLoginForm(this.state.user);
        console.log(payload);
        if (payload.success) {
            this.setState({
                errors: {}
            });
            var user = {
                usr: this.state.user.username,
                pw: this.state.user.password,
                email: "probni@gmail.com"
            };
            this.submitLogin(user);
        } else {
            //const errors = "Input all fields!";
            this.setState({
                errors: { message: "Input all fields!" }
            });
        }
    }

    pwMask(event) {
        event.preventDefault();
        this.setState(state =>
            Object.assign({}, state, {
                type: this.state.type === "password" ? "input" : "password",
                btnTxt: this.state.btnTxt === "show" ? "hide" : "show"
            })
        );
    }

    render() {
        return (
            <div>
                <LoginForm
                    onSubmit={this.validateForm}
                    onChange={this.handleChange}
                    onPwChange={this.pwHandleChange}
                    errors={this.state.errors}
                    user={this.state.user}
                    btnTxt={this.state.btnTxt}
                    type={this.state.type}
                    pwMask={this.pwMask}
                />
            </div>
        );
    }
}

