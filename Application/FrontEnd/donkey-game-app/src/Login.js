// import React from "react";

// export default class LoginComponent extends React.Component{

//     render() {
//         return (
//             <p>Pozdrav iz login dela</p>
//         )
//     }
// }


import LoginContainer from "./login-form/LoginContainer"
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ThemeProvider } from '@material-ui/styles';
import './style/index.css'

function Login() {
    return (
        <>
            <ThemeProvider>
                <LoginContainer />
            </ThemeProvider>
        </>
    )
}

export default Login;
