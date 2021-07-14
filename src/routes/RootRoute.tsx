import React from "react";

import { Redirect, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { ROUTES } from "utils/routes";
import { ForgotPage, LoginPage, ProfilePage, RegistrationPage } from "pages";

const RootRoute = () => {
  return (
    <Switch>
      <PublicRoute
        restricted={true}
        component={LoginPage}
        path={ROUTES.LOGIN}
        exact
      />
      <PublicRoute
        restricted={true}
        component={ForgotPage}
        path={ROUTES.FORGOT_PASSWORD}
        exact
      />
      <PublicRoute
        restricted={true}
        component={RegistrationPage}
        path={ROUTES.REGISTRATION}
        exact
      />
      <PrivateRoute component={ProfilePage} path={ROUTES.PROFILE} exact />
      <Redirect from="*" to="/login" />
    </Switch>
  );
};

export default RootRoute;
