import React from "react";

interface Context {
  token?: string;
  setToken?: any;
}

const TokenContext = React.createContext<Context>({});

export default TokenContext;
