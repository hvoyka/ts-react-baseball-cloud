import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";
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

export const GET_USER_DATA = gql`
  query getUserData {
    token @client
    client @client
    uid @client
  }
`;

client.writeQuery({
  query: GET_USER_DATA,
  data: {
    token: userData?.token,
    client: userData?.client,
    uid: userData?.uid,
  },
});
