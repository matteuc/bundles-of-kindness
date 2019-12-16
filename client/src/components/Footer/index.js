import React from "react";
import Box from "@material-ui/core/Box";

const Footer = (props) => (
    <Box width="100vw" height="100px" style={{backgroundColor: props.color, position: "absolute"}}>
        {props.children}
    </Box>
);

export default Footer;