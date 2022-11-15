import "./App.css";
import { Component } from "react";
import Circle from "./Circle";
import Modal from "./Modal";

class App extends Component {
  state = {
    score: 0,
    lives: 3,
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

  componentDidMount() {
    let res = [];
    for (let i = 0; i < this.state.circlesNum; i++)
      res.push({ id: i, active: false });
    console.log(`circles array set to: ${res}`);
    this.setState({ circles: res });
  }

  clickCircle = (key) => {
    console.log("circle ", key, " clicked");
    this.setState({ score: this.state.score + 1 });
  };

  render() {
    const circles = this.state.circles.map((circle) => (
      <Circle
        key={circle.id}
        id={circle.id}
        clickHandler={() => this.clickCircle(circle.id)}
      />
    ));

    return (
      <div className="App">
        <h1>SPEEDGAME</h1>
        <div className="game-info-bar">
          <p className="game-score">score: {this.state.score}</p>
          <p className="lives">♥ ♥ ♥</p>
        </div>

        <div className="circle-container">{circles}</div>
        {this.state.startButtonActive && (
          <button className="start-btn" onClick={this.startGame}>
            start playing
          </button>
        )}
        {this.state.endButtonActive && (
          <button className="end-btn" onClick={this.endGame}>
            stop playing
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
