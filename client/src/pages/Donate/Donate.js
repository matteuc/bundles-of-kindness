import React from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from "react-responsive";

import "../../utils/flowHeaders.min.css";
import "./main.css";
import { Box, Grid, AppBar, Tabs, Tab, Typography, Paper, Avatar } from "@material-ui/core";
import FAIcon from "../../components/FAIcon";

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
    height: "60vh"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "rgb(91, 39, 188)",
  },
  gridPaper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  }

}));

function Donate() {
  const classes = useStyles();
  const theme = useTheme();
  const [tabIdx, setTabIdx] = React.useState(0);
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
          <h3 className="flow-text" >
            <Paper elevation={0} className={classes.paper}> donate <img alt="Heart GIF" src="https://media3.giphy.com/media/xUOxf7gg8AztZMfyMM/source.gif" style={{ height: "1em" }} /> </Paper>
          </h3>
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
              <Tab label="Donate" icon={<FAIcon solid size={"lg"} name="parachute-box" />} {...a11yProps(0)} />
              <Tab label="Volunteer" icon={<FAIcon solid size={"lg"} name="hand-holding-heart" />} {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={tabIdx}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel className={classes.tabPanel} value={tabIdx} index={0} dir={theme.direction}>
              <Grid style={{ marginTop: "1em" }} container spacing={1} justify="center">
                <Grid item xs={10} lg={8}>
                  <Paper elevation={1} className={classes.gridPaper}> Message about donations </Paper>
                </Grid>
               
              </Grid>
              <Grid style={{ marginTop: "1em" }} container spacing={1} justify="center">
                <Grid item xs={12} xl={5}>
                  <Paper elevation={1} className={classes.gridPaper}> Donation Type #1 </Paper>
                </Grid>
                <Grid item xs={12} xl={2}>
                  <Paper elevation={0} className={classes.gridPaper}> <Typography style={{ textDecoration: "underline"}}>or</Typography> </Paper>
                </Grid>
                <Grid item xs={12} xl={5}>
                  <Paper elevation={1} className={classes.gridPaper}> Donation Type #2 </Paper>
                </Grid>

              </Grid>
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={tabIdx} index={1} dir={theme.direction}>
              {/* If there are no upcoming volunteer events */}
              <Grid style={{ marginTop: "2em" }} container spacing={1} justify="center">

                <Grid item xs={10} lg={8}>
                  <Paper elevation={1} className={classes.gridPaper}> There are no upcoming volunteer events :( </Paper>
                  <Paper elevation={1} className={classes.gridPaper}> Feel free to sign up for email newsletter! </Paper>


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
