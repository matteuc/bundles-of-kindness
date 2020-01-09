// HOOKS, FUNCTIONS, ETC.
import React, { useState, useEffect } from "react";
// import { useMediaQuery } from "react-responsive";
import { 
    makeStyles,
    // useTheme 
} from '@material-ui/core/styles';
import clsx from 'clsx';
import 'date-fns';

// COMPONENTS
import FAIcon from "../../components/FAIcon";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
  DateTimePicker
} from '@material-ui/pickers';
import { Box, Fab, TextField } from "@material-ui/core";
import LocationAutocomplete from 'location-autocomplete';
import Dropzone from 'react-dropzone';
import storage from "./firebaseConfig";

// STYLESHEETS
import "../../utils/flowHeaders.min.css";
import "./main.css";

// PROPS ( * indicates required fields )
// {
//      id: Object _id you want to update,
//      submit: function that will submit the document to the database (*),
//      fields: [
//          {
//              label: name of field (*)
//              placeholder: field placeholder
//              value: value of input 
//              type: "single" || "multi" || "toggle" || "date" || "location" (*)
//              required: boolean to indicate field is required (*),
//              validation: function that will validate the input upon submission
//              name: field name in submission object
//              helper: helper text
//              error: error text
//          }
//      ],
//      submitBtn: {
//          color: button color
//          text: button text
//          icon: button icon
//      }
//      
// }

const useStyles = makeStyles(theme => ({
    centerElementParent: {
        display: "flex"
      },
      centerElement: {
        margin: "auto"
      },
      extendedBtnIcon: {
        marginRight: "0.5em"
      },
      form: {
          overflowY: "scroll",
          overflowX: "hidden",
          paddingRight: "50px",
          marginRight: "-50px",
          height: "100%"
      }
}));

function DocForm(props) {
  const classes = useStyles();
//   const theme = useTheme();
//   const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  // VARIABLES
  const DOC_SUB = props.submit;
  const DOC_FIELDS = props.fields; 
  const DOC_VALUES = props.values;
  const ERROR_COLOR = "#f44336";

  // HOOKS
  //  https://itnext.io/how-to-build-a-dynamic-controlled-form-with-react-hooks-2019-b39840f75c4f
  
  const [fields, setFields] = useState(DOC_VALUES);
  const [files, setFiles] = useState([]);
  const [dropzones, setDropzones] = useState([]);
  const [errors, setErrors] = useState({});
  const [isEnabled, setIsEnabled] = useState(true);

  const handleFormChange = (e) => {
    const { id, value } = e.target;

    let tmp = fields;
    tmp[id] = value;
    setFields({...tmp});

    unmarkError(id);

  };

const handleDateChange = (date, id) => {
    let tmp = fields;
    tmp[id] = date;
    setFields({...tmp});

    unmarkError(id);

  };

const handleLocationChange = (e) => {
    const { value, id } =  e.input;

    let tmp = fields;
    tmp[id] = value;
    setFields({...tmp});

    unmarkError(id);

}
  
const handleSubmit = (e) => {
    e.preventDefault();
    
    let tmpErrors = {};
    let errors = 0;
    // Do error validation
    for(const field of props.fields) {
        const fieldVal = fields[field.name];

        if(field.validate || field.required) {
            if (field.validate) {
                tmpErrors[field.name] = !field.validate(fieldVal);
                errors++;
            }

            if(field.required && !fieldVal) {
                tmpErrors[field.name] = true;
                errors++
            }

        } 
        else {
            tmpErrors[field.name] = false;
        }

    }

    setErrors({...tmpErrors});

    if(errors === 0) {
        setIsEnabled(false);

        // UPLOAD IMAGES TO FIREBASE AND RETRIEVE LINKS
        // BEFORE SUBMITTING
        if(dropzones.length) {
            Promise.all(
                dropzones.map(dropzoneId => 
                    uploadImageAsPromise(files[dropzoneId], dropzoneId)
                )
            )
            // After all images are uploaded...
            // SUBMIT TO DATABASE
            .then( result => {
                DOC_SUB(fields);

            })
            .catch(err => {
                console.log(err.message);
            })
            

        } 
        else {
            DOC_SUB(fields);
        }
        

    }
    
}

const unmarkError = (id) => {
    let tmpErrors = errors;

    tmpErrors[id] = false;

    setErrors({...tmpErrors});
}

const markError = (id) => {
    let tmpErrors = errors;

    tmpErrors[id] = true;

    setErrors({...tmpErrors});
}

// REACT-DROPZONE FUNCTIONS
const uploadImageAsPromise = (image, id) => {
    const imageBlob = new Blob([image], { type: `image/${image.name.split(".")[1]}` });    
    return storage.ref(`images/${image.name}`)
        // Upload image to database
        .put(imageBlob)
        // After image has finished uploading...
        .then(snapshot => {
            // Retrieve image URL
            return snapshot.ref.getDownloadURL()
                .then(url => {
                    // Set image URL 
                    let tmp = fields;
                    tmp[id] = url;

                    setFields({...tmp});
                })
                
        })
        // Handle Uploading Error
        .catch(err => {
            console.log(err);
        })


}

const addDropzoneId = id => {
    let tmp = dropzones;
    tmp.push(id);

    setDropzones([...tmp]);

}

const addDefaultSrc = ev => {
  ev.target.src = "https://pbs.twimg.com/media/DnE2oP6UYAAJr8R.jpg";
  const dropzoneId = ev.target.name;
  if (fields[dropzoneId]) {
      markError(dropzoneId);
  }
}

const handleDrop = (imageFiles, id) => {
    // Add dropzone ID to state variable
    if (!dropzones.includes(id)) {
        addDropzoneId(id);
    }

    let image = imageFiles[0];

    // Store File object
    let tmp = files;
    tmp[id] = image;
    setFiles({...tmp});
    
    if (typeof image == "object") {
        image = URL.createObjectURL(image);
    }
    
    tmp = fields;
    tmp[id] = image;
    setFields({...tmp});

    unmarkError(id);
    
}

  useEffect(() => {
    window.mdc.autoInit();
  }, [])


  // LOADING  
  return (
    <>
        <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
        {
            DOC_FIELDS.map((field, idx) => {
                switch(field.type) {
                    case "single":
                        return (
                            <TextField
                                key={`form-${idx}`}
                                id={field.name}
                                onChange={handleFormChange}
                                // defaultValue={DOC_VALUES[field.name]}
                                value={fields[field.name]  || DOC_VALUES[field.name] || ''}
                                label={field.label}
                                placeholder={field.placeholder}
                                error={errors[field.name] ? true: false}
                                helperText={errors[field.name] ? field.error : field.helper}
                                fullWidth
                                style={{margin: "0.5em"}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={field.required}
                            />
                        )

                    case "multi":
                        return (
                            <TextField
                                multiline
                                // defaultValue={DOC_VALUES[field.name]}
                                key={`form-${idx}`}
                                id={field.name}
                                onChange={handleFormChange}
                                value={fields[field.name]  || DOC_VALUES[field.name] || ''}
                                label={field.label}
                                placeholder={field.placeholder}
                                error={errors[field.name] ? true: false}
                                helperText={errors[field.name] ? field.error : field.helper}
                                fullWidth
                                style={{margin: "0.5em"}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={field.required}
                            />
                        )
                    
                    case "number":
                            return (
                            <TextField
                                type="number"
                                // defaultValue={DOC_VALUES[field.name]}
                                key={`form-${idx}`}
                                id={field.name}
                                onChange={handleFormChange}
                                value={fields[field.name]  || DOC_VALUES[field.name] || ''}
                                label={field.label}
                                placeholder={field.placeholder}
                                error={errors[field.name] ? true: false}
                                helperText={errors[field.name] ? field.error : field.helper}
                                fullWidth
                                style={{margin: "0.5em"}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={field.required}
                            />
                            )

                    case "date":
                        return (
                            <MuiPickersUtilsProvider key={`form-${idx}`} utils={DateFnsUtils}>
                                <DatePicker
                                    required={field.required}
                                    style={{margin: "0.5em"}}
                                    id={field.name}
                                    error={errors[field.name] ? true: false}
                                    helperText={errors[field.name] ? field.error : field.helper}
                                    label={field.label}
                                    fullWidth
                                    format="MM/dd/yyyy"
                                    inputValue={fields[field.name]  || DOC_VALUES[field.name]}
                                    onChange={(date) => handleDateChange(date, field.name)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        )

                    case "time": 
                        return (
                            <MuiPickersUtilsProvider key={`form-${idx}`} utils={DateFnsUtils}>
                                <TimePicker
                                    required={field.required}
                                    style={{margin: "0.5em"}}                                
                                    id={field.name}
                                    error={errors[field.name] ? true: false}
                                    helperText={errors[field.name] ? field.error : field.helper}
                                    label={field.label}
                                    fullWidth
                                    mask="__:__ _M"
                                    inputValue={fields[field.name]  || DOC_VALUES[field.name]}
                                    onChange={(date) => handleDateChange(date, field.name)}
                                    placeholder={field.placeholder}
                                />
                            </MuiPickersUtilsProvider>
                        )

                    case "date-time": 
                        return (
                            <MuiPickersUtilsProvider key={`form-${idx}`} utils={DateFnsUtils}>
                                <DateTimePicker
                                    clearable
                                    required={field.required}
                                    style={{margin: "0.5em"}}
                                    id={field.name}
                                    error={errors[field.name] ? true: false}
                                    helperText={errors[field.name] ? field.error : field.helper}
                                    label={field.label}
                                    fullWidth
                                    mask="__:__ _M"
                                    // inputValue={fields[field.name]  || DOC_VALUES[field.name]}
                                    value={fields[field.name] || DOC_VALUES[field.name] || null }
                                    onChange={(date) => handleDateChange(date, field.name)}
                                    placeholder={field.placeholder}
                                />
                            </MuiPickersUtilsProvider>
                        )

                    case "location":
                        return (
                            <div key={`form-${idx}`} style={{margin: "0.5em"}}>
                                <div data-mdc-auto-init="MDCTextField" className="mdc-text-field mdc-text-field--fullwidth">
                                <LocationAutocomplete
                                    required={field.required}
                                    className={`mdc-text-field__input`}
                                    id={field.name}
                                    // defaultValue={DOC_VALUES[field.name]}
                                    value={fields[field.name]  || DOC_VALUES[field.name] || ''}
                                    style={{padding: "20px 0px 6px", borderBottomColor: errors[field.name] ? ERROR_COLOR : ""}}
                                    googleAPIKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                    onChange={handleFormChange}
                                    onDropdownSelect={handleLocationChange}
                                />

                                    <div className="mdc-line-ripple"></div>
                                    <label style={{left: "0px", color: errors[field.name] ? ERROR_COLOR : ""}} htmlFor={field.name} className={`mdc-floating-label`}>
                                        {field.label}
                                    </label>

                                </div>
                                <div style={{paddingLeft: "0px"}} className="mdc-text-field-helper-line">
                                    <div style={{color: errors[field.name] ? ERROR_COLOR : ""}} className={`mdc-text-field-helper-text`}>
                                        {errors[field.name] ? field.error : field.helper}
                                    </div>
                                </div>
                            </div>
                        )
                    case "image": 
                        return (
                            <div key={`form-${idx}`}>
                                <TextField
                                id={field.name}
                                disabled
                                onChange={handleFormChange}
                                value={fields[field.name]  || DOC_VALUES[field.name] || ''}
                                label={field.label}
                                placeholder={field.placeholder}
                                error={errors[field.name] ? true: false}
                                helperText={errors[field.name] ? field.error : field.helper}
                                fullWidth
                                style={{margin: "0.5em"}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={field.required}
                            />
                                
                                {/* DROPZONE WITH PREVIEW */}
                                <Dropzone 
                                
                                    style={{margin: "0.5em"}}  
                                    onDrop={(img) => handleDrop(img, field.name)}>
                                        {({ getRootProps, getInputProps }) => (
                                            <Box >
                                                <div {...getRootProps({ className: `${errors[field.name] ? 'dropzone-error' : 'dropzone'}` })}>
                                                    <input {...getInputProps({ multiple: false, accept: 'image/*' })} />
                                                    <div className="image-overlay">
                                                        <p className="image-overlay-text">Drag 'n' drop an image here, or click to select one</p>
                                                    </div>
                                                <img 
                                                    id={field.name}
                                                    onError={addDefaultSrc} 
                                                    name=""
                                                    style={{margin: "auto", width: "100%"}}
                                                    // src={fields[field.name] ? URL.createObjectURL(fields[field.name]) : "https://pbs.twimg.com/media/DnE2oP6UYAAJr8R.jpg"} 
                                                    src={ 
                                                        fields[field.name] === undefined ? 
                                                            "https://pbs.twimg.com/media/DnE2oP6UYAAJr8R.jpg"
                                                        : fields[field.name]
                                                        } 
                                                />
                                                </div>
                                            </Box>
                                        )}
                                </Dropzone>
                                
                                { errors[field.name] && 
                                    <span style={{ "fontSize": "0.8rem", color: "red" }} >{field.error}</span>
                                }
                                
                            </div>
                        )

                    case "url":
                        return (
                            <TextField
                                type="url"
                                key={`form-${idx}`}
                                id={field.name}
                                onChange={handleFormChange}
                                // defaultValue={DOC_VALUES[field.name]}
                                value={fields[field.name]  || DOC_VALUES[field.name] || ''}
                                label={field.label}
                                placeholder={field.placeholder}
                                error={errors[field.name] ? true: false}
                                helperText={errors[field.name] ? field.error : field.helper}
                                fullWidth
                                style={{margin: "0.5em"}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={field.required}
                            />
                        )
                    case "email":
                        return (
                            <TextField
                                type="email"
                                key={`form-${idx}`}
                                id={field.name}
                                onChange={handleFormChange}
                                // defaultValue={DOC_VALUES[field.name]}
                                value={fields[field.name]  || DOC_VALUES[field.name] || ''}
                                label={field.label}
                                placeholder={field.placeholder}
                                error={errors[field.name] ? true: false}
                                helperText={errors[field.name] ? field.error : field.helper}
                                fullWidth
                                style={{margin: "0.5em"}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={field.required}
                            />
                        )
                    default: 
                        return "";
                    // case "toggle":
                    //     return (
                    //         <div>Location</div>
                    //     )
                    // case "dropdown":
                    //         return (
                    //             <div>Location</div>
                    //         )
                    // case "checkbox":
                    //     return (
                    //         <div>Location</div>
                    //     )

                }
                
            })

        }

        <Box className={classes.centerElementParent} style={{ color: "white", margin: "1em" }} >

            <Fab disabled={!isEnabled} style={{ backgroundColor: props.submitBtn.color || "" }} variant="extended" type="submit" aria-label="Login" className={clsx("hvr-bob", classes.centerElement, classes.btnIcon)}>
            <span style={{ color: "rgb(255, 255, 255)" }}>
                <FAIcon size="lg" name={props.submitBtn.icon} solid className={classes.extendedBtnIcon} />
                {props.submitBtn.text}
            </span>
            </Fab>
        </Box>

        </form>
        
    
    
    
    </>
  )

}

export default DocForm;
