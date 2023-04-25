import "./App.css";
import Form from "./Form";
import Main from "./Main";
import Forecast from "./Forecast";
import Source from "./Source";
export default function App() {
  return (
    <div className="App">
      {" "}
      <div className="container">
        <div className="box">
          <Form />
          <br />
          <Main />
          <br />
          <Forecast />
        </div>
        <Source />
      </div>
    </div>
  );
}
