import React, { useEffect, useState, Componenet } from "react";
import './App.css';
import CountUp from 'react-countup';

function App() {  
  const dateConverter = (startDate, timeEnd) => {
    const newStartDate= new Date(startDate);
    const newEndDate=new Date(timeEnd);
    const one_day = 1000*60*60*24;
    let result
    result = Math.ceil((newEndDate.getTime()-newStartDate.getTime())/(one_day))
    console.log('date Converter result', result)
    if (result < 0 ) {return 0}
    return result
  }


  const [bDate, setBDate] = useState("");
  
  const [h1_Text, setHeading] = useState("Enter your birthday:");
  const [h2_Text, setSubHeading] = useState("");
  
  const [moonPhase, setMoonPhase] = useState("");
  const [milesTraveled, setMiles] = useState("");
  const [milesMsg, setMilesMsg] = useState("");
  const [progressMade, setProgressMade] = useState("");
  
  const [isMousedOver, setMouseOver] = useState(false);

  function handle_change(event) {
    setBDate(event.target.value);
    console.log(event.target.value);
    // console.log(event);
    // console.log(event.target.type);
    // console.log(event.target.placeholder);
  }

  function handleMouseOver() {
    setMouseOver(!isMousedOver);
  }

  function handle_click(event) {
    // setHeading(bDate);
    console.log(bDate);
    
    setMoonPhase("When you were born, the moon was in the phase:");
    
    const current = new Date();

    setMiles(dateConverter(bDate, current)*1599048);
    setMilesMsg("Since birth, you've traveled around the sun: ");

    setProgressMade("A lot of progress has been made in space exploration and scientific discovery since you’ve been on this planet (and prior!)...");

    // easter egg
    if (bDate.includes("08-07")) setSubHeading("August 7? That's my birthday!");
    else setSubHeading("");
    event.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={require("./moon.png")} className="App-logo" alt="moon" />
        <h1>Spacetime Timeline</h1>
      </header>

      <body>
        <h1> {h1_Text} </h1>
        <h3> {h2_Text} </h3>
        <form onSubmit={handle_click}>
          <input
            onChange={handle_change}
            type="date"
            placeholder="What's your birthday?"
            value={bDate}
          />
          <button
            style={{ backgroundColor: isMousedOver ? "Aqua" : "white" }}
            type="submit"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOver}
          >
            Submit
          </button>
        
        <h2>
          {milesMsg}
          <CountUp
            start={milesTraveled}
            end={milesTraveled+(5552.25)}
            duration={300}
            separator=","
            suffix=" miles"
          ></CountUp>
        </h2>


        <h2>{moonPhase}</h2>
        
        <h2>{progressMade}</h2>
        
        </form>
        <p>Source code: <a href="https://github.com/jackmckinstry/spacetime-timeline" rel="noreferrer">here</a></p>
      </body>

      
    </div>
  );
}

export default App;
