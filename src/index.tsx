import React from 'react'
import { render } from 'react-dom'
import './index.scss'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { store } from './redux'
import { Provider } from 'react-redux'

const httpLink = createHttpLink({
  uri: 'http://192.168.0.104:3001/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const accessToken = localStorage.getItem('accessToken')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
