import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Grocery from "./components/grocery"; // Import the Grocery component
import LandingPage from "./LandingPage/landingPage";
import Signup from "./screens/signUp";
import Login from "./screens/login";
import PrivateRoute from "./privateRoute";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          {/* <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}

          {/* Other routes here... */}
          <PrivateRoute path="/item" component={Grocery} />
        </Switch>
      </Router>
    );
  }
}

export default App;
