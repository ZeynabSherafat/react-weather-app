import React from "react";
import "./Form.css";

export default function Form() {
  return (
    <div className="Form">
      <form id="form">
        <input
          type="text"
          class="form-control"
          placeholder="Enter the city"
          id="city"
        />{" "}
        <input type="submit" class="btn btn-primary" value="Search" />
      </form>
      <button type="button" class="btn btn-warning" id="current">
        Current
      </button>
    </div>
  );
}
