import "./App.css";
import { Component } from "react";
import Circle from "./Circle";
import Modal from "./Modal";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    lives: 3,
    circlesNum: 4,
    circles: [],
    startButtonActive: true,
    endButtonActive: false,
    modalActive: false,
    current: undefined,
    pace: 1000,
  };

  timer;

  closeModal = () => {
    this.setState({ modalActive: false });
    this.resetGame();
  };

  toggleButtons = () => {
    this.setState({ startButtonActive: !this.state.startButtonActive });
    this.setState({ endButtonActive: !this.state.endButtonActive });
  };

  startGame = () => {
    this.toggleButtons();
    this.nextCircle();
  };

  endGame = () => {
    this.toggleButtons();
    this.setState({ modalActive: true });
    clearTimeout(this.timer);
  };

  resetGame = () => {
    this.setState({ current: undefined });
    this.setState({ lives: 3 });
  };

  componentDidMount() {
    let res = [];
    for (let i = 0; i < this.state.circlesNum; i++) res.push(i);
    console.log(`circles array set to: ${res}`);
    this.setState({ circles: res });
  }

  clickCircle = (key) => {
    console.log("circle ", key, " clicked");
    if (key !== this.state.current) {
      this.setState({ lives: this.state.lives - 1 });
    } else {
      this.setState({
        score: this.state.score + 1,
        lives: this.state.lives + 1,
      });
    }
  };

  nextCircle = () => {
    if (!this.state.lives) {
      this.endGame();
      return;
    }
    let nextActive;
    do {
      nextActive = getRandomInt(0, this.state.circlesNum - 1);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
      pace: this.state.pace - 20,
      lives: this.state.lives - 1,
    });
    console.log(nextActive);
    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  render() {
    const circles = this.state.circles.map((circle, i) => (
      <Circle
        key={i}
        id={i}
        clickHandler={() => this.clickCircle(i)}
        active={this.state.current === i}
      />
    ));

    return (
      <div className="App">
        <h1>SPEEDGAME</h1>
        <div className="game-info-bar">
          <p className="game-score">score: {this.state.score}</p>
          <p className="lives">♥ ♥ ♥{this.state.lives}</p>
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
