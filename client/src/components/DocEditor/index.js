// HOOKS, FUNCTIONS, ETC.
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { 
   makeStyles,
  //  useTheme 
} from '@material-ui/core/styles';
import clsx from 'clsx';

// COMPONENTS
import FAIcon from "../../components/FAIcon";
import DocForm from "../../components/DocForm"
import { Box, Grid, Fab, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Modal, Backdrop, Fade } from "@material-ui/core";

// STYLESHEETS
import "../../utils/flowHeaders.min.css";
import "./main.css";

const useStyles = makeStyles(theme => ({
  heading: {
    fontWeight: "bold"
  },
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
  formModal: {
    maxWidth: "500px",
    width: "80vw",
    height: "90vh",
    margin: "0.5em",
    overflow: "hidden"
  },
  alertModal: {
    maxWidth: "500px",
    width: "80%"
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  centerElementParent: {
    display: "flex"
  },
  centerElement: {
    margin: "auto"
  },
  extendedBtnIcon: {
    marginRight: "0.5em"
  }
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
//      ],
//      icon: {
//          name: Font Awesome Icon to describe the document type
//          solid: icon is solid style or not (bool)
//          color: icon color
//      }
//      
// }


function DocEditor(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  // HOOKS
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  // const [modalContent, setModalContent] = useState();
  const [documents, setDocuments] = useState([]);
  const [values, setValues] = useState({});
  const [isUpdate, setIsUpdate] = useState();
  const [openDocument, setOpenDocument] = useState(); 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlertOpen = (doc) => {
    setValues(doc);
    setOpenDocument(doc._id);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleFormOpen = (values, isUpdate, id) => {
    // Populate values with passed in object
    setValues(values);
    setIsUpdate(isUpdate);
    setOpenDocument(id);
    handleOpen();
  }

  const getDocuments = () => {
    // Pull content from API
    props.get()
    .then((results) => {
      setDocuments(results.data);
    })
  }

  const submitDocument = async (newDoc, submit) => {
    // PASS IN DOCUMENT & ID TO BE SUBMITTED
      await submit(newDoc, openDocument)
      .then(() => {
        // Refresh documents after submission
        getDocuments();
        // Close modal
        handleClose();
      })
      .catch((err) => {
        // TODO: ERROR CATCHING
      });

  }

  const deleteDocument = () => {
    // PASS IN DOCUMENT & ID TO BE DELETED
    props.delete(openDocument)
    .then(() => {
      // Refresh documents after submission
      getDocuments();
      // Close modal
      handleAlertClose();
    })
    .catch((err) => {
      // TODO: ERROR CATCHING
    });
  }

  useEffect(() => {
    // Pull content from API
    getDocuments();
  }, [])

  // LOADING  
  return (
    <div>
      { documents.length !== 0 ?
      <>
        <div style={{ display: "flex" }}>
          <List className={classes.list}>
            {
              documents.map((document, idx) => (
                <ListItem key={`document-${idx}`} button onClick={() => handleFormOpen(document, true, document._id) }>
                  <ListItemAvatar>
                    <Avatar>
                      <FAIcon name={props.icon.name} solid={props.icon.solid} style={{ color: props.icon.color }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText style={{wordBreak: "break-all"}} primary={document[props.primary]} secondary={document[props.secondary]} />
                  <ListItemSecondaryAction onClick={() =>  handleAlertOpen(document) }>
                    <IconButton edge="end" aria-label="delete">
                      <FAIcon size={"sm"} name={"trash"} solid />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
          </List>
        </div>
        <Box className={classes.centerElementParent} style={{ color: "white", marginTop: "1.5em" }} >
            <span style={{ color: "rgb(255, 255, 255)" }} onClick={() => handleFormOpen({}, false, "")} className={clsx("hvr-grow", classes.centerElement)} >
              <FAIcon size="2x" name={props.addIcon.name} solid={props.addIcon.solid} className={classes.extendedBtnIcon} style={{color: props.addIcon.color}} />
            </span>
        </Box>
      </>
      :
       <div style={{marginTop: "2em"}}>
         <Grid container justify="center" >
              <Grid item xs={10} md={8} style={{textAlign: "center"}}>
                <Typography style={{fontWeight: "bold", color: "grey"}} className={clsx("flow-text", classes.heading)} variant="h5" align="center" gutterBottom>
                  No '{props.name}' documents exist yet.
                </Typography>
              </Grid>
              <Grid item xs={10} style={{textAlign: "center"}}>

                <Typography style={{color: "grey"}} align="center" variant="body1">
                  Click the icon below to create a '{props.name}'!
                </Typography>
                <Box className={classes.centerElementParent} style={{ color: "grey", margin: "1.5em 0em" }} >
                  <FAIcon size={"10x"} name={props.icon.name} solid={props.icon.solid} className={clsx("hvr-bob", classes.centerElement)} onClick={() => handleFormOpen({}, false, "")}/>
                  
                </Box>
              </Grid>
            </Grid>
       </div>
      }

      {/* FORM MODAL */}
      <Modal
        aria-labelledby="Form Modal"
        aria-describedby=""
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
          <div className={clsx(classes.paper, classes.formModal)}>
            {/* <div style={{height: "100%", overflowY: "scroll", marginRight: "-50px", paddingRight: "50px"}}> */}

            <DocForm
              fields={props.fields}
              values={values}
              submitBtn={
                isUpdate ? props.updateBtn : props.createBtn
              }
              submit={(newDoc) => { isUpdate ? submitDocument(newDoc, props.update) : submitDocument(newDoc, props.create) }}
              />
              {/* </div> */}
          </div>
        </Fade>
      </Modal>

      {/* CONFIRM MODAL */}
      <Modal
        aria-labelledby="Confirmation Modal"
        aria-describedby=""
        className={classes.modal}
        open={alertOpen}
        onClose={handleAlertClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={alertOpen}>
          <div className={clsx(classes.paper, classes.alertModal)}>
            <Grid container justify="center" >
              <Grid item xs={12} sm={10} md={8} style={{textAlign: "center"}}>
                <Typography style={{fontWeight: "bold", color: "#018786"}} className={clsx("flow-text", classes.heading)} variant="h5" align="center" gutterBottom>
                  Confirm Deletion <FAIcon size={"sm"} name="trash" solid />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} style={{textAlign: "center"}}>

                <Typography style={{color: "grey"}} align="center" variant="body1">
                  Are you sure you want to delete {props.name} '{values[props.primary]}'?
                </Typography>
                <Box className={classes.centerElementParent} style={{ color: "white", margin: "1.5em 0em" }} >
                  <Fab style={{ backgroundColor: "#f05" }} variant={"extended"} onClick={handleAlertClose} aria-label="Login" className={clsx("hvr-bob", classes.centerElement)}>
                    <span style={{ color: "rgb(255, 255, 255)" }}  >
                        {!isMobileSize && <FAIcon size="lg" name="times" solid className={classes.extendedBtnIcon} />}
                        Cancel
                    </span>
                  </Fab>
                  <Fab style={{ backgroundColor: "#7b1" }} variant={"extended"} onClick={() => { deleteDocument()}} aria-label="Login" className={clsx("hvr-bob", classes.centerElement)}>
                    <span style={{ color: "rgb(255, 255, 255)" }} >
                        {!isMobileSize && <FAIcon size="lg" name="check" solid className={classes.extendedBtnIcon} /> }
                        Confirm
                    </span>
                  </Fab>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>



    </div>
  )

}

export default DocEditor;
