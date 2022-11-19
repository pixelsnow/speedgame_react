import React from "react";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>GAME OVER</h2>
        <p>score: {props.score}</p>
        <p className="game-over-message">{props.message}</p>
        <button className="close-modal" onClick={props.closeModal}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
