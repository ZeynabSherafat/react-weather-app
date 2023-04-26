import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

export default function Form() {
  let [city, setCity] = useState("");
  function showTemperature(response) {
    console.log(response);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    axios.get(url).then(showTemperature);
  }
  function replaceCity(event) {
    setCity(event.target.value);
  }
  return (
    <div className="Form">
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
    </div>
  );
}
