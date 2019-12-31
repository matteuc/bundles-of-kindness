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
        DOC_SUB(fields);
        
        // .then(res => {
        //     setIsEnabled(true);
        // });
    }
    
}

const unmarkError = (id) => {
    let tmpErrors = errors;

    tmpErrors[id] = false;

    setErrors({...tmpErrors});
}

  useEffect(() => {
    window.mdc.autoInit();
  }, [])

  // LOADING  
  return (
    <>
        <form onSubmit={handleSubmit} autoComplete="off">
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

        <Box className={classes.centerElementParent} style={{ color: "white", margin: "0.5em" }} >

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
