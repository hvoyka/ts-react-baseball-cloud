import React from "react";

import AuthorizeRoute from "./AuthorizeRoute";
import UnAuthorizeRoute from "./UnAuthorizeRoute";
import StorageService from "services/StorageService";
import { userDataVar } from "services/cache";
import { useReactiveVar } from "@apollo/client";

const RootRoute = () => {
  const userStateData = useReactiveVar(userDataVar);
  const userStorageData = StorageService.getUserData();

  if (!userStateData.token && userStorageData) {
    userDataVar(userStorageData);
  }

  return userStateData.token ? <AuthorizeRoute /> : <UnAuthorizeRoute />;
};

export default RootRoute;
