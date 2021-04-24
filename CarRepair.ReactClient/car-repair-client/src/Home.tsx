import exemplarimage from "./static/img/exemplar-image.jpg";
import React, { ReactElement } from "react";
import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { Build, Computer, Create, InsertEmoticon, Event, ChatBubbleOutline } from "@material-ui/icons";
import RandomImage from "./components/RandomImage";

const useStyles = makeStyles(() => ({
  topPadding100: {
    paddingTop: "100px",
  },
  bottomPadding100: {
    paddingBottom: "100px",
  },
  cardRoot: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));
const Exemplar = () => {
  return (
    <Container >
      <Paper variant={"outlined"}>
        <img src={exemplarimage} alt={""} width={"100%"} height={"100%"} />
      </Paper>
    </Container>
  );
};
interface SimpleCardProps {
  icon: ReactElement;
  title: string;
  description: string;
}
function SimpleCard(props: SimpleCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.cardRoot}>
      <CardContent>
        {React.cloneElement(props.icon, {})}
        <Typography variant={"h5"} component={"h2"}>
          {props.title}
        </Typography>
        <Typography variant={"body2"} component={"p"}>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size={"small"}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
const Features = () => {
  const classes = useStyles();
  return (
    <Container className={`${classes.bottomPadding100} ${classes.topPadding100}`}>
      <Typography variant={"h3"} gutterBottom align={"center"}>
        Why choose us
      </Typography>
      <Typography gutterBottom align={"center"}>
        We worked out an amazing combination of vast functionality and user's comfort. It will totally impress you with its power!
      </Typography>
      <Grid container spacing={2} direction={"row"} alignContent={"stretch"}>
        <Grid item xs>
          <SimpleCard
            icon={<Create />}
            title={"Punctuality"}
            description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!"}
          />
        </Grid>
        <Grid item xs>
          <SimpleCard
            icon={<Computer />}
            title={"Instant Responses"}
            description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!"}
          />
        </Grid>
        <Grid item xs>
          <SimpleCard
            icon={<Build />}
            title={"Skilled repairmen"}
            description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!"}
          />
        </Grid>
        <Grid item xs>
          <SimpleCard
            icon={<InsertEmoticon />}
            title={"Happy customers"}
            description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!"}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
const BlogPost = () => {
  const classes = useStyles();
  return (
    <Card className={classes.cardRoot}>
      <CardContent>
        <Box>
          <RandomImage topic={"car"} />
        </Box>
        <Typography variant={"h5"} gutterBottom>
          Lorem Title
        </Typography>
        <Typography gutterBottom>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in.</Typography>
        <Grid container direction={"row"} alignContent={"stretch"}>
          <Grid item xs>
            <Box display={"flex"}>
              <Event />
              &nbsp;
              <Typography>{randomDate(new Date(2020, 1, 1), new Date()).toLocaleDateString("hu-hu")}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box display={"flex"}>
              <ChatBubbleOutline />
              &nbsp;
              <Typography>11</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size={"small"}>Learn More</Button>
      </CardActions>
    </Card>
  );
};

const LatestNews = () => {
  const classes = useStyles();
  return (
    <Container className={classes.bottomPadding100 + " " + classes.topPadding100}>
      <Typography variant={"h4"} gutterBottom>
        Latest news
      </Typography>
      <Grid container spacing={2} direction={"row"} alignContent={"stretch"}>
        <Grid item xs>
          <BlogPost />
        </Grid>
        <Grid item xs>
          <BlogPost />
        </Grid>
        <Grid item xs>
          <BlogPost />
        </Grid>
      </Grid>
    </Container>
  );
};

export function Home() {
  return (
    <div>
      <Exemplar />
      <Features />
      <Divider variant={"fullWidth"} />
      <LatestNews />
    </div>
  );
}
