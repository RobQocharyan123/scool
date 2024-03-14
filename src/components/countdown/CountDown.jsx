import React, { useState, useEffect } from "react";
import "./CountDown.css";

let COUNTDOWN_TARGET = new Date("2024-03-15T23:59:59");
    

const getTimeLeft = () => {
	const totalTimeLeft = COUNTDOWN_TARGET - new Date();
	const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
    // const hours = Math.floor((totalTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
	const seconds = Math.floor((totalTimeLeft / 1000) % 60);
    
	return { days, hours, minutes, seconds };
};

export const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());



  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return ()=>{
        clearInterval(timer)
    }
  }, []);



  return (
    <div className="countdown">
      <h2>Ծրագիրը կսկսվի</h2>
      <div className="line"></div>
      <div className="content">

        {Object.entries(timeLeft).map(el=>{
            const label = el[0];
            const value = el[1]
            return (
                <div className="box" key={label}>
                <div className="value">
                  <span>{value}</span>
                <span className="label">{label}</span>

                </div>
      
              </div>
            )
        })}


      

        
      </div>
    </div>
  );
};
