import Button from '@material-ui/core/Button';
import logo from '../../donkeyGamelogo.svg';

function Header({ logoutHandle, buttonVisible, buttonText }) {
    return (
        <div className="navDiv">
            <div className='TitleDiv'>
                <h1 className='pageTitle'>DONKEY GAME</h1>
                <img src={logo} width="200" height="100" />
            </div>
            <div className="logoutDiv">
                <h2>UserName: </h2>
                <h2>{localStorage.username}</h2>
                {buttonVisible && <Button color="primary" variant="contained" className="logoutBtn" onClick={logoutHandle} >{buttonText}</Button> }
                <br />
            </div>
        </div>
    );
}

export default Header;
