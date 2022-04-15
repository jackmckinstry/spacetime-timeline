import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [bDate, setBDate] = useState("");
  const [h1_Text, setHeading] = useState("Enter your birthday:");
  const [h2_Text, setSubHeading] = useState("");
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
    setHeading(bDate);
    console.log(bDate);
    if (bDate.includes("08-07")) setSubHeading("August 7? That's my birthday!");
    else setSubHeading("");
    event.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={"./moon.png"} className="App-logo" alt="moon" />
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
        </form>
      </body>

      
    </div>
  );
}

export default App;
