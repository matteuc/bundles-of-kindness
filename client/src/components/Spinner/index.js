import React from "react";
import loading from "../../assets/loading.svg";

const Spinner = (props) => (
    <div style={{ "height": "100%", width: "100%", "display": "flex", position: "absolute" }} className="spinner">
        <div style={{margin: "auto"}}>
            <img style={{maxHeight: "20vh"}} src={props.src || loading} alt="Loading" />
            <h1 style={{textAlign: "center", fontFamily: "Lilita One, cursive", color: props.color}}>{props.value}</h1>
        </div>
    </div>
);

export default Spinner;