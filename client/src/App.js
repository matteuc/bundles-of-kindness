// import React, { useEffect, useState } from "react";
import React from "react";
import { Route, Switch } from "react-router-dom";
// import { useAuth0 } from "./react-auth0-spa";
// import PrivateRoute from "./components/PrivateRoute";
// import API from './utils/API';
import "./App.css";

import { Box } from "@material-ui/core";
// import { Box, Grid, Paper } from "@material-ui/core";

// import { makeStyles } from '@material-ui/core/styles';

// import FAIcon from "./components/FAIcon";
// import Loading from "./components/Loading";
import Landing from "./pages/Landing/index";
import Donate from "./pages/Donate/index";
import Sponsors from "./pages/Sponsors/index";
// import Footer from "./components/Footer";
import NoMatch from "./components/NoMatch";
import NavBarApp from "./components/NavBarApp";

import Logo from "./assets/logo.PNG";

// const useStyles = makeStyles(theme => ({
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'left',
//     color: theme.palette.text.secondary,
//   },
// }));

const MAIN_COLOR = "rgb(248, 235, 255)";
const ACCENT_COLOR = "rgb(91, 39, 188)";

function App() {
  // const user = {
  //   name: "Matt Chen",
  //   email: "matt@email.com",
  //   picture: "https://link.com"
  // }
  // const { loading, user, isAuthenticated } = useAuth0();
  // const [userInfo, setUserInfo] = useState();

  // useEffect(() => {
  //   updateUser();
  // }, [loading]);

  // Retrieve/create userInfo document after Auth0 login
  // const updateUser = () => {
  //   if (isAuthenticated && user && !loading) {
  //     setUserInfo(user);
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="App text-center">
  //       <div className="mt-5">
  //         <Loading />
  //       </div>
  //     </div>
  //   );
  // }

  // const classes = useStyles();

  return (
    <div className="App">
      <NavBarApp
        color={MAIN_COLOR}
        accentColor={ACCENT_COLOR}
        title={<img alt="Bundles of Kindness logo" style={{ marginTop: "10px", width: "225px" }} src={Logo} />}
        center
        routes={[
          {
            name: "Help Out",
            path: "/help-out"
          },
          {
            name: "Sponsors",
            path: "/sponsors"
          }
        ]}
        activeStyle={{
          borderBottom: `2px solid ${ACCENT_COLOR}`
        }}
      >
        <Box >

        <Switch >
          <Route exact path="/" component={Landing} />
          <Route exact path="/help-out" component={Donate} />
          <Route exact path="/sponsors" component={Sponsors} />
          {/* <PrivateRoute exact path="/private-page" component={PrivateRoute} user={userInfo} /> */}
          <Route component={NoMatch} />
        </Switch>
        {/* <Footer color={"rgb(246, 246, 246)"}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Paper className={classes.paper}>Sitemap section #1</Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper className={classes.paper}>Sitemap section #2</Paper>
              </Grid>
            </Grid>

        </Footer> */}
        </Box>
      </NavBarApp>

    </div>
  );
}

export default App;