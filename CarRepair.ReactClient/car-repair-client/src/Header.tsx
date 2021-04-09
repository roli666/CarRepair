import {
    AppBar, Container, Grid, IconButton,
    ListItem, ListItemText, makeStyles, Menu,
    MenuItem, Toolbar
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Routes } from "./RouteData";

const useStyles = makeStyles({
    linkText: {
        textDecoration: "none",
        textTransform: "uppercase",
        color: "white"
    },
    subMenuItem: {
        textDecoration: "none",
        textTransform: "uppercase",
        color: "black"
    }
});

export function Header() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Container>
                    <Grid container direction={"row"} alignItems={"center"}>
                        <Grid item xs>
                            <IconButton edge="start" color="inherit" aria-label="home">
                                <Link to="/" className={classes.linkText}>
                                    <Home fontSize="large" />
                                </Link>
                            </IconButton>
                        </Grid>
                        <Grid item component="nav" aria-labelledby="main navigation">
                            <Grid container direction="row" alignItems="center" justify={"center"}>
                                <Grid item>
                                    <Link to={Routes.get("home")!.Path} className={classes.linkText}>
                                        <ListItem button>
                                            <ListItemText primary={Routes.get("home")!.Title} />
                                        </ListItem>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <ListItem button onClick={handleClick}>
                                        <ListItemText primary={"Admin"} className={classes.linkText} />
                                    </ListItem>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
            <Menu
                id="admin-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to={Routes.get("clientEditor")!.Path} className={classes.subMenuItem}>
                    <MenuItem onClick={handleClose}>
                        {Routes.get("clientEditor")!.Title}
                    </MenuItem>
                </Link>
                <Link to={Routes.get("carEditor")!.Path} className={classes.subMenuItem}>
                    <MenuItem onClick={handleClose}>
                        {Routes.get("carEditor")!.Title}
                    </MenuItem>
                </Link>
                <Link to={Routes.get("jobEditor")!.Path} className={classes.subMenuItem}>
                    <MenuItem onClick={handleClose}>
                        {Routes.get("jobEditor")!.Title}
                    </MenuItem>
                </Link>
            </Menu >
        </AppBar >
    )
}