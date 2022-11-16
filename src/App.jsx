import "./App.css";
import { Component } from "react";
import Circle from "./Circle";
import Modal from "./Modal";
/* import click from "./assets/sounds/click.wav";

let clickSound = new Audio(click); */

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    lives: 3,
    livesArray: [],
    circlesNum: 4,
    circles: [],
    startButtonActive: true,
    gameInProgress: false,
    modalActive: false,
    current: undefined,
    pace: 1000,
    correctClicked: true,
  };

  timer;

  closeModal = () => {
    this.setState({ modalActive: false });
    this.resetGame();
  };

  toggleButtons = () => {
    this.setState({ startButtonActive: !this.state.startButtonActive });
    this.setState({ gameInProgress: !this.state.gameInProgress });
  };

  startGame = () => {
    this.toggleButtons();
    this.nextCircle();
  };

  endGame = () => {
    this.toggleButtons();
    this.setState({ modalActive: true, lives: 0 });
    clearTimeout(this.timer);
  };

  resetGame = () => {
    this.setState({
      current: undefined,
      lives: 3,
      score: 0,
      pace: 1000,
      correctClicked: true,
    });
  };

  componentDidMount() {
    let res = [];
    for (let i = 0; i < this.state.circlesNum; i++) res.push(i);
    this.setState({ circles: res });
    let lives = [];
    for (let i = 0; i < this.state.lives; i++) lives.push(i);
    this.setState({ livesArray: lives });
  }

  /* clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  }; */

  clickCircle = (key) => {
    // If game is not in progress, don't to anything
    if (!this.state.gameInProgress) return;
    /* this.clickPlay(); */
    if (key !== this.state.current) {
      this.endGame();
    } else {
      this.setState({
        score: this.state.score + 1,
        correctClicked: true,
      });
    }
  };

  nextCircle = () => {
    // Checking if the correct circle wasn't clicked and we should reduce lives
    if (!this.state.correctClicked) {
      console.log(
        `not clicked correct, reducing lives to ${this.state.lives - 1}`
      );
      this.setState({ lives: this.state.lives - 1 });
      if (this.state.lives <= 1) {
        this.endGame();
        return;
      }
    }
    // Get the next circle
    let nextActive;
    do {
      nextActive = getRandomInt(0, this.state.circlesNum - 1);
    } while (nextActive === this.state.current);
    //
    this.setState({
      current: nextActive,
      pace: this.state.pace - 20,
    });
    if (!this.state.correctClicked) {
      console.log(
        `not clicked correct, reducing lives to ${this.state.lives - 1}`
      );
      this.setState({ lives: this.state.lives - 1 });
      if (this.state.lives <= 1) {
        this.endGame();
        return;
      }
    }
    console.log(`current: ${nextActive}`);
    this.setState({ correctClicked: false });
    console.log("correctClicked set to false");
    this.timer = setTimeout(
      this.nextCircle,
      this.state.pace,
      this.state.correctClicked
    );
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
          <p className="lives">♥{this.state.lives}</p>
        </div>

        <div className="circle-container">{circles}</div>
        {this.state.startButtonActive && (
          <button className="start-btn" onClick={this.startGame}>
            start playing
          </button>
        )}
        {this.state.gameInProgress && (
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
