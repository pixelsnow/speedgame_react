import React from "react";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>GAME OVER</h2>
        <p className="final-score">score: {props.score}</p>
        <p className="game-over-message">{props.message}</p>
        <p className="game-over-submessage">{props.submessage}</p>
        <button className="close-modal" onClick={props.closeModal}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
