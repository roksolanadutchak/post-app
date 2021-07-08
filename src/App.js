import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import GetUser from "./Components/GetUser";
import GetPosts from "./Components/GetPosts";

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache()
});
function App() {
  return <ApolloProvider client={client}>
    {" "}
    <GetUser />
    <GetPosts />
  </ApolloProvider>
}

export default App;