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
import DocEditor from "../../components/DocEditor";
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
    fontFamily: "Lilita One, cursive",
    backgroundColor: "transparent"
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
              <div style={{ padding: "1em", borderRadius: "10%", width:"70vw", maxWidth: "500px", minHeight: "60vh", margin: "auto", backgroundColor: MAIN_COLOR, display: "flex", boxShadow: `0 0 40px -20px ${ACCENT_COLOR}` }}>
                <Grid container justify="center" style={{margin:"auto"}}>
                  <Grid item xs={10} md={8} lg={6} style={{textAlign: "center"}}>
                    <Typography className={clsx("flow-text", classes.heading)} variant="h3" align="center" gutterBottom>
                      Admin <FAIcon name="user-tie" solid />
                    </Typography>
                    
                    <img style={{width:"80%", marginTop: "1em"}} src="https://i.ibb.co/C6220FL/ezgif-com-crop.gif" alt="Cat Admin GIF"/>

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
                      
                      <img style={{width:"80%", marginTop: "1em"}} src="https://i.ibb.co/C6220FL/ezgif-com-crop.gif" alt="Cat Admin GIF" />

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
                    <Paper elevation={0} className={classes.paper}> Website Management </Paper>
                  </h3>
                  {/* PAGE DESCRIPTION */}
                  <Typography color="secondary" align="center" variant="body1">
                  </Typography>
                </Grid>
              </Grid>

              {/* OPTIONS CONTAINER */}
              <Grid style={{ marginTop: "0.5em" }} container justify="center">

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
                    {/* DROPZONES TAB */}
                    <TabPanel className={classes.tabPanel} value={tabIdx} index={0} dir={theme.direction} >
                        
                      <DocEditor 
                        fields={[
                          {type: "single", name: "iw_title", placeholder: "", required: true, label: "Marker Popup Title", helper: "This is the name of the dropzone location!"},
                          {type: "multi", name: "iw_text", placeholder: "", required: true, label: "Marker Popup Description", helper: "This is a description of the dropzone location!"},
                          {type: "single", name: "iw_imgUrl", placeholder: "", required: true, label: "Marker Popup Image", helper: "This is an URL to the image at the dropzone location!"},
                          {type: "location", name: "address", placeholder: "", required: true, label: "Marker Location", helper: "This is the address of the dropzone location!"},
                          {type: "single", name: "icon", placeholder: "", required: true, label: "Marker Icon", helper: "This is an URL to the marker icon!"}
                        ]}
                        createBtn={
                          {
                            color: "blue",
                            text: "Create",
                            icon: "map-marker-alt"
                          }
                        }
                        updateBtn={
                          {
                            color: "orange",
                            text: "Update",
                            icon: "edit"
                          }
                        }
                        get={API.getDropzones}
                        create={API.addDropzone}
                        update={API.updateDropzone}
                        delete={API.deleteDropzone}
                        icon={{
                          name: "map-marker-alt",
                          color: "red",
                          solid: true
                        }}
                        addIcon={{
                          name: "plus-circle",
                          color: "grey",
                          solid: true
                        }}
                        primary={"iw_title"}
                        secondary={"iw_text"}
                        name="Dropzone"
                      />
                    </TabPanel>

                    {/* VOLUNTEERING TAB */}
                    <TabPanel className={classes.tabPanel} value={tabIdx} index={1} dir={theme.direction} >
                      <DocEditor 
                        fields={[
                          {type: "single", name: "title", placeholder: "", required: true, label: "Event Title", helper: "This is the title of the volunteer event!"},
                          {type: "multi", name: "description", placeholder: "", required: false, label: "Event Description", helper: "This is a description of the volunteer event!"},
                          {type: "location", name: "location", placeholder: "", required: true, label: "Event Location", helper: "This is the location of the volunteer event!"},
                          {type: "single", name: "form", placeholder: "", required: true, label: "Event Form", helper: "This is a Google Forms embed link for the volunteer event!"},
                          {type: "date-time", name: "startTime", placeholder: "", required: true, label: "Event Start Time", helper: "This is the start time of the event!"},
                          {type: "date-time", name: "endTime", placeholder: "", required: false, label: "Event End Time", helper: "This is the end time of the event!"}
                        ]}
                        createBtn={
                          {
                            color: "blue",
                            text: "Create",
                            icon: "hands-helping"
                          }
                        }
                        updateBtn={
                          {
                            color: "orange",
                            text: "Update",
                            icon: "edit"
                          }
                        }
                        get={API.getVolunteerEvents}
                        create={API.addVolunteerEvent}
                        update={API.updateVolunteerEvent}
                        delete={API.deleteVolunteerEvent}
                        icon={{
                          name: "hands-helping",
                          color: "lavender",
                          solid: true
                        }}
                        addIcon={{
                          name: "plus-circle",
                          color: "grey",
                          solid: true
                        }}
                        primary={"title"}
                        secondary={"location"}
                        name="VolunteerEvent"
                      />
                    </TabPanel>

                    {/* SPONSORS TAB */}
                    <TabPanel className={classes.tabPanel} value={tabIdx} index={2} dir={theme.direction} >
                      <DocEditor 
                        fields={[
                          {type: "single", name: "src", placeholder: "", required: true, label: "Sponsor Company Logo (PNG)", helper: "This a link to the sponsor company's logo!"},
                          {type: "single", name: "name", placeholder: "", required: true, label: "Sponsor Company Name", helper: "This is the name of the sponsor company!"},
                        ]}
                        createBtn={
                          {
                            color: "blue",
                            text: "Create",
                            icon: "hand-holding-usd"
                          }
                        }
                        updateBtn={
                          {
                            color: "orange",
                            text: "Update",
                            icon: "edit"
                          }
                        }
                        get={API.getSponsorCompanies}
                        create={API.addSponsorCompany}
                        update={API.updateSponsorCompany}
                        delete={API.deleteSponsorCompany}
                        icon={{
                          name: "building",
                          color: "orange",
                          solid: true
                        }}
                        addIcon={{
                          name: "plus-circle",
                          color: "grey",
                          solid: true
                        }}
                        primary={"name"}
                        secondary={"src"}
                        name="SponsorCompany"
                      />
                    </TabPanel>

                    {/* ADMIN TAB */}
                    <TabPanel className={classes.tabPanel} value={tabIdx} index={3} dir={theme.direction} >
                      <DocEditor 
                        fields={[
                          {type: "single", name: "name", placeholder: "", required: true, label: "Admin Name", helper: "This is the name of the new admin!"},
                          {type: "single", name: "email", placeholder: "", required: true, label: "Admin Email", helper: "This is the new admin's email!"}
                        ]}
                        createBtn={
                          {
                            color: "blue",
                            text: "Create",
                            icon: "user-plus"
                          }
                        }
                        updateBtn={
                          {
                            color: "orange",
                            text: "Update",
                            icon: "edit"
                          }
                        }
                        get={API.getAdmin}
                        create={API.addAdmin}
                        update={API.updateAdmin}
                        delete={API.deleteAdmin}
                        icon={{
                          name: "user-tie",
                          color: "blue",
                          solid: true
                        }}
                        addIcon={{
                          name: "plus-circle",
                          color: "grey",
                          solid: true
                        }}
                        primary={"name"}
                        secondary={"email"}
                        name="Admin"
                      />
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
