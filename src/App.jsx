import "./App.css";
import { Component } from "react";
import Circle from "./Circle";
import Modal from "./Modal";

class App extends Component {
  state = {
    score: 0,
    circlesNum: 4,
    circles: [],
    startButtonActive: true,
    endButtonActive: false,
    modalActive: false,
  };

  closeModal = () => {
    this.setState({ modalActive: false });
  };

  toggleButtons = () => {
    this.setState({ startButtonActive: !this.state.startButtonActive });
    this.setState({ endButtonActive: !this.state.endButtonActive });
  };

  startGame = () => {
    this.toggleButtons();
  };

  endGame = () => {
    this.toggleButtons();
    this.setState({ modalActive: true });
  };

  fillCircleArray = () => {
    let res = [];
    for (let i = 0; i < this.state.circlesNum; i++)
      res.push({ id: i, active: false });
    console.log(res);
    this.setState({ circles: res });
  };

  clickCircle = (key) => {
    console.log("circle ", key, " clicked");
  };

  render() {
    /* this.fillCircleArray(); THIS CRASHES THINGS */

    const circles = this.state.circles.map((circle) => (
      <Circle key={circle.id} onClick={() => this.clickCircle(circle.id)} />
    ));

    return (
      <div className="App">
        <h1>SPEEDGAME</h1>
        <p className="game-score">Score: {this.state.score}</p>
        <div className="circle-container">{circles}</div>
        {this.state.startButtonActive && (
          <button className="start-btn" onClick={this.startGame}>
            start playing
          </button>
        )}
        {this.state.endButtonActive && (
          <button className="end-btn" onClick={this.endGame}>
            Stop playing
          </button>
        )}
        {this.state.modalActive && (
          <Modal score={this.state.score} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
