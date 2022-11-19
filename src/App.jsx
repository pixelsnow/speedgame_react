import "./App.css";
import { Component } from "react";
import Circle from "./Circle";
import Modal from "./Modal";
import Life from "./Life";
import click from "./assets/sounds/click1.mp3";
import crack0 from "./assets/sounds/crack5.mp3";
import crack1 from "./assets/sounds/popcorn1.mp3";
import crack2 from "./assets/sounds/crack4.mp3";
import crack3 from "./assets/sounds/slime_cut.mp3";
import spook from "./assets/sounds/spook2.mp3";

let clickSound = new Audio(click);
let crackSound = undefined;
let crackSound0 = new Audio(crack0);
let crackSound1 = new Audio(crack1);
let crackSound2 = new Audio(crack2);
let crackSound3 = new Audio(crack3);
let gameOver = new Audio(spook);

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

  // Initialises lives array to map later in the render
  initLivesArray = () => {
    let lives = [];
    for (let i = 0; i < this.state.lives; i++) lives.push(i);
    this.setState({ livesArray: lives });
  };

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
    clickSound.play();
    this.nextCircle();
  };

  endGame = () => {
    if (crackSound && !crackSound.paused) crackSound.pause();
    if (!clickSound.paused) clickSound.pause();
    gameOver.play();
    this.toggleButtons();
    this.setState({ modalActive: true });
    clearTimeout(this.timer);
  };

  resetGame = () => {
    window.location.reload();
  };

  // On page load, init circles array and lives array
  componentDidMount() {
    let res = [];
    for (let i = 0; i < this.state.circlesNum; i++) res.push(i);
    this.setState({ circles: res });
    this.initLivesArray();
  }

  clickCircle = (key) => {
    switch (key) {
      case 0: {
        crackSound = crackSound0;
        break;
      }
      case 1: {
        crackSound = crackSound1;
        break;
      }
      case 2: {
        crackSound = crackSound2;
        break;
      }
      case 3: {
        crackSound = crackSound3;
        break;
      }
      default:
    }
    if (crackSound.paused) {
      crackSound.play();
    } else {
      crackSound.currentTime = 0;
    }
    // If game is not in progress, don't do anything
    if (!this.state.gameInProgress) return;
    // If the wrong circle was clicked, end the game
    if (key !== this.state.current) {
      this.endGame();
    } else {
      // if the correct circle was clicked, increase the score and toggle the correctClicked flag
      this.setState({
        score: this.state.score + 1,
        correctClicked: true,
      });
    }
  };

  nextCircle = () => {
    console.log(`pace: ${this.state.pace}`);
    // Checking if the correct circle wasn't clicked and we should reduce lives
    if (!this.state.correctClicked) {
      this.setState({
        lives: this.state.lives - 1,
        livesArray: this.state.livesArray.slice(1),
      });
      if (this.state.lives <= 1) {
        this.endGame();
        return;
      }
    }
    // Pick the next circle
    let nextActive;
    do {
      nextActive = getRandomInt(0, this.state.circlesNum - 1);
    } while (nextActive === this.state.current);
    // Set the next circle and increase the pace
    this.setState({
      current: nextActive,
      pace: this.state.pace - 20,
    });
    // Reset the correctClicked indicator
    this.setState({ correctClicked: false });
    // Set timeout
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

    const lives = this.state.livesArray.map((life, i) => <Life key={i} />);

    return (
      <div className="App">
        <h1>SPEEDGAME</h1>
        <div className="game-info-bar">
          <p className="game-score">score: {this.state.score}</p>
          <p className="lives">{lives}</p>
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
