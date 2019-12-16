import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import "../../utils/flowHeaders.min.css";
import "./main.css";
import Masthead from "../../components/Masthead"
import { Box, Button, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Landing() {
  const classes = useStyles();

  return (
    <>
      <Masthead
        fade
        fadeColor="rgb(248, 235, 255)"
      >
        <span className="landing-greeting ">
          <h4 className="brand-greeting flow-text"> bundles of kindness  </h4>
          <Box pl={"10vw"} pr={"10vw"} className="" >
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </h4>
          </Box>
          <Box mt={3}>
            {/* When clicked, should scroll down to donation section */}
            <Button variant="contained" color="secondary">
              Help out&nbsp;&nbsp;<i className="far fa-heart"></i>
            </Button>

          </Box>
        </span>
      </Masthead>
      <Box mt={5} p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Intro to Press</Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>Press #1</Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>Press #2</Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>Press #3</Paper>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Paper className={classes.paper}>Image of Rachael</Paper>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Paper className={classes.paper}>Who are we?</Paper>

          </Grid>

          <Grid item xs={12} sm={7}>
            <Paper className={classes.paper}>Our Mission</Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.paper}>Image of Bundle receiver</Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>Image of Bundle</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Overview of Bundle</Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>Link to "Call to Action" Page</Paper>

          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>Instagram Social Feed</Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>Sponsor Appreciation</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Sponsor #1</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Sponsor #2</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Sponsor #3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>Sponsor #4</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Link to "Sponsors" Page</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Contact via Email</Paper>
          </Grid>

        </Grid>

      </Box>
    </>

  );
}

export default Landing;
