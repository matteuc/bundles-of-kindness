import React from "react";
import loading from "../../assets/loading.svg";

const Spinner = (props) => (
    <div style={{ "height": "100%", width: "100%", "display": "flex", position: "absolute" }} className="spinner">
        <div style={{margin: "auto"}}>
            <h1 style={{fontFamily: "Lilita One, cursive", color: props.color}}>{props.value}</h1>
            <img src={loading} alt="Loading" />
        </div>
    </div>
);

export default Spinner;