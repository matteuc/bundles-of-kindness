import React from "react";
import loading from "../../assets/loading.svg";

const Loading = () => (
    <div style={{ "height": "100%", width: "100%", "display": "flex", position: "relative" }} className="spinner">
        <div style={{margin: "auto"}}>
            <h1 className="h1">Loading...</h1>
            <img src={loading} alt="Loading" />
        </div>
    </div>
);

export default Loading;