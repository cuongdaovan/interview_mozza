import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { Link, NavLink } from "react-router-dom";

const host = "http://127.0.0.1:4000";
const cookies = new Cookies();
const user = { username: cookies.get("username"), email: cookies.get("email") };

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      collapse: false,
      postId: null
    };
  }
  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  };
  componentDidMount() {
    axios
      .get(host + "/api/v1/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        {cookies.get("username") ? (
          <h1>hello {cookies.get("username")}</h1>
        ) : (
          ""
        )}
        {this.state.posts.map((post, index) => (
          <div
            className="row"
            key={index}
            style={{ borderBottom: "solid", borderColor: "#DCDCDC" }}
          >
            <div className="col-sm-6">
              <div className="row">
                <Link
                  exact={true}
                  to={{
                    pathname: "/posts/" + post.id,
                    state: {
                      id: post.id
                    }
                  }}
                  replace
                  rel="noopener noreferrer"
                >
                  {post.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
