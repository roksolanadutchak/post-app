import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import GetPosts from "./Components/GetPosts";
import Home from "./Components/Home";
import Header from "./Components/Header";
import AddPost from "./Components/AddPost";
import EditPost from "./Components/EditPost";


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
            <Route path="/edit/:id">
              <EditPost />
            </Route>
          </Switch>
        </div>
      </div>
  )
}

export default App;
