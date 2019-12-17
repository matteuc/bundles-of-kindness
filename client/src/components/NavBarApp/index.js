import React from "react";
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive'
import { NavLink } from "react-router-dom";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Overlay from "../Overlay";
import "../../utils/hover.min.css";
import "./main.css"

const drawerWidth = 240;
const navHeight = 64;
const mobNavHeight = 56;


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  centerTitleBtn: {
    position: "fixed"
  },
  title: {
    flexGrow: 1,
  },
  centeredTitle: {
    width: "100%",
    textAlign: "center"
  },
  scrollBtn: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "rgb(250, 250, 250)",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginTop: navHeight
  },
  contentMarginTop: {
    marginTop: navHeight

  },
  mobileContentMarginTop: {
    marginTop: mobNavHeight

  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
    marginTop: navHeight
  }
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom>
      <div onClick={handleClick} role="presentation" className={classes.scrollBtn}>
        {children}
      </div>
    </Zoom>
  );
}

function NavBarApp(props) {

  const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isMobileSize ?
        <>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar)}
            style={{
              backgroundColor: props.color
            }}
          >
            <Toolbar
              style={{
                color: props.accentColor
              }}
            >
              <IconButton
                color={"inherit"}
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide, props.center && classes.centerTitleBtn)}
              >
                <MenuIcon />
              </IconButton>
              
            <Typography variant="h6" className={clsx(classes.title, props.center && classes.centeredTitle)}>
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
              >
              {props.title}
            </NavLink>
            </Typography>
              
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {props.routes.map((route, idx) => (
                <NavLink
                  key={idx}
                  to={route.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                  activeStyle={props.activeStyle}>
                  <ListItem button style={{ justifyContent: "center", textAlign: "center" }}>
                    <ListItemText primary={route.name} />
                  </ListItem>
                </NavLink>

              ))}
            </List>

          </Drawer>
        </>

        :

        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{
            backgroundColor: props.color
          }}
        >
          <Toolbar>

            <Typography variant="h6" className={classes.title}>
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
              >
              {props.title}
            </NavLink>
            </Typography>

            {
              props.routes.map((route, idx) => (
                <NavLink
                  key={idx}
                  to={route.path}
                  style={{ textDecoration: "none", color: props.accentColor }}
                  activeStyle={props.activeStyle}
                  className="hvr-underline-from-center nav-link">
                  <Button color="inherit">{route.name}</Button>
                </NavLink>

              ))
            }

          </Toolbar>
        </AppBar>
      }

      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <main
        className={clsx(isMobileSize ? classes.mobileContentMarginTop : classes.contentMarginTop, classes.content)}
      >
        {props.children}
        {open ? 
        <Overlay />
         : ""}
      </main>
    </>

  );
}

export default NavBarApp;