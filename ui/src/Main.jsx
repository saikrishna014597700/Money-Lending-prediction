import React, { Component } from "react";
import Home from "./components/home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import HowWeWork from "./components/howWeWork";
import InputDetails from "./components/inputDetails";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/home" component={Home} />
          <Route path="/howWeWork" component={HowWeWork} />
          <Route path="/inputDetails" component={InputDetails} />
        </div>
      </Router>
    );
  }
}

export default Main;
