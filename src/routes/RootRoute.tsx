import React, { useEffect, useState } from "react";

import AuthorizeRoute from "./AuthorizeRoute";
import UnAuthorizeRoute from "./UnAuthorizeRoute";
import StorageService from "services/StorageService";
import TokenContext from "context/tokenContext";

const RootRoute = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const data = StorageService.getUserData();
    if (data) {
      setToken(data.token);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {token ? <AuthorizeRoute /> : <UnAuthorizeRoute />}
    </TokenContext.Provider>
  );
};

export default RootRoute;
