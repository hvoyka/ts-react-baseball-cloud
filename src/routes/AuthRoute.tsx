import React, { FC } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import StorageService from "services/StorageService";
import { ROUTES } from "utils/routes";

interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const AuthRoute: FC<PublicRouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        StorageService.hasAuthToken() ? (
          <Redirect to={ROUTES.PROFILE} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
