import { Paper, Typography } from "@material-ui/core";
import { Status } from "./components/Status"

export function Footer() {

    return (
        <footer>
            <Paper elevation={0}>
                <Typography variant="h5" component="h3">
                    React App with Material UI Footer
                </Typography>
                <Typography component="p">
                    @{new Date().getFullYear()} All right reserved
                </Typography>
                <Typography>
                    Server status: <Status showTooltip={true}></Status>
                </Typography>
            </Paper>
        </footer>
    )
}