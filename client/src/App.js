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
import About from "./pages/About";

const publicPages = [
  {
    name: "About",
    path: "/about",
    component: About
  },
  {
    name: "Help Out",
    path: "/help-out",
    component: HelpOut
  },
  {
    name: "Photos",
    path: "/photos",
    component: Gallery
  },
  {
    name: "Sponsors",
    path: "/sponsors",
    component: Sponsors
  }
]
function App() {

  return (
    <div className="App">
      <NavBarApp
        color={MAIN_COLOR}
        accentColor={ACCENT_COLOR}
        title={<img alt="Bundles of Kindness logo" style={{ marginTop: "10px", width: "225px" }} src={Logo} />}
        center
        routes={publicPages}
        activeStyle={{
          borderBottom: `2px solid ${ACCENT_COLOR}`
        }}
      >

        <Box style={{ overflow: "hidden" }}>

          <Switch >
            <Route exact path="/" component={Landing} />
            {
              publicPages.map(({ path, component }) => <Route exact path={path} component={component} />)
            }
            <Route exact path="/admin" component={AdminDash} />
            <Route component={NoMatch} />
          </Switch>
          
        </Box>
      </NavBarApp>

    </div>
  );
}

export default App;