import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ThemeProvider } from '@material-ui/styles';
import './style/index.css'
import GameLobby from './components/waiting-lobby/GameLobby';

const theme = createTheme({
    palette: {
        primary: purple,
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});

function GameLobbyWrapper() {
    return (
            <ThemeProvider theme={theme}>
                <GameLobby />
            </ThemeProvider >
    )
}

export default GameLobbyWrapper;
