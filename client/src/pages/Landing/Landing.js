// HOOKS, FUNCTIONS, ETC.
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import AOS from 'aos';
import API from "../../utils/API";

// COMPONENTS
import Masthead from "../../components/Masthead";
import CirclePicture from "../../components/CirclePicture";
import InstaFeedGrid from "../../components/InstaFeedGrid";
import GoogleMap from "../../components/GoogleMap";
import FAIcon from "../../components/FAIcon";
import { Box, Button, Grid, Input, InputLabel, InputAdornment, Typography, FormControl, TextField, Fab } from "@material-ui/core";

// ICONS
import Face from '@material-ui/icons/Face';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

// STYLESHEETS
import "../../utils/flowHeaders.min.css";
import "../../utils/hover.min.css";
import "./main.css";
import 'aos/dist/aos.css';

// DATA
import { COVER_IMAGE, COVER_TEXT, PRESS_LOGOS, WHO_IMG, WHO_IMG_ALT, WHO_TEXT, MISSION_IMG, MISSION_IMG_ALT, MISSION_TEXT, BUNDLE_IMG, BUNDLE_IMG_ALT, BUNDLE_TEXT, DONATION_TEXT, IG_TOKEN, SOCIAL_TEXT, IG_URL, FB_URL, CONTACT_WARNING, CONTACT_API, CONTACT_TEXT, mapOptions, mapType, LOCATIONS_TEXT } from "./landingData.js";

import {MAIN_COLOR, ACCENT_COLOR} from "../../utils/colors";

// Initialize AOS
AOS.init();

// CLASSES
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  heading: {
    fontFamily: "Lilita One, cursive"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  contentSection: {
    marginTop: "40px",
    overflow: "hidden"
  },
  centerElementParent: {
    display: "flex"
  },
  centerElement: {
    margin: "auto"
  },
  extendedBtnIcon: {
    marginRight: "10px"
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

  const missionImg = (fadeDir) => lineImg(MISSION_IMG, MISSION_IMG_ALT, fadeDir);

  const missionText = (fadeDir) => lineText("What is our mission?", MISSION_TEXT, fadeDir);

  const whoImg = (fadeDir) => lineImg(WHO_IMG, WHO_IMG_ALT, fadeDir);

  const whoText = (fadeDir) => lineText("Who are we?", WHO_TEXT, fadeDir);

  const [ mapMarkers, setMapMarkers ] = useState([]);

  useEffect(() => {
    API.getDropzones()
    .then((dObj) => {
      if(dObj) {
        setMapMarkers(dObj.data);
      } 
    });
 
  }, [])

  return (
    <>

      {/* COVER IMAGE */}
      <Masthead
        fade
        fadeColor={MAIN_COLOR}
        src={COVER_IMAGE}
      >
        <span className="landing-greeting ">
          <h4 className="brand-intro flow-text"> welcome to </h4>
          <h4 className="brand-greeting flow-text"> Bundles of Kindness </h4>
          <Box pl={"10vw"} pr={"10vw"} className="" >
            <h4>{COVER_TEXT}</h4>
          </Box>
          <Box mt={3}>
            {/* When clicked, should go to donation section */}
            <Link to="/help-out" className={clsx("hvr-grow-shadow", classes.link)}>
              <Button variant="contained" color="secondary">
                Help out&nbsp;&nbsp;<i className="far fa-heart"></i>
              </Button>
            </Link>

          </Box>
        </span>
      </Masthead>

      {/* MAIN CONTENT CONTAINER */}
      <Box pt={1}>

        {/* PRESS MENTIONS */}
        <Grid container spacing={isMobileSize ? 5 : 0} justify="center">
          <Grid item xs={12}>
            <h5 className="flow-text" style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: "inherit" }} variant={"overline"}> As Featured On</Typography>
            </h5>
          </Grid>
          {PRESS_LOGOS.map(logo => (
            <Grid key={logo.src} item xs={12} sm={4} style={{ textAlign: "center"}} className={classes.centerElementParent}>
              <img width={isMobileSize ? "50%" : "70%"} className={classes.centerElement} style={{ maxWidth: "300px"}} src={logo.src} alt={logo.name} />
            </Grid>
          )

          )}

        </Grid>

        {/* ALL OTHER SECTIONS */}
        <Box mt={7} pt={5} pb={5} p={3} style={{ backgroundColor: "#f4f4f4" }}>

          {/* WHO ARE WE */}
          <Box>
            <Grid container spacing={3} justify="center">
              {whoImg("fade-right")}
              {whoText("fade-left")}

            </Grid>
          </Box>

          {/* MOTIVATIONS */}
          <Box className={classes.contentSection}>
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

          {/* BUNDLE OVERVIEW */}
          <Box className={classes.contentSection} data-aos={"zoom-in"}>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} sm={8} style={{ textAlign: "center" }}>
                <CirclePicture style={{ maxWidth: "500px" }} size={"100%"} src={BUNDLE_IMG} alt={BUNDLE_IMG_ALT} />
              </Grid>
              <Grid item xs={12} sm={10} md={8}>
                <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                  What's in a Bundle?
                </Typography>
                <Typography className={"flow-text"} variant="body1" align="center" gutterBottom>
                  {BUNDLE_TEXT}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* CALL TO ACTION */}
          <Box className={classes.contentSection} data-aos="zoom-in-up" >
            <Grid container spacing={3} justify="center">
              <Grid item style={{ padding: 1 }} xs={12} sm={8} md={6} lg={4}>
                <div className="circle" style={{ backgroundImage: `radial-gradient(circle, white, 20%, ${MAIN_COLOR} 60%`, boxShadow: `0 0 40px -20px ${ACCENT_COLOR}` }}>
                  <div className="circle__inner">
                    <div className="circle__wrapper">
                      <div className="circle__content">

                        <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                          Want to help?
                        </Typography>
                        <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "0.5em" }}>
                          {DONATION_TEXT}
                        </Typography>
                        <Link to="/help-out" className={clsx("hvr-float-shadow", classes.link)}>
                          <Fab className={classes.centerElement} style={{ backgroundColor: ACCENT_COLOR }} variant="extended" aria-label="Link to Donate Page" >
                            <span style={{ color: "rgb(255, 255, 255)" }}>
                              <FAIcon size="lg" name="hand-holding-heart" solid className={classes.extendedBtnIcon} />
                              Help Now!
                      </span>
                          </Fab>
                        </Link>

                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>

          {/* BUNDLE DROPOFF LOCATIONS */}
          <Box className={classes.contentSection}>
            <Grid style={{ marginBottom: "2em" }} data-aos="zoom-in" container spacing={3} justify="center">

              <Grid item style={{ padding: 1 }} xs={12} sm={10} md={8}>

                <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                  Where have we been?
              </Typography>

                <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "1em" }}>
                  {LOCATIONS_TEXT}
                </Typography>
                <Box height={"45vh"} minHeight={"350px"}>
                  <GoogleMap center options={mapOptions} locations={mapMarkers} type={mapType} />

                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* SOCIAL MEDIA */}
          <Box className={classes.contentSection}>
            <Grid data-aos="zoom-in" container spacing={3} justify="center">

              <Grid item style={{ padding: 1 }} xs={12} sm={10} md={8}>

                <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                  What are we up to?
                </Typography>
                <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "1em" }}>
                  <a style={{ color: "inherit" }} target="_blank" rel="noopener noreferrer" href={IG_URL} >
                    <FAIcon size={"2x"} name={"instagram"} brand style={{ marginRight: "1em" }} className="hvr-grow-rotate ig-icon" />
                  </a>
                  <a style={{ color: "inherit" }} target="_blank" rel="noopener noreferrer" href={FB_URL} >
                    <FAIcon size={"2x"} className="hvr-grow-rotate fb-icon" name={"facebook"} brand />
                  </a>
                </Typography>
                <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "1em" }}>
                  {SOCIAL_TEXT}
                </Typography>
                <InstaFeedGrid token={IG_TOKEN} limit={9} postHeight={"auto"} width="100%" height="auto" />
              </Grid>
            </Grid>
          </Box>


        </Box>

        {/* CONTACT FORM */}
        <Box style={{ padding: "2em", backgroundColor: MAIN_COLOR }}>

          <Grid data-aos="flip-up" container spacing={3} justify="center">
            <Grid item style={{ padding: "1em" }} xs={12} sm={10} md={8}>
              <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                Want to contact us?
                </Typography>
              <Typography className={"flow-text"} variant="subtitle2" align="center" gutterBottom style={{ color: ACCENT_COLOR, marginBottom: "0em" }}>
                {CONTACT_WARNING}
              </Typography>
            </Grid>
          </Grid>
          <Grid data-aos="flip-up" container spacing={1} justify="center" >
            <Grid item style={{ padding: "1em" }} xs={10} sm={9} md={7} lg={5} >
              <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "1.5em" }}>
                {CONTACT_TEXT}
              </Typography>

              <form action={CONTACT_API} method="POST">
                <FormControl fullWidth >
                  <InputLabel htmlFor="input-with-icon-adornment">Your Email</InputLabel>
                  <Input
                    type="email"
                    required
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <Face />
                      </InputAdornment>
                    }
                  />
                  <TextField
                    name="message"
                    required
                    style={{ marginTop: "2em", marginBottom: "2em" }}
                    label="Your Message"
                    placeholder=""
                    multiline
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ChatBubbleOutline />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>


                <Box className={classes.centerElementParent} style={{ color: "white" }} >

                  <Fab style={{ backgroundColor: ACCENT_COLOR }} variant="extended" type="submit" aria-label="Send Email" className={clsx("hvr-forward", classes.centerElement)}>
                    <span style={{ color: "rgb(255, 255, 255)" }} >
                      <FAIcon size="lg" name="paper-plane" solid className={classes.extendedBtnIcon} />
                      Send

                    </span>
                  </Fab>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>

  );
}

export default Landing;
