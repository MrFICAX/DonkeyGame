
import React from 'react'
import Button from '@material-ui/core/Button';
import logo from '../../donkeyGamelogo.svg';

export default function Welcome() {

    function handleGoToLogIn() {
        window.location.href = "/login";
    }

    function handleGoToSignUp() {
        window.location.href = "/signup";
    }
    return (

        <div className=" gameLobbyDiv">
            <div>
                <div className="DonkeyGameTitle">DonkeyGame</div>
            </div>
            <div className='welcomePageBox'>
                <Button color="primary" variant="contained" className='welcomeButton' onClick={handleGoToLogIn}>
                    LOG IN PAGE
                </Button>
                <Button color="primary" variant="contained" className='welcomeButton' onClick={handleGoToSignUp}>
                    SIGN UP PAGE
                </Button>
            </div>
            <div className='layedProfileViewDiv p-1 m-3'>
                <img src={logo} alt="" width="500" height="400" />
                <div>
                    <h2>A multiplayer card game inspired by the popular Donkey game, with established communication between players, using the .NET framework on the BackEnd and React.js on the FrontEnd</h2>
                   <h1>Star project on GitHub if you like it!</h1>
                    <h2><a href="https://github.com/MrFICAX/DonkeyGame">Project on GitHub</a> </h2>
                </div>
            </div>
            <div>
                <h1> Students:</h1>
                <h2>Danilo Djorovic - 17100 <a href="https://github.com/danilo-dj">GitHub</a></h2>
                <h2>Filip Trajkovic - 17503 <a href="https://github.com/MrFICAX">GitHub</a></h2>
            </div>

        </div>
    )
}
