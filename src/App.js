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
  let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  function showTemperature(response) {
    console.log(response);
    showCity = "Karaj";
    setShowCity(response.data.name);
    setShowTemp(response.data.main.temp);
    setShowHumidity(response.data.main.humidity);
    setShowWindSpeed(response.data.wind.speed);
    setShowDescription(response.data.weather[0].description);
    setShowIcon(response.data.weather[0].icon);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
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
              class="form-control"
              placeholder="Enter a city"
              id="city"
              onChange={replaceCity}
            />{" "}
            <input type="submit" class="btn btn-primary" value="Search" />
          </form>
          <button type="button" class="btn btn-warning" id="current">
            Current
          </button>
          <br />
          <div class="container text-center">
            <div class="row">
              <div class="col-9 left-heading">
                <h1>{showCity}</h1>
                <h2>
                  <span id="current-day">{days[now.getDay()]}</span>,
                  <span id="current-time">
                    {" "}
                    {hour}:{minute}
                  </span>
                </h2>
                <div class="current-weather">
                  <img
                    src={`https://openweathermap.org/img/wn/${showIcon}@2x.png`}
                    alt="almost cloudy"
                  />
                  <p class="current-weather" id="description">
                    {showDescription}
                  </p>
                </div>
              </div>
              <div class="col-3 temperature">
                <div class="current-temperature">
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
          <p class="days">Days</p>
          <hr />
          <div class="container text-center">
            <div class="row week">
              <div class="col">Sat</div>
              <div class="col">Sun</div>
              <div class="col">Mon</div>
              <div class="col">Tue</div>
              <div class="col">Wed</div>
            </div>
            <div class="row">
              <div class="col">
                <img src="/img/cloudy.png" alt="cloudy" />
              </div>
              <div class="col">
                <img src="/img/cloudy.png" alt="cloudy" />
              </div>
              <div class="col">
                <img src="/img/sunny.png" alt="Sunny" />
              </div>
              <div class="col">
                <img src="/img/cloudy.png" alt="cloudy" />
              </div>
              <div class="col">
                <img src="/img/cloudy.png" alt="cloudy" />
              </div>
            </div>
            <div class="row numbers">
              <div class="col">11° / 3°</div>
              <div class="col">11° / 2°</div>
              <div class="col">12° / 2°</div>
              <div class="col">11° / 2°</div>
              <div class="col">8° / 1°</div>
            </div>
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
