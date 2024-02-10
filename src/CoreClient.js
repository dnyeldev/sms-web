import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import ls from 'local-storage';
import _ from 'lodash';
import { onError } from "@apollo/client/link/error";

const uri = `${process.env.REACT_APP_BACKEND_API}/graphql`;
const tokenManager = ls.get('tokenManager');
const idToken = _.has(tokenManager, 'idToken') ? tokenManager.idToken : null;

export const cache = new InMemoryCache({
  cacheRedirects: {
    // avoid requesting the same data that already in the client that has different key
    Query: {
      // getAvpFile: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'AVPFile', uid: args.uid })),
      // getTutorialVideo: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'TutorialVideo', uid: args.uid })),
    },
  },
});

const headers = {
  authorization: idToken ? `Bearer ${idToken}` : '',
};

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.log({ err })
      // switch (err.extensions.code) {
      //   // Apollo Server sets code to UNAUTHENTICATED
      //   // when an AuthenticationError is thrown in a resolver
      //   case "UNAUTHENTICATED":
      //     // Modify the operation context with a new token
      //     const oldHeaders = operation.getContext().headers;
      //     operation.setContext({
      //       headers: {
      //         ...oldHeaders,
      //         authorization: getNewToken(),
      //       },
      //     });
      //     // Retry the request, returning the new observable
      //     return forward(operation);
      // }
    }
  }

  // To retry on network errors, we recommend the RetryLink
  // instead of the onError link. This just logs the error.
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// eslint-disable-next-line new-cap
const link = new createUploadLink({
  uri,
  headers,
  fetch,
  fetchOptions: { credentials: 'include' }
});

const client = new ApolloClient({
  cache,
  link
});

export default client;
