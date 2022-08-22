import { ThemeProvider } from '@material-ui/styles';
import SignUpContainer from "./components/signup-form/SignUpContainer"
import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createTheme({
    palette: {
        primary: purple,
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});

export default function SignUp() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <SignUpContainer />
            </ThemeProvider>
        </>
    )
};
