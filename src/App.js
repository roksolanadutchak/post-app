import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import GetPosts from "./Components/GetPosts";
import Home from "./Components/Home";
import Header from "./Components/Header";
import AddEditPost from "./Components/EditPost";
import UsersList from "./Components/UsersList";
import User from "./Components/User";


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
              <AddEditPost />
            </Route>
            <Route path="/edit/:id">
              <AddEditPost />
            </Route>
            <Route path="/users">
              <UsersList />
            </Route>
            <Route path="/user/:id">
              <User />
            </Route>
          </Switch>
        </div>
      </div>
  )
}

export default App;
