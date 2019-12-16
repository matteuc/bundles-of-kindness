import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        bottom: "0",
        right: "0",
        left: "0"
    }

}));


function Footer(props) {
    const classes = useStyles();

    return (
        <Box p={3} className={classes.root} style={{ backgroundColor: props.color, position: "relative" }}>
            <Box width="100%">
                {props.children}
            </Box>
        </Box>
    );
}

export default Footer;