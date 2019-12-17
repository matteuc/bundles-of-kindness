import React from "react";

const FAIcon = (props) => (
    <i className={`${props.solid ? "fas" : props.brand ? "fab" : "fa"} ${props.size ? "fa-" + props.size : ""} fa-${props.name} ${props.className ? props.className : ""}`} style={props.style} ></i>
);

export default FAIcon;