import React from "react";

import { Redirect, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import { ROUTES } from "utils/routes";
import {
  ForgotPage,
  LeaderboardPage,
  LoginPage,
  ProfilePage,
  RegistrationPage,
} from "pages";
import { NetworkPage } from "pages/NetworkPage";

const RootRoute = () => {
  return (
    <Switch>
      <AuthRoute component={LoginPage} path={ROUTES.LOGIN} />
      <AuthRoute component={ForgotPage} path={ROUTES.FORGOT_PASSWORD} />
      <AuthRoute component={RegistrationPage} path={ROUTES.REGISTRATION} />

      <PrivateRoute component={ProfilePage} path={ROUTES.PROFILE_ID()} exact />
      <PrivateRoute component={ProfilePage} path={ROUTES.PROFILE} exact />
      <PrivateRoute
        component={LeaderboardPage}
        path={ROUTES.LEADERBOARD}
        exact
      />
      <PrivateRoute component={NetworkPage} path={ROUTES.NETWORK} exact />

      <Redirect from="*" to={ROUTES.LOGIN} />
    </Switch>
  );
};

export default RootRoute;
