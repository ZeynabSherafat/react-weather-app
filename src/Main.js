import React from "react";
import "./Main.css";

export default function Main() {
  return (
    <div className="Main">
      <div class="container text-center">
        <div class="row">
          <div class="col-9 left-heading">
            <h1>Karaj</h1>
            <h2>
              <span id="current-day">Sunday </span>,
              <span id="current-time">17:20</span>
            </h2>

            <div class="current-weather">
              <img src="/img/almost-cloudy.png" alt="almost cloudy" />
              <p class="current-weather" id="description">
                Windy with periodic clouds
              </p>
            </div>
          </div>
          <div class="col-3 temperature">
            <div class="current-temperature">
              <span id="the-degree">12°</span>
              <div class="max-min">
                <span id="max">11°</span> /<span id="min">3°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
