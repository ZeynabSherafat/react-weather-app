import React, { useState } from "react";
import axios from "axios";
import GetDate from "./GetDate";
import "./Weather.css";

export default function Weather() {
  function getWeekDaysFromToday() {
    let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return week.concat(week.splice(0, new Date().getDay()));
  }

  const [on, setOn] = useState(false);
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({});
  let [displayForecast, setDisplayForecast] = useState("");
  let [displayIcons, setDisplayIcons] = useState("");

  function currentlocation(event1) {
    event1.preventDefault();
    function showCurrentLocation(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
      let currentLocationForecastUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      axios.get(currentLocationForecastUrl).then(showTemperature);
      let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`;
      axios.get(forecastUrl).then(showForecast);
    }
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
  }

  function showTemperature(response) {
    setWeather({
      city: response.data.name,
      temp: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    });

    setOn(true);
  }

  function showForecast(response) {
    let dailyTemperature = response.data.list;
    setDisplayForecast(
      dailyTemperature
        .filter(
          (item, index) =>
            index === 0 ||
            index === 7 ||
            index === 15 ||
            index === 23 ||
            index === 31
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
            index === 0 ||
            index === 7 ||
            index === 15 ||
            index === 23 ||
            index === 31
        )
        .map(function (icon, index) {
          return (
            <div className="col icons" key={index}>
              <img
                alt="icons"
                id="forecast-icon"
                src={`https://openweathermap.org/img/wn/${icon.weather[0].icon}@2x.png`}
              />
            </div>
          );
        })
    );
    setOn(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city !== "") {
      let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
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
  if (on === true) {
    return (
      <div className="Weather">
        <div className="box">
          <form id="form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a city"
              autoFocus="on"
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
                <h1>{weather.city}</h1>
                <GetDate />
                <div className="current-weather">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt="almost cloudy"
                  />
                  <p className="current-weather">{weather.description}</p>
                </div>
              </div>
              <div className="col-3 temperature">
                <div className="current-temperature">
                  <span>{Math.round(weather.temp)}°</span>
                  <div id="windspeed">
                    Windspeed: {Math.round(weather.wind)} km/h
                  </div>
                  <div id="humidity">Humidity: {weather.humidity}%</div>
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
                .map((day, index) => (
                  <div className="col" key={index}>
                    {day}
                  </div>
                ))}
            </div>
            <div className="row">{displayIcons}</div>
            <div className="row numbers">{displayForecast}</div>
          </div>{" "}
        </div>
      </div>
    );
  } else {
    let mainUrl = `https://api.openweathermap.org/data/2.5/weather?q=karaj&appid=535cacbb3f8a0df0aeb4790235b9541f&units=metric`;
    axios.get(mainUrl).then(showTemperature);
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=535cacbb3f8a0df0aeb4790235b9541f&units=metric&q=karaj`;
    axios.get(forecastUrl).then(showForecast);
    return "Loading...";
  }
}
