import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ThemeProvider } from '@material-ui/styles';
import './style/index.css'
import Welcome from './components/welcome-page/Welcome';

const theme = createTheme({
    palette: {
        primary: purple,
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});

function WelcomeWrapper() {
    return (
        <ThemeProvider theme={theme}>
            <Welcome />
        </ThemeProvider >
    )
}

export default WelcomeWrapper;
