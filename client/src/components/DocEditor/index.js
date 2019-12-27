// HOOKS, FUNCTIONS, ETC.
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

// COMPONENTS
import FAIcon from "../../components/FAIcon";
import DocForm from "../../components/DocForm"
import { Box, Grid, Typography, Fab } from "@material-ui/core";

// STYLESHEETS
import "../../utils/flowHeaders.min.css";
import "./main.css";

function DocEditor(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  // HOOKS

  useEffect(() => {
    
  }, [])

  // LOADING  
  return (
    <>
    
    
    
    </>
  )

}

export default DocEditor;
