import "./App.css";
import Form from "./Form";

export default function App() {
  return (
    <div className="App">
      {" "}
      <div className="container">
        <div className="box">
          <Form />
          <br />
          <div class="container text-center">
            <div class="row">
              <div class="col-9 left-heading">
                <h1></h1>
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
