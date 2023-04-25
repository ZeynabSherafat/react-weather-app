import React from "react";
import "./Forecast.css";

export default function Forecast() {
  return (
    <div className="Forecast">
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
      </div>
    </div>
  );
}
