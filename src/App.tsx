import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import ForgotPage from "./pages/ForgotPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/forgotpassword">password</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />;
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
