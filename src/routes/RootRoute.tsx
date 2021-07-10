import React from "react";

import AuthorizeRoute from "./AuthorizeRoute";
import UnAuthorizeRoute from "./UnAuthorizeRoute";
import StorageService from "services/StorageService";

const RootRoute = () => {
  const userData = StorageService.getUserData();

  return userData?.token ? <AuthorizeRoute /> : <UnAuthorizeRoute />;
};

export default RootRoute;
