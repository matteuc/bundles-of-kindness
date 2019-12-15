import React from "react";

const FAIcon = (props) => (
    <i className={`${props.solid ? "fas": "fa"} fa-${props.name}`}></i>
);

export default FAIcon;