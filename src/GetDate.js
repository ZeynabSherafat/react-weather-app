import React from "react";
import "./GetDate.css";

export default function GetDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return (
    <div className="GetDate">
      <h2>
        <span id="current-day">{days[now.getDay()]}</span>,
        <span id="current-time">
          {" "}
          {hour}:{minute}
        </span>
      </h2>
    </div>
  );
}
