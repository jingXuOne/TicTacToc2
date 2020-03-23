import React from "react";

function Square(props) {

    const classnames = ["square"];
    const id = Number(props.squareId);
    if (id % 3 === 0) {
      classnames.push("left");
    } else if (id % 3 === 2) {
      classnames.push("right");
    }

    if (id < 3) {
      classnames.push("top");
    } else if (id > 5) {
      classnames.push("bottom");
    }
    classnames.push(props.player);
    
    return (
      <div
        id={props.squareId}
        onClick={() => props.onClick()}
        className={classnames.join(" ")}
      />
    );  
  
}
export default Square;
