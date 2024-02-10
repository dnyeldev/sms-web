import { ApolloClient, InMemoryCache } from 'apollo-boost'
import axios from 'axios';

const { createUploadLink } = require('apollo-upload-client')
const uri = `${process.env.REACT_APP_BACKEND_API}/graphql`

export const cache = new InMemoryCache()

const link = createUploadLink({
	uri,
	fetch: axios,
	// fetchOptions: { withCredentials: true }
	fetchOptions: { credentials: 'include' }
})

const client = new ApolloClient({
	cache, link
})

export default client