// HOOKS, FUNCTIONS, ETC.
import React, { useState, useEffect } from "react";
// import { useMediaQuery } from "react-responsive";
import { makeStyles
  // , useTheme 
} from '@material-ui/core/styles';
// import clsx from 'clsx';

// COMPONENTS
// import FAIcon from "../../components/FAIcon";
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


// PROPS ( * indicates required fields )
// {
//      get: function to retrieve documents from the database,
//      delete: function to delete a document from the database,
//      submit: function that will submit the document to the database (*),
//      primary: primary identifier, object field that will be used to describe the document,
//      secondary: secondary identifier, object field that will aid the primary identifier
//      fields: [
//          {
//              label: name of field (*)
//              placeholder: field placeholder
//              value: value of input 
//              type: "single" || "multi" || "toggle" || "date" || "location" (*)
//              required: boolean to indicate field is required (*),
//              validation: function that will validate the input upon submission
//              name: field name in submission object
//          }
//      ]
//      
// }


function DocEditor(props) {
  const classes = useStyles();
  // const theme = useTheme();
  // const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  // HOOKS
  const [open, setOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const [documents, setDocuments] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Pull content from API
    props.get()
    .then((results) => {
      setDocuments(results.data);
    })

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
                {type: "single", value: "test", name: "name", placeholder: "placeholder", required: true, label: "Label", helper: "This is a helper!"},
                {type: "location", value: "test", name: "description", placeholder: "placeholder", required: true, label: "Label", helper: "This is a helper!"}
                ,{type: "date", value: new Date('2014-08-18T21:11:54'), name: "startDate", placeholder: "placeholder", required: true, label: "Label", helper: "This is a helper!"}

            ]}
            submitBtn={
              {
              color: "blue",
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
