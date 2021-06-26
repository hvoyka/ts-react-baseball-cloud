import React from "react";
import "./assets/styles/core.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ForgotPage from "./pages/ForgotPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />;
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
