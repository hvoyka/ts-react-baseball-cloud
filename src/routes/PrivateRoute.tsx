import React, { FC } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import StorageService from "services/StorageService";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        StorageService.isLogin() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
