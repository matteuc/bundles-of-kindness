import React from "react";
import "../../utils/flowHeaders.min.css";

const mastheadStyle = {
    height: "60vh",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative"
}

function Masthead(props) {
    return (
        <>
            <div style={{ "backgroundImage": `url(${props.src})`, ...mastheadStyle, ...props.style }}>
                {props.children}
                <div style={{ "width": "100%", "height": "100%", "backgroundImage": `linear-gradient( transparent 30%, ${props.fade ? props.fadeColor : "transparent"})`, "position": "absolute", "top": "0" }}>

                </div>
            </div>


        </>

    );
}

export default Masthead;
