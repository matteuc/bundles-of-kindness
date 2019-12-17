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
import Face from '@material-ui/icons/Face';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

import { Box, Button, Grid, Input, InputLabel, InputAdornment, Typography, FormControl, TextField, Fab } from "@material-ui/core";

import { Link } from "react-router-dom";

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

// VARIABLES (store in mongoDB) 
const COVER_IMAGE = "https://i.imgur.com/7X0xZfm.png";
const COVER_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const PRESS_LOGOS = [
  {
    src:  "https://www.pngkey.com/png/full/535-5352395_team-jet-set-has-been-featured-in-abc7.png",
    name: "ABC7 Eyewitness News"
  },
  {
    src:  "https://chambermaster.blob.core.windows.net/images/customers/9034/blogposts/9279/SFVBJ_simple.jpg",
    name: "San Fernando Valley Business Journal"
  },
  {
    src:  "http://losangelesnewsgroup.com/assets/LADN-logo-horz-red.jpg",
    name: "Los Angeles Daily News"
  }

]; //MAX: 3
const WHO_IMG = "https://i.ibb.co/JH7M0TK/racahel.jpg";
const WHO_IMG_ALT = "Picture of Rachael, founder of Bundles of Kindness";
const WHO_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const MISSION_IMG = "http://1.bp.blogspot.com/-weCqkxal16c/UPgu0BUJ7oI/AAAAAAAADO0/yMi5hmascfc/s1600/homeless.jpg";
const MISSION_IMG_ALT = "Picture of homeless person who has received a bundle";
const MISSION_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const BUNDLE_IMG = "http://www.twincities.com/wp-content/uploads/2016/12/img_7427.jpg";
const BUNDLE_IMG_ALT = "Picture of Bundle";
const BUNDLE_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const DONATION_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const IG_TOKEN = "10670215999.1677ed0.5afe6ea7f7f84bfba62f5e883714a7f3";
const SOCIAL_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const IG_URL = "https://www.instagram.com/bundlesofkindness/";
const FB_URL = "https://www.facebook.com/BundlesofkindnessLA/";

const CONTACT_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const CONTACT_API = "https://formspree.io/matteu.chen@gmail.com";

const MAIN_COLOR = "rgb(248, 235, 255)";
const ACCENT_COLOR = "rgb(91, 39, 188)";

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

  const missionImg = (fadeDir) => lineImg(MISSION_IMG, MISSION_IMG_ALT, fadeDir);

  const missionText = (fadeDir) => lineText("What is our mission?", MISSION_TEXT, fadeDir);

  const whoImg = (fadeDir) => lineImg(WHO_IMG, WHO_IMG_ALT, fadeDir);

  const whoText = (fadeDir) => lineText("Who are we?", WHO_TEXT, fadeDir);

  

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
            <Link to="/donate" style={{ textDecoration: "none", color: "inherit"}} className="hvr-grow-shadow">
              <Button variant="contained" color="secondary">
                Help out&nbsp;&nbsp;<i className="far fa-heart"></i>
              </Button>
            </Link>

          </Box>
        </span>
      </Masthead>


      <Box pt={1}>

        {/* PRESS MENTIONS */}
        <Grid container spacing={isMobileSize ? 5 : 0} justify="center">
          <Grid item xs={12}>
            <h5 className="flow-text" style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: "inherit" }} variant={"overline"}> As Featured On</Typography>
            </h5>
          </Grid>
          {PRESS_LOGOS.map(logo => (
            <Grid key={logo.src} item xs={12} sm={4} style={{ textAlign: "center", display: "flex" }}>
            <img width={isMobileSize ? "50%" : "70%"} style={{ maxWidth: "300px", margin: "auto" }} src={logo.src} alt={logo.name} />
          </Grid>
          )

          )}
          
        </Grid>


        <Box mt={7} pt={5} pb={5} p={3} style={{ backgroundColor: "#f4f4f4" }}>

          <Box>
            {/* WHO ARE WE */}
            <Grid container spacing={3} justify="center">
              {whoImg("fade-right")}
              {whoText("fade-left")}

            </Grid>
          </Box>
          <Box mt={5}>
            {/* MOTIVATIONS */}
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
          <Box mt={5}>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} sm={8} data-aos={"fade-up"} style={{ textAlign: "center" }}>
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

        <Box data-aos="zoom-in-up" >
          <Grid container spacing={3} justify="center">
            <Grid item style={{ padding: 1 }} xs={12} sm={8} md={6} lg={4}>
              <div className="circle" style={{backgroundImage: `radial-gradient(circle, white, 20%, ${MAIN_COLOR} 60%`, boxShadow: `0 0 40px -20px ${ACCENT_COLOR}`}}>
                <div className="circle__inner">
                  <div className="circle__wrapper">
                    <div className="circle__content">

                    <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                      Want to help?
                    </Typography>
                    <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "1em" }}>
                    {DONATION_TEXT}
                  </Typography>
                  <Link to="/donate" style={{ textDecoration: "none", color: "inherit" }} className="hvr-float-shadow">
                    <Fab style={{ margin: "auto", backgroundColor: ACCENT_COLOR }} variant="extended" aria-label="Link to Donate Page" >
                      <span style={{ color: "rgb(255, 255, 255)" }}>
                      <FAIcon size="lg" name="hand-holding-heart" solid style={{ marginRight: "10px" }} />
                      Donate Now!
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

          {/* SOCIAL MEDIA */}
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

        {/* CONTACT FORM */}
        <Box style={{ padding: "2em", backgroundColor: MAIN_COLOR }}>

          <Grid data-aos="flip-up" container spacing={3} justify="center">
            <Grid item style={{ padding: "1em" }} xs={12} sm={10} md={8}>
              <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                Want to contact us?
                </Typography>
            </Grid>
          </Grid>
          <Grid data-aos="flip-up" container spacing={1} justify="center" >
            <Grid item style={{ padding: "1em" }} xs={10} sm={9} md={7} lg={5} >
              <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "2em" }}>
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

                <Box style={{ display: "flex", color: "rgb(255, 255, 255)" }} >

                  <Fab style={{ margin: "auto", backgroundColor: ACCENT_COLOR }} variant="extended" type="submit" aria-label="Send Email" className="hvr-forward">
                    <span style={{ color: "rgb(255, 255, 255)" }} >
                    <FAIcon size="lg" name="paper-plane" solid style={{ marginRight: "10px" }} />
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
