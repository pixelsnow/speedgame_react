import React from "react";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>Modal</h2>
        <p>Score: {props.score}</p>
        <button className="close-modal" onClick={props.closeModal}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
