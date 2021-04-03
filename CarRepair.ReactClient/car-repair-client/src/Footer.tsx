import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    footer: {
        backgroundColor: "black",
        marginTop: "16px",
        padding: "16px 0",
    }
});

export function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Paper elevation={0}>
                <Typography variant="h5" component="h3">
                    React App with Material UI
                </Typography>
                <Typography component="p">
                    @2018 All right reserved
                </Typography>
            </Paper>
        </footer>
    )
}