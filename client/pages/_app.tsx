import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Router from "next/router";

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED") {
        Router.replace("/login");
      }
    }
  }
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  link: from([errorLink, httpLink]),
  connectToDevTools: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
