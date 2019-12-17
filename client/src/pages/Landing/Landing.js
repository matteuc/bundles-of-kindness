import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useMediaQuery } from "react-responsive";

import "../../utils/flowHeaders.min.css";
import "../../utils/hover.min.css";
import "./main.css";
import Masthead from "../../components/Masthead";
import CirclePicture from "../../components/CirclePicture";
import InstaFeedGrid from "../../components/InstaFeedGrid";
import FAIcon from "../../components/FAIcon";

import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";

import { Link } from "react-router-dom";

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  heading: {
    fontFamily: "Lilita One, cursive"
  }
}));

function Landing() {
  const classes = useStyles();
  const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  const lineText = (heading, text, fadeDir) => (
    <Grid item xs={12} sm={6} md={5} lg={4} data-aos={fadeDir}>
      <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="left" gutterBottom>
        {heading}
      </Typography>
      <Typography className={"flow-text"} variant="body1" align="left" gutterBottom>
        {text}
      </Typography>
    </Grid>
  )

  const lineImg = (src, alt, fadeDir) => (
    <Grid item xs={12} sm={6} md={5} lg={4} data-aos={fadeDir} style={{ textAlign: "center" }}>
      <CirclePicture style={{ maxWidth: "300px" }} size={"100%"} src={src} alt="alt" />
    </Grid>
  );

  const missionImg = (fadeDir) => lineImg("http://1.bp.blogspot.com/-weCqkxal16c/UPgu0BUJ7oI/AAAAAAAADO0/yMi5hmascfc/s1600/homeless.jpg", "Picture of homeless person who has received a bundle", fadeDir);

  const missionText = (fadeDir) => lineText("What is our mission?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", fadeDir);

  const whoImg = (fadeDir) => lineImg("https://i.ibb.co/JH7M0TK/racahel.jpg", "Picture of Rachael, founder of Bundles of Kindness", fadeDir);

  const whoText = (fadeDir) => lineText("Who are we?", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", fadeDir);



  return (
    <>
      <Masthead
        fade
        fadeColor="rgb(248, 235, 255)"
        src="https://i.imgur.com/7X0xZfm.png"
      >
        <span className="landing-greeting ">
          <h4 className="brand-intro flow-text"> welcome to </h4>
          <h4 className="brand-greeting flow-text"> Bundles of Kindness </h4>
          <Box pl={"10vw"} pr={"10vw"} className="" >
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </h4>
          </Box>
          <Box mt={3}>
            {/* When clicked, should scroll down to donation section */}
            <Link to="/donate" style={{ textDecoration: "none", color: "inherit" }}>
              <Button variant="contained" color="secondary">
                Help out&nbsp;&nbsp;<i className="far fa-heart"></i>
              </Button>
            </Link>

          </Box>
        </span>
      </Masthead>
      <Box pt={1}>
        <Grid container spacing={isMobileSize ? 5 : 0} justify="center">
          <Grid item xs={12}>
            <h5 className="flow-text" style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: "inherit" }} variant={"overline"}> As Featured On</Typography>
            </h5>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "center", display: "flex" }}>
            <img width={isMobileSize ? "50%" : "70%"} style={{ maxWidth: "300px", margin: "auto" }} src="https://www.pngkey.com/png/full/535-5352395_team-jet-set-has-been-featured-in-abc7.png" alt="" />
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "center", display: "flex" }}>
            <img width={isMobileSize ? "50%" : "70%"} style={{ maxWidth: "300px", margin: "auto" }} src="https://chambermaster.blob.core.windows.net/images/customers/9034/blogposts/9279/SFVBJ_simple.jpg" alt="" />
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "center", display: "flex" }}>
            <img width={isMobileSize ? "50%" : "70%"} style={{ maxWidth: "300px", margin: "auto" }} src="http://losangelesnewsgroup.com/assets/LADN-logo-horz-red.jpg" alt="" />
          </Grid>
        </Grid>
        <Box mt={7} pt={5} p={3} style={{ backgroundColor: "#f4f4f4" }}>

          <Box>

            <Grid container spacing={3} justify="center">
              {whoImg("fade-right")}
              {whoText("fade-left")}

            </Grid>
          </Box>
          <Box mt={5}>

            <Grid container spacing={3} justify="center">
              {isMobileSize ?
                <>
                  {missionImg("fade-right")}
                  {missionText("fade-left")}
                </>
                :
                <>
                  {missionText("fade-right")}
                  {missionImg("fade-left")}
                </>
              }
            </Grid>
          </Box>

          <Box mt={5}>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} sm={8} data-aos={"fade-up"} style={{ textAlign: "center" }}>
                <CirclePicture style={{ maxWidth: "500px" }} size={"100%"} src={"http://www.twincities.com/wp-content/uploads/2016/12/img_7427.jpg"} alt="Picture of Bundle" />
              </Grid>
              <Grid item xs={12} sm={10} md={8}>
                <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                  What's in a Bundle?
                </Typography>
                <Typography className={"flow-text"} variant="body1" align="center" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              </Grid>
            </Grid>
          </Box>


          <Grid container spacing={3} justify="center">

            <Grid item xs={12}>
              <Paper className={classes.paper}>Link to "Call to Action" Page</Paper>

            </Grid>

            <Grid item style={{ padding: 1 }} xs={12} sm={10} md={8}>
              <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                What are we up to?
                </Typography>
              <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "1em" }}>
                <a style={{ color: "inherit" }} target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/bundlesofkindness/"} >
                  <FAIcon size={"2x"} name={"instagram"} brand style={{ marginRight: "1em" }} className="hvr-grow-rotate ig-icon" />
                </a>
                <a style={{ color: "inherit" }} target="_blank" rel="noopener noreferrer" href={"https://www.facebook.com/BundlesofkindnessLA/"} >
                  <FAIcon size={"2x"} className="hvr-grow-rotate fb-icon" name={"facebook"} brand />
                </a>
              </Typography>
              <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "1em" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <InstaFeedGrid token="10670215999.1677ed0.5afe6ea7f7f84bfba62f5e883714a7f3" limit={9} postHeight={"auto"} width="100%" height="auto" />
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>Contact via Email</Paper>
            </Grid>

          </Grid>

        </Box>
      </Box>
    </>

  );
}

export default Landing;
