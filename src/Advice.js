import React, { useState, useEffect } from "react"
import Error from "./Error"
import Divider from "./images/pattern-divider-mobile.svg"
import DividerDesktop from "./images/pattern-divider-desktop.svg"
import Dice from "./images/icon-dice.svg"

const Advice = () => {
    const [error, setError] =  useState(null)
    const [advice, setAdvice] = useState({
        "id": "",
        "advice": ""
      })
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const getAdvice = () => {
      setCount(prev => prev + 1)
      setIsVisible(false)
    }

    useEffect(() => {
      let fetchWorking = true
      if (fetchWorking) {
          fetch("https://api.adviceslip.com/advice")
          .then(res => {
            if (res.ok) {
              return res.json()
            } else {
              throw new Error("error")
            }})
          .then(data => {
            setAdvice(data.slip)
            setIsVisible(true)
          })
          .catch(e => {
            console.error(e)
            setError(true)
          })
      }
      return () => fetchWorking = false
    }, [count])
    
    if (error) return <Error />
    return (
        <div className="advice--container">
            <h1 className="advice--id">
              Advice
              <span className={isVisible ? "visible" : "non-visible"}> #{advice.id}</span>
            </h1>
            <p className={`advice--text ${isVisible ? "visible" : "non-visible"}`}>"{advice.advice}"</p>
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

export default Advice