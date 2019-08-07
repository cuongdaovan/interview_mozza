import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Collapse, Button, CardBody, Card } from "reactstrap";

const host = "http://127.0.0.1:4000";
const cookies = new Cookies();
const user = { username: cookies.get("username"), email: cookies.get("email") };
const userId = cookies.get("userId");
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      voted: "secondary"
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
      }
      if (res.status === 409) {
        console.log(res.data);
      }
    });
  };
  render() {
    return (
      <div className="row">
        <div className="col-sm-2">
          <div className="col">
            {this.state.post ? (
              this.state.post.users.filter(u => u.email === user.email).length >
              0 ? (
                <Button color="primary" onClick={this.voteUp}>
                  {" "}
                  &#8593;
                </Button>
              ) : (
                <Button color={this.state.voted} onClick={this.voteUp}>
                  {" "}
                  &#8593;
                </Button>
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
            <div>{this.state.post ? this.state.post.title : ""}</div>
            <hr />
            <div>{this.state.post ? this.state.post.content : ""}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
