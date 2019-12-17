import React from "react";
import "../../utils/flowHeaders.min.css";

function Overlay(props) {
    return (
        <div style={{    
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "rgb(0, 0, 0, 0.5)",
            zIndex: 1000
            }}>
            
        </div>

    );
}

export default Overlay;
