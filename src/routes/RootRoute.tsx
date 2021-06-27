import React, { useEffect, useState } from "react";

import AuthorizeRoute from "./AuthorizeRoute";
import StorageService from "../services/StorageService";
import UnAuthorizeRoute from "./UnAuthorizeRoute";
import TokenContext from "../context/tokenContext";

const RootRoute = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const data = StorageService.getData();
    if (data) {
      setToken(data.token);
    }
  }, []);

  console.log("Root ", token);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {token ? <AuthorizeRoute /> : <UnAuthorizeRoute />}
    </TokenContext.Provider>
  );
};

export default RootRoute;
