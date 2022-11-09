import React from "react";
import "./Circle.css";

const Circle = (props) => {
  return (
    <div className="Circle">
      <h2>{props.key}</h2>
    </div>
  );
};

export default Circle;
