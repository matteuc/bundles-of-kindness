// HOOKS, FUNCTIONS, ETC.
import React, { useState } from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';

// COMPONENTS
import FAIcon from "../../components/FAIcon";
import { Box, Grid, AppBar, Tabs, Tab, Typography, Paper, Fab, FormControl, InputLabel, Input, InputAdornment } from "@material-ui/core";

// ICONS
import Face from '@material-ui/icons/Face';

// STYLESHEETS
import "../../utils/flowHeaders.min.css";
import "./main.css";

// DATA
import {PAGE_DESCRIPTION, DONATION_TEXT, VOLUNTEER_TEXT, PAYPAL_DONATION_TEXT, ITEM_DONATION_TEXT, DONATION_FORM_EMBED_URL, VOLUNTEER_FORM_EMBED_URL, VOLUNTEER_COLOR, BOF_LOGO } from "./helpOutData.js";

import { MAIN_COLOR, ACCENT_COLOR } from "../../utils/colors";

// START: MUI TAB PANEL FUNCTIONS 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
// END: MUI TAB PANEL FUNCTIONS 

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  tabPanel: {
    minHeight: "60vh",
    padding: "2em"

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "rgb(91, 39, 188)",
    fontFamily: "Lilita One, cursive"
  },
  gridPaper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  heading: {
    fontFamily: "Lilita One, cursive"
  },
  donationOption: {
    backgroundColor: "white",
    padding: theme.spacing(5),
    borderRadius: "5%"

  },
  subscribeForm: {
    marginTop: "2em"
  }

}));

function Donate() {
  const classes = useStyles();
  const theme = useTheme();
  const [tabIdx, setTabIdx] = React.useState(0);
  const [showOptions, setShowOptions] = useState(true);
  const [showDonationForm, setShowDonationForm] = useState(false);
  // const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  // FUNCTIONS FOR MUI TAB PANEL
  const handleChange = (event, newValue) => {
    setTabIdx(newValue);
  };

  const handleChangeIndex = index => {
    setTabIdx(index);
  };

  return (
    <>
      {/* PAGE HEADER */}
      <Grid container justify="center">
        <Grid item xs={10} md={8} lg={6}>
          {/* PAGE TITLE */}
          <h3 className="flow-text" >
            <Paper elevation={0} className={classes.paper}> Be a Supporter <img alt="Heart GIF" src="https://media3.giphy.com/media/xUOxf7gg8AztZMfyMM/source.gif" style={{ height: "1em", verticalAlign: "text-top" }} /> </Paper>
          </h3>
          {/* PAGE DESCRIPTION */}
          <Typography color="secondary" align="center" variant="body1">
            {PAGE_DESCRIPTION}
          </Typography>
        </Grid>
      </Grid>

      {/* OPTIONS CONTAINER */}
      <Grid style={{ marginTop: "2em" }} container justify="center">

        {/* OPTION TABS */}
        <Grid item xs={11} md={8} lg={6}>
          {/* TAB NAV */}
          <AppBar position="static" color="default">
            <Tabs
              value={tabIdx}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab onClick={() => { setShowDonationForm(false) }} label="Donate" icon={<FAIcon solid size={"lg"} name="parachute-box" />} {...a11yProps(0)} />
              <Tab onClick={() => { setShowOptions(true); setShowDonationForm(false); }} label="Volunteer" icon={<FAIcon solid size={"lg"} name="people-carry" />} {...a11yProps(1)} />
            </Tabs>
          </AppBar>

          {/* OPTION PANELS */}
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={tabIdx}
            onChangeIndex={handleChangeIndex}
            style={{ marginBottom: "2em" }}
          >
            {/* DONATIONS TAB */}
            <TabPanel className={classes.tabPanel} value={tabIdx} index={0} dir={theme.direction} style={{ backgroundImage: `radial-gradient(circle, white, 20%, ${MAIN_COLOR} 60%` }}>
              {showOptions && (
                <>
                  {/* DONATIONS TAB HEADER */}
                  <Grid style={{ marginTop: "1em" }} container spacing={1} justify="center">
                    <Grid item xs={10} lg={8}>
                      <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                        Donate today!
                      </Typography>
                      <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "0.5em" }}>
                        {DONATION_TEXT}
                      </Typography>
                    </Grid>

                  </Grid>

                  {/* TYPES OF DONATIONS */}
                  <Grid style={{ marginTop: "1em" }} container spacing={1} justify="center">

                    {/* PAYPAL OPTION */}
                    <Grid item xs={12} xl={5} className={classes.gridPaper}>
                      <Box className={clsx(classes.donationOption, "hvr-grow-shadow")}>
                        <Typography style={{ marginBottom: 0 }} className={clsx("flow-text", classes.heading)} variant="h5" align="center" gutterBottom>
                          Cash
                    </Typography>
                        <Box style={{ display: "flex", color: "rgb(255, 255, 255)" }} >
                          <img width={"50px"} src="https://i.ibb.co/cYj6tbN/Paypal-Logo-Transparent-PNG-Cropped.png" alt="PayPal logo" style={{ margin: "auto" }} />
                        </Box>
                        <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "0.5em" }}>
                          {PAYPAL_DONATION_TEXT}
                        </Typography>
                        <Box style={{ marginTop: "2em", display: "flex", color: "rgb(255, 255, 255)" }} >

                          <Fab style={{ margin: "auto", backgroundColor: ACCENT_COLOR }} variant="extended" aria-label="Donate via Paypal" className="hvr-bob">
                            <span style={{ color: "rgb(255, 255, 255)" }} >
                              <FAIcon size="lg" name="donate" solid style={{ marginRight: "10px" }} />
                              Donate
                            </span>
                          </Fab>
                        </Box>
                      </Box>
                    </Grid>

                    {/* OPTION SEPARATOR */}
                    <Grid style={{ display: "flex" }} item xs={12} xl={2}>
                      <Paper style={{ backgroundColor: "transparent", margin: "auto" }} elevation={0} className={classes.gridPaper}> <Typography className={classes.heading} variant={"h5"} style={{ textDecoration: "underline" }}>or</Typography> </Paper>
                    </Grid>

                    {/* GOODS & SERVICES OPTION */}
                    <Grid item xs={12} xl={5} className={classes.gridPaper}>
                      <Box className={clsx(classes.donationOption, "hvr-grow-shadow")}>
                        <Typography style={{ marginBottom: 0 }} className={clsx("flow-text", classes.heading)} variant="h5" align="center" gutterBottom>
                          Goods & Services
                        </Typography>
                        <Box style={{ display: "flex", color: "rgb(255, 255, 255)" }} >
                          <img width={"50px"} alt="Bundles of Kindness logo" src={BOF_LOGO} style={{ margin: "auto" }} />
                        </Box>
                        <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "0.5em" }}>
                          {ITEM_DONATION_TEXT}
                        </Typography>
                        <Box style={{ marginTop: "2em", display: "flex", color: "rgb(255, 255, 255)" }} >

                          <Fab onClick={() => setShowDonationForm(true)} style={{ margin: "auto" }} color="secondary" variant="extended" aria-label="Donate via Bundles of Kindness" className="hvr-bob">
                            <span style={{ color: "rgb(255, 255, 255)" }} >
                              <FAIcon size="lg" name="id-card" solid style={{ marginRight: "10px" }} />
                              Sign Up
                            </span>
                          </Fab>
                        </Box>
                      </Box>
                    </Grid>

                  </Grid>
                </>
              )}
              
              {/* Donation Form iframe */}
              <CSSTransition
                in={showDonationForm}
                timeout={300}
                classNames="donation-form"
                unmountOnExit
                onEnter={() => setShowOptions(false)}
                onExited={() => setShowOptions(true)}
              >
                <>
                  <iframe title="Donation Form iframe" style={{ height: "100%", width: "100%", padding: "1em" }} src={DONATION_FORM_EMBED_URL} frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
                </>
              </CSSTransition>

            </TabPanel>

            {/* VOLUNTEER TAB */}
            <TabPanel className={classes.tabPanel} value={tabIdx} index={1} dir={theme.direction} style={{ backgroundImage: `radial-gradient(circle, white, 20%, ${VOLUNTEER_COLOR} 60%` }}>
              {/* If there are no upcoming volunteer events */}
              <Grid style={{ marginTop: "2em" }} container spacing={1} justify="center">

                <Grid item xs={10} lg={8}>
                  <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                    Be a Volunteer!
                </Typography>
                  <Typography color={"textSecondary"} className={"flow-text"} variant="body1" align="center" gutterBottom style={{ marginBottom: "0.5em" }}>
                    {VOLUNTEER_TEXT}
                  </Typography>

                  {/* Begin Mailchimp Signup Form */}
                  <form action={VOLUNTEER_FORM_EMBED_URL} method="post" name="mc-embedded-subscribe-form" className={classes.subscribeForm} target="_blank" noValidate>

                    <FormControl fullWidth >
                      <InputLabel htmlFor="input-with-icon-adornment">Your Email</InputLabel>
                      <Input
                        type="email"
                        name="EMAIL"
                        required
                        id="input-with-icon-adornment"
                        startAdornment={
                          <InputAdornment position="start">
                            <Face />
                          </InputAdornment>
                        }
                      />

                    </FormControl>


                    <Box style={{ marginTop: "2em", display: "flex", color: "rgb(255, 255, 255)" }} >
                      <Fab style={{ margin: "auto" }} color="secondary" variant="extended" type="submit" name="subscribe" aria-label="Send Email" className="hvr-bob">
                        <span style={{ color: "rgb(255, 255, 255)" }} >
                          <FAIcon size="lg" name="user-plus" solid style={{ marginRight: "10px" }} />
                          Subscribe

                    </span>
                      </Fab>
                    </Box>
                  </form>
                  {/* End Mailchimp Signup Form */}

                </Grid>

              </Grid>
            </TabPanel>

          </SwipeableViews>
        </Grid>
      </Grid>



    </>

  );
}

export default Donate;
