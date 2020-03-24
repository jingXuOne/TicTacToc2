import React from "react";

export default function ClearButton(props){
    console.log("ClearButton",props);
    return <button type="button" 
        style={{ visibility : props.visibility }}
        onClick={() => props.onClick()} id="clearButton">Clear
    </button>;
}