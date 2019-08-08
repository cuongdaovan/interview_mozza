import React, { Component, isValidElement } from "react";
import "../../css/login.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const host = "https://voteinterview.herokuapp.com";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      email: "",
      password: "",
      err: ""
    };
  }
  onEmailChange = e => {
    if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    }
  };
  onPasswordChange = e => {
    if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
  };
  onSubmit = async e => {
    e.preventDefault();
    var email = this.state.email;
    var password = this.state.password;
    axios({
      url: host + "/api/v1/login",
      method: "POST",
      data: { email: email, password: password },
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          if (res.data.access_token) {
            cookies.set("access_token", res.data.access_token, { path: "/" });
          }
          if (res.data.username) {
            cookies.set("username", res.data.username, { path: "/" });
          }
          if (res.data.email) {
            cookies.set("email", res.data.email, { path: "/" });
          }
          if (res.data.userId) {
            cookies.set("userId", res.data.userId, { path: "/" });
          }
          this.props.history.push("/posts");
        }
      })
      .catch(err => {
        this.setState({ err: "email or password wrong" });
      });
    // this.props.history.push("/insert-job");
  };
  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img
              src="https://img.icons8.com/material/24/000000/enter-2--v1.png"
              id="icon"
              alt="User Icon"
              style={{ width: "10%" }}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              id="login"
              className="fadeIn second"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.onEmailChange}
              required
            />
            <input
              type="password"
              id="password"
              //   className="fadeIn third"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              required
            />
            <p>{this.state.err}</p>
            <input type="submit" value="Log In" />
          </form>
          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
