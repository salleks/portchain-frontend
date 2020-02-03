import React                from 'react'
import './App.css'
import './assets/index.css'
import ApplicationDashboard from './application/ApplicationDashboard'
import {InMemoryCache}      from 'apollo-cache-inmemory'
import {createHttpLink}     from 'apollo-link-http'
import ApolloClient         from 'apollo-client'
import {
  ApolloProvider
} from '@apollo/react-hooks'

const cache = new InMemoryCache()

const link = createHttpLink({
  uri: 'https://challenge-wexxs2.herokuapp.com/',
 // uri: 'http://localhost:4000',
  credentials: 'include'
})

const client = new ApolloClient({
  cache,
  link
})

const App : React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ApplicationDashboard/>
    </ApolloProvider>
  )
}

export default App
