// import React, { useEffect, useState } from "react";
// import PrivateRoute from "./components/PrivateRoute";
// import { useAuth0 } from "./react-auth0-spa";
// import API from './utils/API';

// HOOKS, FUNCTIONS, ETC.
import React from "react";
import { Route, Switch } from "react-router-dom";

// PAGES 
import Landing from "./pages/Landing/index";
import HelpOut from "./pages/HelpOut/index";
import Sponsors from "./pages/Sponsors/index";
import AdminDash from "./pages/AdminDash/index";
import Gallery from "./pages/Gallery/index";

// COMPONENTS
import NoMatch from "./components/NoMatch";
import NavBarApp from "./components/NavBarApp";
import DocForm from "./components/DocForm";
// import Footer from "./components/Footer";
import { Box } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";


// LOGO
import Logo from "./assets/logo.PNG";

// STYLESHEETS
import "./App.css";

// DATA
import { MAIN_COLOR, ACCENT_COLOR } from "./utils/colors";

// const useStyles = makeStyles(theme => ({
 
// }));

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

  // if (!loading && isAuthenticated && user) {
  //   return (
  //     <div className="App text-center">
  //       <div className="mt-5">
  //         {user.email}
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
            name: "Gallery",
            path: "/gallery"
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
        
        <Box style={{overflow: "hidden"}}>
          
        <Switch >
          <Route exact path="/" component={Landing} />
          <Route exact path="/help-out" component={HelpOut} />
          <Route exact path="/sponsors" component={Sponsors} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/admin" component={AdminDash} />
          <Route component={NoMatch} />
        </Switch>
        {/* <Footer color={"rgb(246, 246, 246)"}> */}
            {/* <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Paper className={classes.paper}>Sitemap section #1</Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper className={classes.paper}>Sitemap section #2</Paper>
              </Grid>
            </Grid> */}

        {/* </Footer> */}
        </Box>
      </NavBarApp>

    </div>
  );
}

export default App;