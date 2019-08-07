import { Route, Switch } from "react-router-dom";
import React, { Component, Fragment } from "react";
import Posts from "./views/Post/Posts";
import Post from "./views/Post/Post";
import Login from "./views/Auth/Login";
import Home from "./views/Home/Home";

class Routers extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/posts/:id" component={Post} />
        </Switch>
      </Fragment>
    );
  }
}

export default Routers;
