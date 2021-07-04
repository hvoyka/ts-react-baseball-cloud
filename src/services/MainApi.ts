import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import StorageService from "./StorageService";

const httpLink = createHttpLink({
  uri: "https://baseballcloud-back.herokuapp.com/api/v1/graphql",
});

const userData = StorageService.getUserData();

const authLink = setContext((_, { headers }) => {
  const token = userData?.token;
  const client = userData?.client;
  const uid = userData?.uid;
  console.log("authLink", userData);
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
