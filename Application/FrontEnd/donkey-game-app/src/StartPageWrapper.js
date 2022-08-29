import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import StartPageContainer from './components/start-page/StartPageContainer';
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ThemeProvider } from '@material-ui/styles';
import './style/index.css'

const theme = createTheme({
    palette: {
        primary: purple,
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});

function StartPageWrapper() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <StartPageContainer />
            </ThemeProvider >
        </>
    )
}

export default StartPageWrapper;
