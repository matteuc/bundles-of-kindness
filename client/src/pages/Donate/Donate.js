import React, {useState} from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
// import { useMediaQuery } from "react-responsive";
import { CSSTransition } from 'react-transition-group';


import "../../utils/flowHeaders.min.css";
import "./main.css";
import { Box, Grid, AppBar, Tabs, Tab, Typography, Paper, Fab } from "@material-ui/core";
import FAIcon from "../../components/FAIcon";

const DONATION_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
const VOLUNTEER_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
const PAYPAL_DONATION_TEXT = "This is a short description for this donation option."
const ITEM_DONATION_TEXT = "This is a short description for this donation option."
const DONATION_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd7qzoGY0rzhD9VMAGSgbYSzasJsiRw0hTYtU65NAZnM3c92g/viewform?embedded=true";

const MAIN_COLOR = "rgb(248, 235, 255)";
const ACCENT_COLOR = "rgb(91, 39, 188)";
const VOLUNTEER_COLOR = "rgb(235, 238, 255)";

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
  backIcon: {
    position: "absolute",

  }

}));

function Donate() {
  const classes = useStyles();
  const theme = useTheme();
  const [tabIdx, setTabIdx] = React.useState(0);
  const [showOptions, setShowOptions] = useState(true);
  const [showDonationForm, setShowDonationForm] = useState(false);
  // const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  const handleChange = (event, newValue) => {
    setTabIdx(newValue);
  };

  const handleChangeIndex = index => {
    setTabIdx(index);
  };

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={10} md={8} lg={6}>
          {/* PAGE TITLE */}
          <h3 className="flow-text" >
            <Paper elevation={0} className={classes.paper}> be a supporter <img alt="Heart GIF" src="https://media3.giphy.com/media/xUOxf7gg8AztZMfyMM/source.gif" style={{ height: "1em" }} /> </Paper>
          </h3>
          {/* PAGE DESCRIPTION */}
          <Typography color="secondary" align="center" variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: "2em" }} container justify="center">

        <Grid item xs={11} md={8} lg={6}>

          <AppBar position="static" color="default">
            <Tabs
              value={tabIdx}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab onClick={() => {setShowDonationForm(false)}} label="Donate" icon={<FAIcon solid size={"lg"} name="parachute-box" />} {...a11yProps(0)} />
              <Tab onClick={() => {setShowOptions(true); setShowDonationForm(false);}} label="Volunteer" icon={<FAIcon solid size={"lg"} name="people-carry" />} {...a11yProps(1)} />
            </Tabs>
          </AppBar>
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
                  {/* MESSAGE ABOUT DONATIONS */}
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
                    <Grid item xs={12} xl={5} className={classes.gridPaper}>
                      <Box className={clsx(classes.donationOption, "hvr-grow-shadow")}>
                        <Typography style={{ marginBottom: 0 }} className={clsx("flow-text", classes.heading)} variant="h5" align="center" gutterBottom>
                          Cash
                    </Typography>
                        <Box style={{ display: "flex", color: "rgb(255, 255, 255)" }} >
                          <img width={"50px"} src="https://i.ibb.co/cYj6tbN/Paypal-Logo-Transparent-PNG-Cropped.png" style={{ margin: "auto" }} />
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
                    <Grid style={{ display: "flex" }} item xs={12} xl={2}>
                      <Paper style={{ backgroundColor: "transparent", margin: "auto" }} elevation={0} className={classes.gridPaper}> <Typography className={classes.heading} variant={"h5"} style={{ textDecoration: "underline" }}>or</Typography> </Paper>
                    </Grid>
                    <Grid item xs={12} xl={5} className={classes.gridPaper}>
                      <Box className={clsx(classes.donationOption, "hvr-grow-shadow")}>
                        <Typography style={{ marginBottom: 0 }} className={clsx("flow-text", classes.heading)} variant="h5" align="center" gutterBottom>
                          Goods & Services
                        </Typography>
                        <Box style={{ display: "flex", color: "rgb(255, 255, 255)" }} >
                          <img width={"50px"} src="https://i.ibb.co/994PVm2/bof-logo.png" style={{ margin: "auto" }} />
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
                  <iframe style={{height: "100%", width: "100%", padding: "1em"}} src={DONATION_FORM_EMBED_URL} frameBorder="0" marginHeight="0" marginWidth="0">
                    
                    Loading…</iframe>
                </>
              </CSSTransition>
                  
            </TabPanel>


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


                </Grid>
                <Grid item xs={11} lg={10}>
                  <Paper elevation={1} className={classes.gridPaper}> Email Input </Paper>
                  <Paper elevation={1} className={classes.gridPaper}> Email Submit Button </Paper>
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
