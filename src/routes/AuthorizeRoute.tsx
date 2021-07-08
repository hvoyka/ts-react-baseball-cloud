import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProfilePage } from "pages";
import { ROUTES } from "utils/routes";

const AuthorizeRoute = () => {
  return (
    <Switch>
      <Route path={ROUTES.PROFILE} component={ProfilePage} />
      <Route path="*" component={ProfilePage} />
    </Switch>
  );
};

export default AuthorizeRoute;
