import React, { Component } from "react";
import axios from "axios";
const host = "http://127.0.0.1:3000";
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
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
        {this.state.posts.map((post, index) => (
          <div
            className="row"
            key={index}
            style={{ borderBottom: "solid", borderColor: "	#DCDCDC" }}
          >
            <div className="col-sm-4">
              <div className="col">
                <div style={{ fontSize: "20px" }}>&#8593;</div>
                <div style={{ fontSize: "20px" }}>{post.users.length}</div>
                <div style={{ fontSize: "20px" }}>&darr;</div>
              </div>
            </div>
            <div className="col-sm-6">{post.title}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
