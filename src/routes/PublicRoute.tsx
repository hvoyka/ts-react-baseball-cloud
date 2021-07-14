import React, { FC } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import StorageService from "services/StorageService";

interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
  restricted: boolean;
}

const PublicRoute: FC<PublicRouteProps> = ({
  component: Component,
  restricted,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        StorageService.isLogin() && restricted ? (
          <Redirect to="/profile" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
