import React from "react";
import Divider from "./images/pattern-divider-mobile.svg";
import DividerDesktop from "./images/pattern-divider-desktop.svg";
import Dice from "./images/icon-dice.svg";

function Advice() {
    const [advice, setAdvice] = React.useState({
        "id": "",
        "advice": ""
      });
    
    const [count, setCount] = React.useState(0);

    function getAdvice() {
      setCount(prevCount => prevCount + 1);
    }

    React.useEffect(() => {
      fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then(adviceData => setAdvice(adviceData.slip))
      }, [count])
    
    return (
        <div className="advice--container">
            <h1 className="advice--id">Advice #{advice.id}</h1>
            <p className="advice--text">"{advice.advice}"</p>
            <picture>
              <source media="(min-width: 600px)" srcSet={DividerDesktop}/>
              <img src={Divider} alt="pattern divider" className="advice--divider"/>
            </picture>
            <div className="advice--button" onClick={getAdvice}>
            <img src={Dice} alt="icon dice" className="advice--dice" />
            </div>
        </div>
    )
}

export default Advice;