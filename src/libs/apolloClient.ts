import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-sa-east-1.hygraph.com/v2/cl69a3ryadg4201t717rlh7gn/master",
  cache: new InMemoryCache(),
});
