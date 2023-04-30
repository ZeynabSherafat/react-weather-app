import React, { useState } from "react";
import "./App.css";
import axios from "axios";
export default function App() {
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
  function getWeekDaysFromToday() {
    let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return week.concat(week.splice(0, new Date().getDay()));
  }

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let [city, setCity] = useState("");
  let [showCity, setShowCity] = useState("");
  let [showTemp, setShowTemp] = useState("");
  let [showHumidity, setShowHumidity] = useState("");
  let [showWindSpeed, setShowWindSpeed] = useState("");
  let [showDescription, setShowDescription] = useState("");
  let [showIcon, setShowIcon] = useState("");
  let [displayForecast, setDisplayForecast] = useState("");
  let [displayIcons, setDisplayIcons] = useState("");

  function showTemperature(response) {
    setShowCity(response.data.city);
    setShowTemp(response.data.temperature.current);
    setShowHumidity(response.data.temperature.humidity);
    setShowWindSpeed(response.data.wind.speed);
    setShowDescription(response.data.condition.description);
    setShowIcon(response.data.condition.icon);
  }

  function showForecast(response) {
    console.log(response);

    let dailyTemperature = response.data.daily;
    setDisplayForecast(
      dailyTemperature
        .filter((item, index) => index < 5)
        .map(function (minmaxTemp, index) {
          return (
            <div className="col" key={index}>
              {Math.round(minmaxTemp.temperature.minimum)}° /{" "}
              {Math.round(minmaxTemp.temperature.maximum)}°
            </div>
          );
        })
    );
    setDisplayIcons(
      dailyTemperature
        .filter((item, index) => index < 5)
        .map(function (icon, index) {
          return (
            <div className="col icons" key={index}>
              <img
                src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon.condition.icon}.png`}
              />
            </div>
          );
        })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "43481de94f2308f8b87ao0b4t918ca5a";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(url).then(showTemperature);
    let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(forecastUrl).then(showForecast);
  }
  function replaceCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="App">
      {" "}
      <div className="container">
        <div className="box">
          <form id="form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a city"
              id="city"
              onChange={replaceCity}
            />{" "}
            <input type="submit" className="btn btn-primary" value="Search" />
          </form>
          <button type="button" className="btn btn-warning" id="current">
            Current
          </button>
          <br />
          <div className="container text-center">
            <div className="row">
              <div className="col-9 left-heading">
                <h1>{showCity}</h1>
                <h2>
                  <span id="current-day">{days[now.getDay()]}</span>,
                  <span id="current-time">
                    {" "}
                    {hour}:{minute}
                  </span>
                </h2>
                <div className="current-weather">
                  <img
                    src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${showIcon}.png`}
                    alt="almost cloudy"
                  />
                  <p className="current-weather" id="description">
                    {showDescription}
                  </p>
                </div>
              </div>
              <div className="col-3 temperature">
                <div className="current-temperature">
                  <span id="the-degree">{Math.round(showTemp)}°</span>
                  <div id="windspeed">
                    Windspeed: {Math.round(showWindSpeed)} km/h
                  </div>
                  <div id="humidity">Humidity: {showHumidity}%</div>
                </div>
              </div>
            </div>
          </div>{" "}
          <br />
          <p className="days">Days</p>
          <hr />
          <div className="container text-center">
            <div className="row week">
              {getWeekDaysFromToday()
                .filter((item, index) => index < 6)
                .splice(1)
                .map((day) => (
                  <div className="col">{day}</div>
                ))}
            </div>
            <div className="row">{displayIcons}</div>
            <div className="row numbers">{displayForecast}</div>
          </div>{" "}
        </div>
        <p className="below">
          <a
            href="https://github.com/ZeynabSherafat/my-weather-app"
            target="_blank"
            rel="noreferrer"
            id="git"
          >
            Open-source code
          </a>{" "}
          by Zeynab Sherafat
        </p>{" "}
      </div>
    </div>
  );
}
