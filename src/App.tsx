import React from "react";
import "./styles/core.scss";
import RootRoute from "./routes/RootRoute";
import { client } from "apollo/api";
import { ApolloProvider } from "@apollo/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <RootRoute />
    </ApolloProvider>
  );
}

export default App;
