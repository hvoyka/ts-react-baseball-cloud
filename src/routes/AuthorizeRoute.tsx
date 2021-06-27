import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";

const AuthorizeRoute = () => {
  return (
    <Switch>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Redirect to="/profile" />;
    </Switch>
  );
};

export default AuthorizeRoute;
