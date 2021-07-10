import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import StorageService from "../services/StorageService";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const userData = StorageService.getUserData();

const authLink = setContext((_, { headers }) => {
  const token = userData?.token;
  const client = userData?.client;
  const uid = userData?.uid;

  return {
    headers: {
      ...headers,
      "access-token": token ? token : "",
      client: client,
      uid: uid,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
