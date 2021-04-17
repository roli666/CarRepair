import { AppBar, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Status } from "./components/Status";

export function Footer() {
  return (
    <AppBar component={"footer"} position={"static"}>
      <Container>
        <Grid container direction={"row"}>
          <Grid item xs>
            <Typography component="p">© {new Date().getFullYear()} Aszalós Roland, all right reserved</Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography component="p">Server status:</Typography>
              </Grid>
              <Grid item>
                &nbsp;
                <Status showTooltip={true} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}
