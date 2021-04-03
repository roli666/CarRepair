import { AppBar, Container, IconButton, List, ListItem, ListItemText, makeStyles, Toolbar } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { Routes } from "./RouteData";

const useStyles = makeStyles({
    navDisplayFlex: {
        display: "flex",
        justifyContent: "space-between"
    },
    navbarDisplayFlex: {
        display: "flex",
        justifyContent: "space-between"
    },
    linkText: {
        textDecoration: "none",
        textTransform: "uppercase",
        color: "white"
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
                            <Home fontSize="large" className={classes.linkText} />
                        </Link>
                    </IconButton>
                    <List component="nav" className={classes.navDisplayFlex} aria-labelledby="main navigation">
                        {Array.from(Routes.values()).map((value,index) => (
                            <Link to={value.Path} key={index} className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary={value.Title} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    )
}