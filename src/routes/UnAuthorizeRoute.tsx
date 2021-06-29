import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { ForgotPage, LoginPage, RegistrationPage } from "pages";
import { ROUTES } from "utils/routes";

const UnAuthorizeRoute: FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPage} />
      <Route path={ROUTES.REGISTRATION} component={RegistrationPage} />
      <Route path="*" component={LoginPage} />
    </Switch>
  );
};

export default UnAuthorizeRoute;
