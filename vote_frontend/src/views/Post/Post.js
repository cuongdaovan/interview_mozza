import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Header from "../Common/Header";
import Popup from "../Common/Popup";

const host = "http://127.0.0.1:4000";
const cookies = new Cookies();
const user = {
  username: cookies.get("username") ? cookies.get("username") : null,
  email: cookies.get("email") ? cookies.get("email") : null
};
const userId = cookies.get("userId") ? cookies.get("userId") : null;
const access_token = cookies.get("access_token")
  ? cookies.get("access_token")
  : null;
const permission = access_token !== null ? true : false;
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      voted: null
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(host + "/api/v1/posts/" + id)
      .then(res => {
        this.setState({ post: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  voteUp = e => {
    const { id } = this.props.match.params;
    axios({
      url: host + "/api/v1/uservote",
      method: "POST",
      data: { userId: parseInt(userId), postId: parseInt(id) },
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      if (res.status === 201) {
        this.setState({ voted: "primary" });
        axios
          .get(host + "/api/v1/posts/" + id)
          .then(res => {
            this.setState({ post: res.data });
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (res.status === 409) {
        console.log(res.data);
      }
    });
  };
  render() {
    return (
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-sm-2">
            <div className="col">
              {this.state.post ? (
                this.state.post.users.filter(u => u.email === user.email)
                  .length > 0 ? (
                  <Popup
                    permission={permission}
                    buttonLabel="&#8593;"
                    color={this.state.voted || "primary"}
                  />
                ) : (
                  <Popup
                    permission={permission}
                    buttonLabel="&#8593;"
                    color={this.state.voted}
                  />
                )
              ) : (
                ""
              )}

              <div style={{ fontSize: "20px" }}>
                {this.state.post ? this.state.post.users.length : null}
              </div>
              <Button color="secondary">&darr;</Button>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="col">
              <div>
                {this.state.post ? <h1>{this.state.post.title}</h1> : ""}
              </div>
              <hr />
              <div>{this.state.post ? this.state.post.content : ""}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
