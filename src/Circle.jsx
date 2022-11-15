import React from "react";
import "./Circle.css";

const Circle = (props) => {
  return (
    <div className="Circle" onClick={props.clickHandler}>
      <h2>{props.id}</h2>
    </div>
  );
};

export default Circle;
