import React from "react";

const FAIcon = (props) => (
    <i className={`${props.solid ? "fas": "fa"} ${props.size ? "fa-" + props.size : ""} fa-${props.name}`}></i>
);

export default FAIcon;