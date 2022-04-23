import React, { useState, useEffect } from "react";

const WatchInterface = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [interval, fixInterval] = useState(0);
  const [flag, setFlag] = useState(null);
  const [laps, setLaps] = useState([]);
  const [lapCount, setLapCount] = useState(0);
  const [extra, setExtra] = useState({ extraM: 0, extraS: 0, extraH: 0 });

  useEffect(() => {
    incrementCheck();
    extraZero();
  }, [milliseconds]);

  function incrementCheck() {
    if (milliseconds === 1000) {
      setMilliseconds(0);
      setSeconds((x) => x + 1);
    }
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((x) => x + 1);
    }
    if (minutes === 60) {
      setMinutes(0);
      setHours((x) => x + 1);
    }
  }
  function extraZero() {
    seconds < 10
      ? setExtra((prevState) => ({ ...prevState, extraS: 0 }))
      : setExtra((prevState) => ({ extraS: null }));
    minutes < 10
      ? setExtra((prevState) => ({ ...prevState, extraM: 0 }))
      : setExtra((prevState) => ({ ...prevState, extraM: null }));
    hours < 10
      ? setExtra((prevState) => ({ ...prevState, extraH: 0 }))
      : setExtra((prevState) => ({ ...prevState, extraH: null }));
  }

  function Start() {
    let ID = setInterval(() => {
      setMilliseconds((x) => x + 100);
      setFlag(true);
      console.log("It has Started");
    }, 100);
    fixInterval(ID);
  }

  function Stop() {
    console.log("It has Stopped");
    setFlag(false);
    clearInterval(interval);
  }

  function Reset() {
    console.log("Timer has been Reset");
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    clearInterval(interval);
    setFlag(false);
    setLaps([]);
    setLapCount(0);
    fixInterval(0);
  }

  function addLaps() {
    setLapCount((x) => x + 1);
    var lap = `Lap-${lapCount} --------------- Time = ${hours} Hours : ${minutes} Minutes : ${seconds} Seconds`;
    setLaps([...laps, lap]);
  }

  return (
    <div className="complete-interface">
      <div className="watch-interface">
        {/* <span className="millseconds-p">{milliseconds}</span> */}
        <h1>
          <span className="hours-span">
            {extra.extraH}
            {hours}
          </span>{" "}
          :{" "}
          <span className="minutes-span">
            {extra.extraM}
            {minutes}
          </span>{" "}
          :{" "}
          <span className="seconds-span">
            {extra.extraS}
            {seconds}
            <sub className="millseconds-sup">{milliseconds}</sub>
          </span>
        </h1>
      </div>
      <div className="buttons-container">
        <button
          id="start"
          className="button-start"
          onClick={Start}
          disabled={flag}
        >
          Start
        </button>
        <button className="button-stop" onClick={Stop}>
          Stop
        </button>
        <button className="button-reset" onClick={Reset}>
          Reset
        </button>
        <button className="button-lap" onClick={addLaps} disabled={!flag}>
          Lap
        </button>
      </div>
      <div className="laps-div">
        <ul className="laps-list">
          {laps.length > 0 && laps.map((x) => <li>{x}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default WatchInterface;
