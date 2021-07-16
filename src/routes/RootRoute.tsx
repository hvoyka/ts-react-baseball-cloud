import React from "react";

import { Redirect, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import { ROUTES } from "utils/routes";
import { ForgotPage, LoginPage, ProfilePage, RegistrationPage } from "pages";

const RootRoute = () => {
  return (
    <Switch>
      <AuthRoute component={LoginPage} path={ROUTES.LOGIN} />
      <AuthRoute component={ForgotPage} path={ROUTES.FORGOT_PASSWORD} />
      <AuthRoute component={RegistrationPage} path={ROUTES.REGISTRATION} />
      <PrivateRoute component={ProfilePage} path={ROUTES.PROFILE} exact />
      <Redirect from="*" to={ROUTES.LOGIN} />
    </Switch>
  );
};

export default RootRoute;
