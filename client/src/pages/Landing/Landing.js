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
import Spinner from "../../components/Spinner";
import GoogleMap from "../../components/GoogleMap";
import FAIcon from "../../components/FAIcon";
import { Box, Button, Grid, InputAdornment, Typography, FormControl, TextField, Fab, Fade } from "@material-ui/core";

// ICONS
import Face from '@material-ui/icons/Face';
import Email from '@material-ui/icons/Email';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

// STYLESHEETS
import "../../utils/flowHeaders.min.css";
import "../../utils/hover.min.css";
import "./main.css";
import 'aos/dist/aos.css';

// DATA
import { IG_TOKEN, IG_URL, FB_URL, mapOptions, mapType } from "./landingData.js";

import {MAIN_COLOR, ACCENT_COLOR} from "../../utils/colors";

// Initialize AOS
// Parent container of AOS Elements must have style {overflow: hidden}
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

let COVER_IMAGE, COVER_TEXT, WHO_IMG, WHO_IMG_ALT, WHO_TEXT, MISSION_IMG, MISSION_IMG_ALT, MISSION_TEXT, BUNDLE_IMG, BUNDLE_IMG_ALT, BUNDLE_TEXT, DONATION_TEXT, SOCIAL_TEXT, CONTACT_TEXT, LOCATIONS_TEXT, FIRST_PRESS_IMG, SECOND_PRESS_IMG, THIRD_PRESS_IMG, FIRST_PRESS_NAME, SECOND_PRESS_NAME, THIRD_PRESS_NAME, PRESS_LOGOS;

function PressLogo(src, name) {
  this.src = src;
  this.name = name;
};

function Landing() {
  const classes = useStyles();
  const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  // COMPONENTS
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

  // HOOKS 
  const [ mapMarkers, setMapMarkers ] = useState([]);
  const [messageForm, setMessageForm] = useState({});
  const [mailMessage, setMailMessage] = useState("");
  const [mailError, setMailError] = useState(false);
  const [mailMessageVisible, setMailMessageVisible] = useState(false);
  const [sendDisabled, setSendDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // FUNCTIONS
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    let tmp = messageForm;
    tmp[name] = value;
    setMessageForm({...tmp});

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSendDisabled(true);
    
    API.sendMail(messageForm.name, messageForm.sender, messageForm.content)
    .then(result => {
      // Mail successfully sent!
      if(result.status === 200) {
        setMailError(false);
        setMailMessage("Your message has been sent! 🥳");
        setMailMessageVisible(true);

        // Clear form and mailMessage after a brief amount of time
        setTimeout(function() {
          setMailMessageVisible(false);
          setMessageForm({});
        }, 3000)
      } 
      // Mail not sent!
      else {
        setMailError(true);
        setMailMessage("Your message was not sent. Please try again later 🥺");
        setMailMessageVisible(true);

      }

      // Enable Send Button
      setSendDisabled(false);

    })
  }

  useEffect(() => {
    const markersPromise = API.getDropzones()
    .then((dObj) => {
      if(dObj) {
        setMapMarkers(dObj.data);
      } 
    });

    const contentPromise = API.getPages()
    .then((contentObj) => {
      console.log(contentObj)
      ({COVER_IMAGE, COVER_TEXT, WHO_IMG, WHO_IMG_ALT, WHO_TEXT, MISSION_IMG, MISSION_IMG_ALT, MISSION_TEXT, BUNDLE_IMG, BUNDLE_IMG_ALT, BUNDLE_TEXT, DONATION_TEXT, SOCIAL_TEXT, CONTACT_TEXT, LOCATIONS_TEXT, FIRST_PRESS_IMG, SECOND_PRESS_IMG, THIRD_PRESS_IMG, FIRST_PRESS_NAME, SECOND_PRESS_NAME, THIRD_PRESS_NAME} = contentObj.data[0]);

      PRESS_LOGOS = [ new PressLogo(FIRST_PRESS_IMG, FIRST_PRESS_NAME), new PressLogo(SECOND_PRESS_IMG, SECOND_PRESS_NAME), new PressLogo(THIRD_PRESS_IMG, THIRD_PRESS_NAME)];
      
    });

    Promise.all([markersPromise, contentPromise])
    .then(() => { 
      setLoading(false);
    })

  }, [])

  if (loading) {
    return (
        <div style={{ minHeight: "100%", width: "100%", position: "absolute", backgroundColor: "snow" }}>
          {
            loading ?
              <Spinner value="Loading..." src={"https://media0.giphy.com/media/xUOxf7gg8AztZMfyMM/source.gif"} color={ACCENT_COLOR} />
              : ""
          }
        </div>
      )
  }

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
              <Typography style={{ fontSize: "inherit" }} variant={"overline"}> As Featured In</Typography>
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
              <Grid item xs={12} sm={8} md={6} lg={4}>
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

              <Grid item  xs={12} sm={10} md={8}>

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

              <Grid item xs={12} sm={10} md={8}>

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
                <InstaFeedGrid token={IG_TOKEN} initial={9} step={3} postHeight={"auto"} width="100%" height="auto" />
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
            </Grid>
          </Grid>
          <Grid data-aos="flip-up" container spacing={1} justify="center" >
            <Grid item style={{ padding: "1em" }} xs={10} sm={9} md={7} lg={5} >
              <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "1.5em" }}>
                {CONTACT_TEXT}
              </Typography>

              {/* <form action={CONTACT_API} method="POST"> */}
              <form onSubmit={handleSubmit} autoComplete="off">
                <FormControl fullWidth >
                  <TextField
                    onChange={handleFormChange}
                    name="name"
                    required
                    style={{ marginTop: "1em", marginBottom: "1em" }}
                    label="Your Name"
                    value={messageForm.name || ''}
                    placeholder=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Face />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    onChange={handleFormChange}
                    name="sender"
                    required
                    style={{ marginTop: "1em", marginBottom: "1em" }}
                    label="Your Email"
                    value={messageForm.sender || ''}
                    placeholder=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    onChange={handleFormChange}
                    name="content"
                    required
                    style={{ marginTop: "1em", marginBottom: "1em" }}
                    label="Your Message"
                    value={messageForm.content || ''}
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

                  <Fab disabled={sendDisabled ? true : false} style={{ backgroundColor: ACCENT_COLOR }} variant="extended" type="submit" aria-label="Send Email" className={clsx(sendDisabled ? "" : "hvr-forward", classes.centerElement)}>
                    <span style={{ color: "rgb(255, 255, 255)" }} >
                      <FAIcon size="lg" name="paper-plane" solid className={classes.extendedBtnIcon} />
                      Send

                    </span>
                  </Fab>
                </Box>

                <Fade 
                  in={mailMessageVisible}
                  timeout={{
                    enter: 500,
                    exit: 500
                  }}  
                >
                  <Typography className={"flow-text"} variant="subtitle2" align="center" gutterBottom style={{ color: mailError ? "red" : "green", marginTop: "1em" }}>
                    {mailMessage}
                  </Typography>
                </Fade>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>

  );
}

export default Landing;
