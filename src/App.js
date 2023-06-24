import "./App.css";
import Dice from "./Dice";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import StopWatch from "./stopWatch";
import Linkedin from "./linkedIn.png";
import gitHub from "./icone-github-grise.png";
import gmail from "./icons8-gmail-96.png";

function App() {
  const [dice, setDice] = React.useState(newArrayDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [start, setStart] = React.useState(false);

  function newArrayDice() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return dice;
  }

  React.useEffect(() => {
    checkTenzies();
  }, [dice]);

  function checkTenzies() {
    const firstValue = dice[0].value;
    const isTenzies = dice.every((dice) => dice.value === firstValue);
    const isHeld = dice.every((dice) => dice.isHeld === true);
    if (isTenzies && isHeld) {
      setTenzies(true);
    }
    return isTenzies;
  }

  function rollDice() {
    if (start && tenzies) {
      setDice(newArrayDice());
      setTenzies(false);
      setStart(false);
    }
    if (start === false) {
      setStart(true);
    } else {
      if (!tenzies) {
        const newDice = dice.map((dice) => {
          if (dice.isHeld) {
            return dice;
          } else {
            return {
              ...dice,
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid(),
            };
          }
        });
        setDice(newDice);
      } else {
        setDice(newArrayDice());
        setTenzies(false);
      }
    }
  }

  function holdDice(id) {
    const newDice = dice.map((dice) => {
      if (dice.id === id) {
        return {
          ...dice,
          isHeld: !dice.isHeld,
        };
      } else {
        return dice;
      }
    });

    setDice(newDice);
  }

  const diceElements = dice.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));
  return (
    <main className="App">
      <StopWatch tenzies={tenzies} start={start} />
      <div className="container">
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies Game</h1>
        <p className="text">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="numbers">{diceElements}</div>
        <button className="Roll" onClick={rollDice}>
          {start === false && "Start"}
          {tenzies === false && start && "Roll"}
          {tenzies && start && "New Game"}
        </button>
      </div>
      <footer className="footer">
        <a href="https://www.linkedin.com/in/daleh-alsubaiee" target="_blank">
          <img src={Linkedin} />
        </a>
        <a href="https://github.com/alsubaieedaleh" target="_blank">
          <img src={gitHub} />
        </a>
        <a href="mailto:Alsubaieedaleh@gmail.com" target="_blank">
          <img src={gmail} />
        </a>
      </footer>
    </main>
  );
}

export default App;
