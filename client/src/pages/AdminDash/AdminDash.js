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
import Loading from "../../components/Loading";
import FAIcon from "../../components/FAIcon";
import { Box, Grid, AppBar, Tabs, Tab, Typography, Paper, Fab, FormControl, InputLabel, Input, InputAdornment } from "@material-ui/core";

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
  const [isAdmin, setIsAdmin ] = useState(false);

  // FUNCTIONS FOR MUI TAB PANEL
  const handleChange = (event, newValue) => {
    setTabIdx(newValue);
  };

  const handleChangeIndex = index => {
    setTabIdx(index);
  };

  useEffect(()=>{
    setIsVerifying(true);

    const result = {
      data: ["bundlesofkindness.la@gmail.com"]
    }

    // Retrieve list of admin
    // API.getAdmin()
    // .then((result)=>{
      if(isAuthenticated && user) { 
          // Check to see if user email is within list of admin 
          if(result.data.includes(user.email)) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }  
        }
        setIsVerifying(false);
    })

  // }, [isAuthenticated])

  if(loading) {
    // LOADING  
    return (
        <Loading />
    )
  }

  else if(!isAuthenticated) {
    //  LOGIN 
    return (
        <>
        
            <button className="btn btn-dark" onClick={() => loginWithPopup({
            })}>
            LOGIN
            </button> 
       

        </>
    )
  }

  else if(isAuthenticated && isVerifying) {
    // VERIFY IDENTITY
    return (
        <>
        Verifying...
        </>
    )
  }

  else if(isAuthenticated && user && !isVerifying && !isAdmin ) {
    // ACCESS DENIED
    return (
        <>
        Denied
        {user.email}
        
            <button className="btn btn-dark" onClick={() => logout({
            })}>
            LOGOUT
            </button> 
       

        </>
    )
  }

  else {
    // ADMIN DASH
    return (
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
        <button className="btn btn-dark" onClick={() => logout({
            })}>
            LOGOUT
            </button> 
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
                  <Tab label={isMobileSize? "": "Dropzones"} icon={<FAIcon solid size={"lg"} name="parachute-box" />} {...a11yProps(0)} />
                  <Tab label={isMobileSize? "": "Volunteering"} icon={<FAIcon solid size={"lg"} name="people-carry" />} {...a11yProps(1)} />
                  <Tab label={isMobileSize? "": "Sponsors"} icon={<FAIcon solid size={"lg"} name="donate" />} {...a11yProps(2)} />
                  <Tab label={isMobileSize? "": "Admin"} icon={<FAIcon solid size={"lg"} name="user-tie" />} {...a11yProps(3)} />


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

    );

  }

}

export default AdminDash;
