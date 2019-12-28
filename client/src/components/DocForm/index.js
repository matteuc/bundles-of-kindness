// HOOKS, FUNCTIONS, ETC.
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import 'date-fns';

// COMPONENTS
import FAIcon from "../../components/FAIcon";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
// import {MDCTextField} from '@material/textfield';
import { Box, Grid, Typography, Fab, TextField } from "@material-ui/core";
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
//          }
//      ]
//      
// }

const useStyles = makeStyles(theme => ({}));

function DocForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobileSize = useMediaQuery({ query: '(max-width: 600px)' })

  // VARIABLES
  const DOC_ID = props.id;
  const DOC_SUB = props.submit;
  const DOC_FIELDS = props.fields; 

  // HOOKS
  //  https://itnext.io/how-to-build-a-dynamic-controlled-form-with-react-hooks-2019-b39840f75c4f
  
  const [forms, setForms] = useState({});
  const [selectedDate, setSelectedDate] = React.useState();

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    // const currFormId = currForm.id;
    // const currFormVal = currForm.value;

    let tmp = forms;
    tmp[id] = value;
    setForms({...tmp});
  };

const handleDateChange = (date, id) => {
    let tmp = forms;
    tmp[id] = date;
    setForms({...tmp});

  };

const handleLocationChange = (e) => {
    const { value, id } =  e.input;

    let tmp = forms;
    tmp[id] = value;
    setForms({...tmp});
}
  

  useEffect(() => {
    window.mdc.autoInit();
  }, [])

  // LOADING  
  return (
    <>
        {
            DOC_FIELDS.map((form, idx) => {
                switch(form.type) {
                    case "single":
                        return (
                            <TextField
                                defaultValue={form.value}
                                key={`form-${idx}`}
                                id={`form-${idx}`}
                                onChange={handleDateChange}
                                value={forms[`form-${idx}`]}
                                label={form.label}
                                style={{ margin: 8 }}
                                placeholder={form.placeholder}
                                helperText={form.helper}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={form.required}
                            />
                        )

                    case "multi":
                        return (
                            <TextField
                                multiline
                                defaultValue={form.value}
                                key={`form-${idx}`}
                                id={`form-${idx}`}
                                onChange={handleFormChange}
                                value={forms[`form-${idx}`]}
                                label={form.label}
                                style={{ margin: 8 }}
                                placeholder={form.placeholder}
                                helperText={form.helper}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={form.required}
                            />
                        )
                    
                    case "number":
                            return (
                            <TextField
                                type="number"
                                defaultValue={form.value}
                                key={`form-${idx}`}
                                id={`form-${idx}`}
                                onChange={handleFormChange}
                                value={forms[`form-${idx}`]}
                                label={form.label}
                                style={{ margin: 8 }}
                                placeholder={form.placeholder}
                                helperText={form.helper}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={form.required}
                            />
                            )

                    case "date":
                        return (
                            <MuiPickersUtilsProvider key={`form-${idx}`} utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id={`form-${idx}`}
                                    helperText={form.helper}
                                    label={form.label}
                                    fullWidth
                                    format="MM/dd/yyyy"
                                    value={forms[`form-${idx}`] || form.value}
                                    onChange={(date) => handleDateChange(date, `form-${idx}`)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        )

                    case "time": 
                        return (
                            <MuiPickersUtilsProvider key={`form-${idx}`} utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id={`form-${idx}`}
                                    helperText={form.helper}
                                    label={form.label}
                                    fullWidth
                                    mask="__:__ _M"
                                    value={forms[`form-${idx}`] || form.value}
                                    onChange={(date) => handleDateChange(date, `form-${idx}`)}
                                    placeholder={form.placeholder}
                                />
                            </MuiPickersUtilsProvider>
                        )

                        case "date-time": 
                        return (
                            <MuiPickersUtilsProvider key={`form-${idx}`} utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    margin="normal"
                                    id={`form-${idx}`}
                                    helperText={form.helper}
                                    label={form.label}
                                    fullWidth
                                    mask="__:__ _M"
                                    value={forms[`form-${idx}`] || form.value}
                                    onChange={(date) => handleDateChange(date, `form-${idx}`)}
                                    placeholder={form.placeholder}
                                />
                            </MuiPickersUtilsProvider>
                        )

                    case "location":
                        return (
                            <div key={`form-${idx}`}>
                            <div data-mdc-auto-init="MDCTextField" className="mdc-text-field mdc-text-field--fullwidth">
                                <LocationAutocomplete
                                    className={"mdc-text-field__input"}
                                    id={`form-${idx}`}
                                    value={forms[`form-${idx}`] === undefined ? form.value : forms[`form-${idx}`]}
                                    style={{padding: "20px 16px 6px"}}
                                    googleAPIKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                    onChange={handleFormChange}
                                    onDropdownSelect={handleLocationChange}
                                />
                                    {/* <input className="mdc-text-field__input" id={`form-${idx}`} /> */}

                                    <div className="mdc-line-ripple"></div>
                                    <label htmlFor={`form-${idx}`} className="mdc-floating-label">
                                        {form.label}
                                    </label>

                                </div>
                                <div className="mdc-text-field-helper-line">
                                    <div className="mdc-text-field-helper-text">
                                        {form.helper}
                                    </div>
                                </div>
                            </div>
                        )
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
        
    
    
    
    </>
  )

}

export default DocForm;
