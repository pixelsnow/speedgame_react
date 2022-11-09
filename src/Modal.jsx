import React from "react";

const Modal = (props) => {
  return (
    <div>
      <h2>Modal</h2>
      <p>Score: {props.score}</p>
      <button onClick={props.closeModal}>X</button>
    </div>
  );
};

export default Modal;
