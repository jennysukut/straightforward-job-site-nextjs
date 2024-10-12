"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://straightforward-job-site-backend-obsy.onrender.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Get the API key from an environment variable
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  return {
    headers: {
      ...headers,
      "X-Api-Key": apiKey,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
