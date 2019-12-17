import React from "react";

function CirclePicture(props) {
    return (
        <img src={props.src} alt={props.alt} style={{
            "borderRadius": "50%",
            "width": props.size,
            ...props.style
        }} />
    );
}

export default CirclePicture;
