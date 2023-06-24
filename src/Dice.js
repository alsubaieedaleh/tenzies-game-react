import React from "react";

export default function Dice(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="box" style={style} onClick={props.holdDice}>
      <h1> {props.value}</h1>
    </div>
  );
}
