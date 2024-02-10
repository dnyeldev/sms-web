import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
// import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { RetryLink } from 'apollo-link-retry'
// import { onError } from 'apollo-link-error'

import AuthStore from './pages/Login/store'

const CAN_OFFLINE = JSON.parse(process.env.REACT_APP_CAN_OFFLINE)

// attached extra headers when requesting through graphql
const request = new ApolloLink((operation, forward) => {
	let headers = {
		'Access-Control-Allow-Credentials': true
	}
	let token = AuthStore.token
	
	if (token)
		headers.Authorization = `Bearer ${token}`

	

	// add the authorization to the headers
	operation.setContext({
		headers
	})

	return forward(operation)
})

// target graphql endpoint
const uploadLink = createUploadLink({
	uri: `${process.env.REACT_APP_BACKEND_API}/graphql`
})

// allow subscription io.socket
const wsLink = new WebSocketLink({
	uri: `${process.env.REACT_APP_WEBSOCKET_API}/subscriptions`,
	credentials: 'same-origin',
	options: {
		reconnect: true
	},
})

// const error = onError(({ graphQLErrors, networkError }) => {
// 	console.log({ graphQLErrors, networkError })
// 	if (graphQLErrors)
// 		graphQLErrors.map(({ message, locations, path }) =>
// 			console.log(
// 				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
// 			),
// 		)

// 	if (networkError) console.log(`[Network error]: ${networkError}`)
// })

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	// httpLink,
	uploadLink
)

export const cache = new InMemoryCache({
	dataIdFromObject: object => object.key || null, // avoiding merging of of two seperate data with the same id
	// improving speed performance
	cacheRedirects: {
		// avoid requesting the same data that already in the client that has different key
		Query: {
			// section: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Section', uid: args.uid })),
			// students: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Student', uid: args.uid })),
		},
	},
}).restore(window.__APOLLO_STATE__)

// persistent request when offline until the server is back to online again
const retry = new RetryLink({ attempts: { max: Infinity } })
const link_merge = CAN_OFFLINE ? concat(request, retry, link) : concat(request, link)
// @Note: disable retry until fix the issue
// const link_merge = concat(request, link)

// compile apollo client
const client = new ApolloClient({
	link: link_merge,
	cache,
	shouldBatch: true,
	onError: (error) => {
		console.log({ error })
		// return handleAuthError(error)
	}
})

export default client
