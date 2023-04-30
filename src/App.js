import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
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

  useEffect(() => {
    let mainUrl = `https://api.openweathermap.org/data/2.5/weather?q=karaj&appid=cabdbda40038ba7d1165b953b1c7bd6c&units=metric`;
    axios.get(mainUrl).then(showTemperature);
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=cabdbda40038ba7d1165b953b1c7bd6c&units=metric&q=karaj`;
    axios.get(forecastUrl).then(showForecast);
  }, []);

  function currentlocation(event1) {
    event1.preventDefault();
    function showCurrentLocation(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
      let currentLocationForecastUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      axios.get(currentLocationForecastUrl).then(showTemperature);
      let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`;
      axios.get(forecastUrl).then(showForecast);
    }
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
  }

  function showTemperature(response) {
    setShowCity(response.data.name);
    setShowTemp(response.data.main.temp);
    setShowHumidity(response.data.main.humidity);
    setShowWindSpeed(response.data.wind.speed);
    setShowDescription(response.data.weather[0].description);
    setShowIcon(response.data.weather[0].icon);
  }

  function showForecast(response) {
    let dailyTemperature = response.data.list;
    setDisplayForecast(
      dailyTemperature
        .filter(
          (item, index) =>
            index == 0 ||
            index == 7 ||
            index == 15 ||
            index == 23 ||
            index == 31
        )
        .map(function (minmaxTemp, index1) {
          return (
            <div className="col" key={index1}>
              {Math.round(minmaxTemp.main.temp_min)}° /{" "}
              {Math.round(minmaxTemp.main.temp_max)}°
            </div>
          );
        })
    );
    setDisplayIcons(
      dailyTemperature
        .filter(
          (item, index) =>
            index == 0 ||
            index == 7 ||
            index == 15 ||
            index == 23 ||
            index == 31
        )
        .map(function (icon, index) {
          return (
            <div className="col icons" key={index}>
              <img
                id="forecast-icon"
                src={`https://openweathermap.org/img/wn/${icon.weather[0].icon}@2x.png`}
              />
            </div>
          );
        })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city !== "") {
      let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(url).then(showTemperature);
      let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric&q=${city}`;
      axios.get(forecastUrl).then(showForecast);
    } else {
      alert("Please enter a city! 😄");
    }
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
          <button
            type="button"
            className="btn btn-warning"
            id="current"
            onClick={currentlocation}
          >
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
                    src={`https://openweathermap.org/img/wn/${showIcon}@2x.png`}
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
            href="https://github.com/ZeynabSherafat/react-weather-app"
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
