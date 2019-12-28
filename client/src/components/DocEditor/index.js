// HOOKS, FUNCTIONS, ETC.
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

// COMPONENTS
import FAIcon from "../../components/FAIcon";
import DocForm from "../../components/DocForm"
import { Box, Grid, Typography, Fab, Modal, Backdrop, Fade } from "@material-ui/core";

// STYLESHEETS
import "../../utils/flowHeaders.min.css";
import "./main.css";

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function DocEditor(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  // HOOKS
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    
  }, [])

  // LOADING  
  return (
    <>
    <button type="button" onClick={handleOpen}>
        react-transition-group
    </button>
      
      
      
      
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <DocForm 
            fields={[
                {type: "single", value: "test", placeholder: "placeholder", required: true, label: "Label", helper: "This is a helper!"},
                {type: "location", value: "test", placeholder: "placeholder", required: true, label: "Label", helper: "This is a helper!"}
                ,{type: "date", value: new Date('2014-08-18T21:11:54'), placeholder: "placeholder", required: true, label: "Label", helper: "This is a helper!"}

            ]}
            submitBtn={
              {
              color: "eggshell",
              text: "Update",
              icon: "edit"
              }
            }
            submit={() => {console.log("submitting")}}
          />
          </div>
        </Fade>
      </Modal>
    
    
    </>
  )

}

export default DocEditor;
