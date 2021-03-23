import { AppBar, Container, IconButton, List, ListItem, ListItemText, makeStyles, Toolbar } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import React from 'react';
import { Link } from "react-router-dom";

const navLinks = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "WeatherForecast",
        path: "/weather"
    }
]

const useStyles = makeStyles({
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    }
});

export function Header() {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Container className={classes.navbarDisplayFlex}>
                    <IconButton edge="start" color="inherit" aria-label="home">
                        <Link to="/">
                            <Home fontSize="large" />
                        </Link>
                    </IconButton>
                    <List component="nav" className={classes.navDisplayFlex} aria-labelledby="main navigation">
                        {navLinks.map(({ title, path }) => (
                            <Link to={path} key={path} className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary={title} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    )
}