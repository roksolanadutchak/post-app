import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import GetUser from "./Components/GetUser";
import GetPosts from "./Components/GetPosts";
import Home from "./Components/Home";
import Header from "./Components/Header";
import AddPost from "./Components/AddPost";

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache()
});
function App() {
  return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/posts">
              <GetPosts />
            </Route>
            <Route path="/add">
              <AddPost />
            </Route>
          </Switch>
        </div>
      </div>
  )
}

export default App;
