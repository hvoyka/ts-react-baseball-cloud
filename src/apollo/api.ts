import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import StorageService from "../services/StorageService";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const userData = StorageService.getUserData();
  const { token, client, uid } = userData || {};

  return {
    headers: {
      ...headers,
      "access-token": token || "",
      client,
      uid,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
