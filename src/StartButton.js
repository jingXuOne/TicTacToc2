import React from "react";

export default function StartButton(props){
    console.log("StartButton",props);
    return <button type="button" 
        style={{ visibility : props.visibility }}
        onClick={() => props.onClick() } id="startButton">Start
    </button>;
}