import React, { useEffect, useState } from "react";

import AuthorizeRoute from "./AuthorizeRoute";
import UnAuthorizeRoute from "./UnAuthorizeRoute";
import StorageService from "services/StorageService";
import TokenContext from "context/tokenContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "services/MainApi";

const RootRoute = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const data = StorageService.getUserData();
    if (data) {
      setToken(data.token);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <TokenContext.Provider value={{ token, setToken }}>
        {token ? <AuthorizeRoute /> : <UnAuthorizeRoute />}
      </TokenContext.Provider>
    </ApolloProvider>
  );
};

export default RootRoute;
