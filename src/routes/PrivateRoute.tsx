import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import StorageService from "services/StorageService";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  console.log("private", StorageService.isLogin);
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
