import React, { Component } from "react";
import Header from "../Common/Header";
import { Spinner } from "reactstrap";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div>
          <Spinner color="primary" />
          <Spinner color="secondary" />
          <Spinner color="success" />
          <Spinner color="danger" />
          <Spinner color="warning" />
          <Spinner color="info" />
          <Spinner color="light" />
          <Spinner color="dark" />
        </div>
      </div>
    );
  }
}

export default Home;
