import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SignIn from "./component/SignUp.js";
import Login from "./component/Login.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={props => <SignIn {...props} />} />
        <Route  path="/login" render={props => <Login {...props} />} />
       
      </div>
    </Router>
  );
}

export default App;
