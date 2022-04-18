import React, { useState } from "react";
import './App.css';
import CountUp from 'react-countup';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { IoIosRocket } from 'react-icons/io';
import { FiStar } from 'react-icons/fi';;

function App() {  
  const dateConverter = (startDate, timeEnd) => {
    const newStartDate= new Date(startDate);
    const newEndDate=new Date(timeEnd);
    const one_day = 1000*60*60*24;
    let result
    result = Math.ceil((newEndDate.getTime()-newStartDate.getTime())/(one_day))
    //if (result < 0 ) {return 0}
    return result
  }

  const dateToText = (startDate, timeEnd) => {
    const newStartDate= new Date(startDate);
    const newEndDate=new Date(timeEnd);
    let result = dateConverter(newStartDate, newEndDate);
    let textResponse = "";

    if (timeEnd.getMonth() === 1) textResponse += "January ";
    else if (timeEnd.getMonth() === 2) textResponse += "February ";
    else if (timeEnd.getMonth() === 3) textResponse += "March ";
    else if (timeEnd.getMonth() === 4) textResponse += "April ";
    else if (timeEnd.getMonth() === 5) textResponse += "May ";
    else if (timeEnd.getMonth() === 6) textResponse += "June ";
    else if (timeEnd.getMonth() === 7) textResponse += "July ";
    else if (timeEnd.getMonth() === 8) textResponse += "August ";
    else if (timeEnd.getMonth() === 9) textResponse += "September ";
    else if (timeEnd.getMonth() === 10) textResponse += "October ";
    else if (timeEnd.getMonth() === 11) textResponse += "November ";
    else if (timeEnd.getMonth() === 0) textResponse += "December ";
    
    // issue with dates and years for month of december
    if (timeEnd.getMonth() === 0) textResponse += " " + newEndDate.getFullYear()-1 + ", ";
    else textResponse += " " + newEndDate.getFullYear() + ", ";


    // start date is bdate, end date is date of the event
    if (result > 0) {
      textResponse += "when you were " + Math.round(Math.abs((result/365))) + " years old.";
    }
    else {
      textResponse += Math.round(Math.abs((result/365))) + " years before you were born.";
    }
    return textResponse;
  }


  const [bDate, setBDate] = useState("");
  
  const [h1_Text, setHeading] = useState("Enter your birthday, then scroll:");
  const [h2_Text, setSubHeading] = useState("");
  
  const [moonPhase, setMoonPhase] = useState("");
  const [knownPhase, setPhase] = useState("");

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
    
    var calcMoonPhase = "bruh";
    const newBDate = new Date(bDate);

    var y = newBDate.getFullYear();
    var m = newBDate.getMonth() + 1;
    var d = newBDate.getDate() + 1
    if (m === 1 || m === 2) {
      y--;
      m += 12;
    }

    // find julian date of user's birthday:
    var a = y/100;
    var b = a/4;
    var c = 2-a+b;
    var e = 365.25 * (y+4716);
    var f = 30.6001 * (m+1);
    var jd = c+d+e+f-1524.5;

    var daysSinceNew = (jd - 2415020.500);
    calcMoonPhase = daysSinceNew / 29.53;
    var toSplit = " " + calcMoonPhase;
    const myArray = toSplit.split(".");
    let decimal = myArray[1];
    decimal = "0." + decimal;
    calcMoonPhase = decimal * 29.53;
    var moonPhaseFound = "uh oh";

    if (calcMoonPhase < 2) moonPhaseFound = "New Moon!";
    else if (calcMoonPhase >= 2 && calcMoonPhase < 8) moonPhaseFound = "Waxing Crescent!";
    else if (calcMoonPhase >= 8 && calcMoonPhase < 15) moonPhaseFound = "Waxing Gibbious!";
    else if (calcMoonPhase >= 15 && calcMoonPhase < 17) moonPhaseFound = "Full Moon!";
    else if (calcMoonPhase >= 17 && calcMoonPhase < 23) moonPhaseFound = "Waning Gibbious!";
    else moonPhaseFound = "Waning Crescent!";

    setMoonPhase("When you were born, the moon was in the phase:");
    setPhase(moonPhaseFound);

    const current = new Date();

    setMiles(dateConverter(newBDate, current)*1599048);
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
        
          <br/><br/>
        <h2>
          {milesMsg}
          <CountUp
            start={milesTraveled}
            end={milesTraveled+(22208)}
            duration={1200}
            separator=","
            suffix=" miles"
          ></CountUp>
        </h2>

        <br/><br/>
        <h2>{moonPhase} {knownPhase}</h2>
        
        <br/><br/>
        <h2>{progressMade}</h2>
        
        </form>
        <br/><br/><br/><br/>
          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First (US designed) rocket reaches edge of space</h3>
              <h4 className="vertical-timeline-element-subtitle">WAC Corporal</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1946, 5))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">The first pictures of the Earth were taken from an altitude of 105 km</h3>
              <h4 className="vertical-timeline-element-subtitle">V-2</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1946, 10))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First intercontinental Ballistic Missile (ICBM) developed</h3>
              <h4 className="vertical-timeline-element-subtitle">R-7</h4>
              <h5 className="vertical-timeline-element-subtitle">USSR</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1957, 8))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First artificial satellite launched</h3>
              <h4 className="vertical-timeline-element-subtitle">Sputnik 1</h4>
              <h5 className="vertical-timeline-element-subtitle">USSR</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1957, 10))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First animal (dog named Laika) sent to orbit</h3>
              <h4 className="vertical-timeline-element-subtitle">Sputnik 2</h4>
              <h5 className="vertical-timeline-element-subtitle">USSR</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1957, 11))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First photograph of Earth taken from the orbit (by NASA)</h3>
              <h4 className="vertical-timeline-element-subtitle">Explorer 6</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1959, 8))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First manned flight carrying Yuri Gagarin</h3>
              <h4 className="vertical-timeline-element-subtitle">Vostok 1</h4>
              <h5 className="vertical-timeline-element-subtitle">USSR</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1961, 4))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First orbital solar observatory (by NASA)</h3>
              <h4 className="vertical-timeline-element-subtitle">OSO-1</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1962, 3))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First woman in space (Valentina Tereshkova)</h3>
              <h4 className="vertical-timeline-element-subtitle">Vostok 6</h4>
              <h5 className="vertical-timeline-element-subtitle">USSR</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1963, 6))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First artificial satellite around the Moon</h3>
              <h4 className="vertical-timeline-element-subtitle">Luna 10</h4>
              <h5 className="vertical-timeline-element-subtitle">USSR</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1966, 3))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First piloted orbital mission of Moon (by NASA)</h3>
              <h4 className="vertical-timeline-element-subtitle">Apollo 8</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1968, 12))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First human on the Moon & first space launch from a celestial body (by NASA) - Commander Neil Armstrong and Pilot Buzz Aldrin</h3>
              <h4 className="vertical-timeline-element-subtitle">Apollo 11</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1969, 7))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First space station</h3>
              <h4 className="vertical-timeline-element-subtitle">Salyut 1</h4>
              <h5 className="vertical-timeline-element-subtitle">USSR</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1971, 4))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First human made object sent on escape trajectory away from the Sun</h3>
              <h4 className="vertical-timeline-element-subtitle">Pioneer 10</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1972, 3))}
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First Venus soil samples and sound recording of another world</h3>
              <h4 className="vertical-timeline-element-subtitle">Venera 13</h4>
              <h5 className="vertical-timeline-element-subtitle">USSR</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1982, 3))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First untethered spacewalk, Bruce McCandless II</h3>
              <h4 className="vertical-timeline-element-subtitle">STS-41-B</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1984, 2))}
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First photograph of the whole Solar System - Pale Blue Dot</h3>
              <h4 className="vertical-timeline-element-subtitle">Voyager 1</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1990, 2))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First orbital radio observatory</h3>
              <h4 className="vertical-timeline-element-subtitle">HALCA</h4>
              <h5 className="vertical-timeline-element-subtitle">Japan</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1997, 2))}
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">International Space Station launched</h3>
              <h4 className="vertical-timeline-element-subtitle">ISS</h4>
              <h5 className="vertical-timeline-element-subtitle">NASA, Roscosmos, JAXA, ESA, and CSA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(1998, 11))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First landing on an asteroid</h3>
              <h4 className="vertical-timeline-element-subtitle">NEAR Shoemaker</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(2001, 2))}
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First soft landing on Titan (Moon of Saturn)</h3>
              <h4 className="vertical-timeline-element-subtitle">Cassini Huygens</h4>
              <h5 className="vertical-timeline-element-subtitle">ESA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(2005, 1))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First sample return from comet (81P/Wild)</h3>
              <h4 className="vertical-timeline-element-subtitle">Stardust</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(2006, 1))}
              </p>
            </VerticalTimelineElement>
            
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First space telescope designated to search for Earth-like exoplanets</h3>
              <h4 className="vertical-timeline-element-subtitle">Kepler Mission</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(2009, 3))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First orbit of Mercury</h3>
              <h4 className="vertical-timeline-element-subtitle">MESSENGER</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(2011, 3))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">First manmade probe in interstellar space</h3>
              <h4 className="vertical-timeline-element-subtitle">Voyager 1</h4>
              <h5 className="vertical-timeline-element-subtitle">USA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(2012, 8))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<FiStar/>}
            >
              <h3 className="vertical-timeline-element-title">First man-made probe to make a planned and soft landing on a comet</h3>
              <h4 className="vertical-timeline-element-subtitle">Rosetta</h4>
              <h5 className="vertical-timeline-element-subtitle">ESA</h5>
              <p>
              {dateToText(new Date(bDate), new Date(2014, 11))}
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<IoIosRocket/>}
            >
              <h3 className="vertical-timeline-element-title">Lettuce was the first food eaten that was grown in space</h3>
              <h4 className="vertical-timeline-element-subtitle">ISS</h4>
              <h5 className="vertical-timeline-element-subtitle">USA & Japan</h5>
              <p>
              {dateToText(new Date(bDate), new Date(2015, 8))}
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>

        <br/>
        <p>Site source code: <a href="https://github.com/jackmckinstry/spacetime-timeline" rel="noreferrer">here</a></p>
        <p>Timeline events and dates sourced from <a href="https://www.tutorialspoint.com/fundamentals_of_science_and_technology/space_exploration_timeline.htm" rel="noreferrer">tutorialspoint.com</a></p>
      </body>
    </div>
  );
}

export default App;
