import React, { useState } from "react";
import Timer from "./Timer";

function StopWatch(props) {
  const [isPaused, setIsPaused] = useState(!props.start);
  const [time, setTime] = useState(0);

  React.useEffect(() => {
    setIsPaused(!props.start);
    // setTime(0);
    if (props.start && !props.tenzies) {
      setTime(0);
    }
    if (props.tenzies && props.start) {
      handlePauseResume();
    }
  }, [props.tenzies, props.start]);

  React.useEffect(() => {
    let interval = null;

    if (isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPaused]);

  const handleStart = () => {
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="stop-watch">
      <Timer time={time} />
    </div>
  );
}

export default StopWatch;
