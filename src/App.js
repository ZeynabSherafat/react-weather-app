import React from "react";
import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather />
        <footer className="below">
          <a
            href="https://github.com/ZeynabSherafat/react-weather-app"
            target="_blank"
            rel="noreferrer"
            id="git"
          >
            Open-source code
          </a>{" "}
          by Zeynab Sherafat
        </footer>{" "}
      </div>
    </div>
  );
}
