import React, { useState, useEffect, SetStateAction } from "react";

interface CountdownProps {
  durationMinutes: number;
  calculateTimeLeft: () => void;
  timeLeft: any;
  setTimeLeft: React.Dispatch<React.SetStateAction<any>>;
}

const CountdownTimer: React.FC<CountdownProps> = (props) => {
  const { durationMinutes, calculateTimeLeft, timeLeft, setTimeLeft } = props;

  const zeroPad = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [durationMinutes]);

  return (
    <div className="text-left">
      <p className="text-m">Thời gian còn lại:</p>
      <div className="font-semibold text-xl">
        <span>{zeroPad(timeLeft.minutes)}</span>
        {":"}
        <span>{zeroPad(timeLeft.seconds)}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
