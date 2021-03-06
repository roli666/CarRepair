import { AppBar, Container, Grid, IconButton, ListItem, ListItemText, makeStyles, Menu, MenuItem, Toolbar, Typography, Box } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UsedRoutes } from "./Routes";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { ClaimTypes } from "./helpers/ClaimTypes";

const useStyles = makeStyles({
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "white",
  },
  subMenuItem: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "black",
  },
});

export function Header() {
  const classes = useStyles();
  const { login, logout, oidcUser } = useReactOidc();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [adminMenuItemVisible, setAdminMenuItemVisible] = useState(Boolean(oidcUser?.profile[ClaimTypes.role]));

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setAdminMenuItemVisible(Boolean(oidcUser?.profile[ClaimTypes.role]));
  }, [oidcUser?.profile, oidcUser]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Grid container direction={"row"} alignItems={"center"}>
            <Grid item xs>
              <Box display={"inline-flex"} alignItems={"center"}>
                <IconButton edge="start" color="inherit" aria-label="home">
                  <Link to="/" className={classes.linkText}>
                    <Home fontSize="large" />
                  </Link>
                </IconButton>
                {oidcUser && <Typography>{`Hello ${oidcUser.profile[ClaimTypes.surname]} ${oidcUser.profile[ClaimTypes.givenName]}!`}</Typography>}
              </Box>
            </Grid>
            <Grid item component="nav" aria-labelledby="main navigation">
              <Grid container direction="row" alignItems="center" justify={"center"}>
                {oidcUser && (
                  <Grid item>
                    <Link to={UsedRoutes.AvailableJobs} className={classes.linkText}>
                      <ListItem button>
                        <ListItemText primary={"Available Jobs"} className={classes.linkText} />
                      </ListItem>
                    </Link>
                  </Grid>
                )}
                {adminMenuItemVisible && (
                  <Grid item>
                    <ListItem button onClick={handleClick}>
                      <ListItemText primary={"Admin"} className={classes.linkText} />
                    </ListItem>
                  </Grid>
                )}
                {oidcUser ? (
                  <Grid item>
                    <ListItem button onClick={() => logout()}>
                      <ListItemText primary={"Logout"} className={classes.linkText} />
                    </ListItem>
                  </Grid>
                ) : (
                  <Grid item>
                    <ListItem button onClick={() => login()}>
                      <ListItemText primary={"Login"} className={classes.linkText} />
                    </ListItem>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
      <Menu id="admin-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem component={Link} to={UsedRoutes.ClientEditor} className={classes.subMenuItem} onClick={handleClose}>
          Client editor
        </MenuItem>
        <MenuItem component={Link} to={UsedRoutes.CarEditor} className={classes.subMenuItem} onClick={handleClose}>
          Car editor
        </MenuItem>
        <MenuItem component={Link} to={UsedRoutes.JobEditor} className={classes.subMenuItem} onClick={handleClose}>
          Job editor
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
