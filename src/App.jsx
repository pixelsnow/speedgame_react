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
    gameOverMessage: "",
    gameOverSubmessage: "",
    soundOn:
      localStorage.getItem("soundOn") === null
        ? true
        : JSON.parse(localStorage.getItem("soundOn")),
  };

  timer;

  // Initialises lives array to map later in the render
  initLivesArray = () => {
    let lives = [];
    for (let i = 0; i < this.state.lives; i++) lives.push(i);
    this.setState({ livesArray: lives });
  };

  toggleSound = (soundOn) => {
    console.log("before: ", this.state.soundOn);
    this.setState({ soundOn: !soundOn });
    console.log("after: ", this.state.soundOn);
    localStorage.setItem("soundOn", !soundOn);
    console.log("local: ", localStorage.getItem("soundOn"));
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
    if (this.state.soundOn) clickSound.play();
    this.nextCircle();
  };

  setGameOverMessage = () => {
    if (this.state.score < 5) {
      this.setState({ gameOverMessage: "didn't even try did ya" });
      this.setState({
        gameOverSubmessage: "your house has been taken over by crawlies",
      });
    } else if (this.state.score < 25) {
      this.setState({ gameOverMessage: "you tried." });
      this.setState({
        gameOverSubmessage: `your house is clear for now`,
      });
    } else if (this.state.score < 50) {
      this.setState({
        gameOverMessage: "we got a professional exterminator in the house, huh",
      });
      this.setState({
        gameOverSubmessage: "GOT THEM",
      });
    } else {
      this.setState({ gameOverMessage: "hello bot" });
    }
  };

  endGame = () => {
    if (this.state.soundOn) gameOver.play();
    this.toggleButtons();
    this.setGameOverMessage();
    this.setState({ modalActive: true });
    clearTimeout(this.timer);
  };

  resetGame = () => {
    window.location.reload();
  };

  // On page load, init circles array and lives array
  componentDidMount() {
    if (localStorage.getItem("soundOn"))
      this.setState({ soundOn: JSON.parse(localStorage.getItem("soundOn")) });
    else localStorage.setItem("soundOn", true);
    console.log(`set: ${this.state.soundOn}`);
    console.log(`localstorage item: ${localStorage.getItem("soundOn")}`);
    let res = [];
    for (let i = 0; i < this.state.circlesNum; i++) res.push(i);
    this.setState({ circles: res });
    this.initLivesArray();
  }

  playCrackSound = (key) => {
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
    crackSound.play();
    if (crackSound.paused) {
      crackSound.play();
    } else {
      crackSound.currentTime = 0;
    }
  };

  clickCircle = (key) => {
    // If game hasn't started yet or the correct circle has been clicked already, do nothing
    if (!this.state.gameInProgress || this.state.correctClicked) return;
    // Pick the sound effect and play it
    if (this.state.soundOn) this.playCrackSound(key);
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
        <div
          className="mute-btn"
          onClick={() => this.toggleSound(this.state.soundOn)}
        >
          {!this.state.soundOn && (
            <span className="material-symbols-outlined">volume_off</span>
          )}
          {this.state.soundOn && (
            <span className="material-symbols-outlined">volume_up</span>
          )}
        </div>
        <div className="game-info-bar">
          <p className="game-score">
            <em>Got crawlies:</em>
            <span>{this.state.score}</span>
          </p>
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
          <Modal
            score={this.state.score}
            closeModal={this.closeModal}
            message={this.state.gameOverMessage}
            submessage={this.state.gameOverSubmessage}
          />
        )}
      </div>
    );
  }
}

export default App;
