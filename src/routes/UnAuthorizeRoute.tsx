import React, { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ForgotPage from "../pages/ForgotPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";

const UnAuthorizeRoute: FC<{}> = () => {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/forgot-password">
        <ForgotPage />
      </Route>
      <Route path="/registration">
        <RegistrationPage />
      </Route>
      <Redirect to="/login" />;
    </Switch>
  );
};

export default UnAuthorizeRoute;
