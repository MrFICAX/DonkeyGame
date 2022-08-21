
import React from 'react'
import Button from '@material-ui/core/Button';

export default function Welcome() {

    function handleGoToLogIn() {
        window.location.href = "/login";
    }

    function handleGoToSignUp() {
        window.location.href = "/signup";
    }
    return ( 

        <div>
            <div className="titleBox">
                <h1 className="DonkeyGameTitle">DonkeyGame</h1>
            </div>
            <div className='welcomePageBox'>
                <Button color="primary" variant="contained" className='welcomeButton' onClick={handleGoToLogIn}>
                    LOG IN PAGE
                </Button>
                <Button color="primary" variant="contained" className='welcomeButton' onClick={handleGoToSignUp}>
                    SIGN UP PAGE
                </Button>
            </div>
        </div>
    )
}
