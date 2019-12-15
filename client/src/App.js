import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";
import API from './utils/API';
import "./App.css";

// import FAIcon from "./components/FAIcon";
import Loading from "./components/Loading";
import Landing from "./pages/Landing/index";
import NoMatch from "./components/NoMatch";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  // const user = {
    //   name: "Matt Chen",
    //   email: "matt@email.com",
    //   picture: "https://link.com"
    // }
    const { loading, user, isAuthenticated } = useAuth0();
    const [userInfo, setUserInfo] = useState();
    const classes = useStyles();

  useEffect(() => {
    updateUser();
  }, [loading]);

  // Retrieve/create userInfo document after Auth0 login
  const updateUser = () => {
    if (isAuthenticated && user && !loading) {
      setUserInfo(user);
    }
  };

  if (loading) {
    return (
      <div className="App text-center">
        <div className="mt-5">
          <Loading />
        </div>
      </div>
    );
  }


  return (
    <div className="App">
      <header>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      </header>
      <Switch>
        <Route exact path="/" component={Landing} />
        <PrivateRoute exact path="/private-page" component={PrivateRoute} user={userInfo} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;