// HOOKS, FUNCTIONS, ETC.
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useMediaQuery } from "react-responsive";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useAuth0 } from "../../react-auth0-spa";
import API from '../../utils/API';

// COMPONENTS
import Spinner from "../../components/Spinner";
import FAIcon from "../../components/FAIcon";
import DocForm from "../../components/DocForm";
import { Box, Grid, AppBar, Tabs, Tab, Typography, Paper, Fab } from "@material-ui/core";

// ICONS

// STYLESHEETS
import "../../utils/flowHeaders.min.css";
import "./main.css";

// DATA
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
  tabPanel: {
    minHeight: "60vh",
    padding: "0.5em"

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "rgb(91, 39, 188)",
    fontFamily: "Lilita One, cursive"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  centerElementParent: {
    display: "flex"
  },
  centerElement: {
    margin: "auto"
  },
  heading: {
    fontFamily: "Lilita One, cursive"
  },
  extendedBtnIcon: {
    marginRight: "0.5em"
  }

}));

function AdminDash(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  // HOOKS
  const [tabIdx, setTabIdx] = React.useState(0);
  const { loading, user, isAuthenticated, loginWithPopup, logout } = useAuth0();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // FUNCTIONS FOR MUI TAB PANEL
  const handleChange = (event, newValue) => {
    setTabIdx(newValue);
  };

  const handleChangeIndex = index => {
    setTabIdx(index);
  };

  useEffect(() => {
    setIsVerifying(true);

    // Retrieve list of admin
    API.getAdmin()
      .then((result) => {
        if (isAuthenticated && user) {
          // Check to see if user email is within list of admin 
         for(const admin of result.data) {
           if (admin.email === user.email) {
             setIsAdmin(true);
           }
         }
        }
        setIsVerifying(false);
      })

  }, [isAuthenticated])

  // LOADING  
  return (
    <div style={{ minHeight: "calc(100% - 48px)", width: "100%", position: "absolute", backgroundColor: "snow" }}>
      {
        loading ?
          <Spinner value="Loading..." color={ACCENT_COLOR} />
          :
          !isAuthenticated ?
            <div style={{ minHeight: "100%", width: "100%", position: "absolute", display: "flex" }}>
              <div style={{ padding: "1em", borderRadius: "10%", width:"70vw", maxWidth: "500px", height: "60vh", margin: "auto", backgroundColor: MAIN_COLOR, display: "flex", boxShadow: `0 0 40px -20px ${ACCENT_COLOR}` }}>
                <Grid container justify="center" style={{margin:"auto"}}>
                  <Grid item xs={10} md={8} lg={6} style={{textAlign: "center"}}>
                    <Typography className={clsx("flow-text", classes.heading)} variant="h3" align="center" gutterBottom>
                      Admin <FAIcon name="user-tie" solid />
                    </Typography>
                    
                    <img style={{width:"80%", marginTop: "1em"}} src="https://i.ibb.co/C6220FL/ezgif-com-crop.gif" />

                    <Box className={classes.centerElementParent} style={{ color: "white", margin: "1em" }} >

                      <Fab style={{ backgroundColor: ACCENT_COLOR }} variant="extended" type="submit" aria-label="Login" className={clsx("hvr-bob", classes.centerElement, classes.btnIcon)}>
                        <span style={{ color: "rgb(255, 255, 255)" }} onClick={() => loginWithPopup({
                        })} >
                          <FAIcon size="lg" name="id-card-alt" solid className={classes.extendedBtnIcon} />
                          Login
                        </span>
                      </Fab>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </div>
            :
            (isAuthenticated && isVerifying) ?
              <Spinner value="Verifying..." color={ACCENT_COLOR} />
            :
              (isAuthenticated && user && !isVerifying && !isAdmin) ?
              <div style={{ minHeight: "100%", width: "100%", position: "absolute", display: "flex" }}>
                <div style={{ padding: "1em", borderRadius: "10%", width:"70vw", maxWidth: "500px", height: "60vh", margin: "auto", backgroundColor: MAIN_COLOR, display: "flex", boxShadow: `0 0 40px -20px ${ACCENT_COLOR}` }}>
                  <Grid container justify="center" style={{margin:"auto"}}>
                    <Grid item xs={10} md={8} lg={6} style={{textAlign: "center"}}>
                      <Typography className={clsx("flow-text", classes.heading)} variant="h4" align="center" gutterBottom>
                        Access Denied <FAIcon name="ban" solid />
                      </Typography>
                      
                      <img style={{width:"80%", marginTop: "1em"}} src="https://i.ibb.co/C6220FL/ezgif-com-crop.gif" />

                      <Box className={classes.centerElementParent} style={{ color: "white", margin: "1em" }} >

                        <Fab style={{ backgroundColor: ACCENT_COLOR }} variant="extended" type="submit" aria-label="Login" className={clsx("hvr-bob", classes.centerElement, classes.btnIcon)}>
                          <span style={{ color: "rgb(255, 255, 255)" }} onClick={() => logout({
                          })} >
                            <FAIcon size="lg" name="sign-out-alt" solid className={classes.extendedBtnIcon} />
                            Logout
                          </span>
                        </Fab>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            :
            <>
              {/* PAGE HEADER */}
              <Grid container justify="center">
                <Grid item xs={10} md={8} lg={6}>
                  {/* PAGE TITLE */}
                  <h3 className="flow-text" >
                    <Paper elevation={0} className={classes.paper}> </Paper>
                  </h3>
                  {/* PAGE DESCRIPTION */}
                  <Typography color="secondary" align="center" variant="body1">
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
                      <Tab label={isMobileSize ? "" : "Dropzones"} icon={<FAIcon solid size={"lg"} name="parachute-box" />} {...a11yProps(0)} />
                      <Tab label={isMobileSize ? "" : "Volunteering"} icon={<FAIcon solid size={"lg"} name="people-carry" />} {...a11yProps(1)} />
                      <Tab label={isMobileSize ? "" : "Sponsors"} icon={<FAIcon solid size={"lg"} name="donate" />} {...a11yProps(2)} />
                      <Tab label={isMobileSize ? "" : "Admin"} icon={<FAIcon solid size={"lg"} name="user-tie" />} {...a11yProps(3)} />


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
                    <TabPanel className={classes.tabPanel} value={tabIdx} index={0} dir={theme.direction} >
                        <DocForm 
                        fields={[
                          {type: "single", value: "test", placeholder: "placeholder", required: true, label: "Label", helper: "This is a helper!"},
                          {type: "multi", value: "test", placeholder: "placeholder", required: true, label: "Label", helper: "This is a helper!"}
                          ,{type: "date", value: new Date('2014-08-18T21:11:54'), placeholder: "placeholder", required: true, label: "Label", helper: "This is a helper!"}

                        ]}
                        />
                    </TabPanel>

                    {/* VOLUNTEERING TAB */}
                    <TabPanel className={classes.tabPanel} value={tabIdx} index={1} dir={theme.direction} >

                    </TabPanel>

                    {/* SPONSORS TAB */}
                    <TabPanel className={classes.tabPanel} value={tabIdx} index={2} dir={theme.direction} >

                    </TabPanel>

                    {/* ADMIN TAB */}
                    <TabPanel className={classes.tabPanel} value={tabIdx} index={3} dir={theme.direction} >

                    </TabPanel>

                  </SwipeableViews>
                </Grid>
              </Grid>



            </>


      }
    </div>
  )

}

export default AdminDash;
