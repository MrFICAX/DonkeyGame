import { ThemeProvider } from '@material-ui/styles';
import SignUpContainer from "./signup-form/SignUpContainer"

export default function SignUp() {
    return (
        <>
            <ThemeProvider>
                <SignUpContainer />
            </ThemeProvider>
        </>
    )
};
