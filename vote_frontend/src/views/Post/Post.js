import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, NavLink } from "reactstrap";
import Header from "../Common/Header";
import Popup from "../Common/Popup";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const host = "https://voteinterview.herokuapp.com";
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
      voted: "secondary",
      modal: false,
      user: user,
      access_token: access_token,
      permission: permission
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
    const userId = cookies.get("userId") ? cookies.get("userId") : null;
    const access_token = cookies.get("access_token")
      ? cookies.get("access_token")
      : null;
    const permission = access_token !== null ? true : false;
    this.setState({
      access_token: access_token,
      userId: userId,
      user: user,
      permission: permission
    });
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
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
      console.log(res.status);
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
                this.state.post.users.filter(
                  u => u.email === this.state.user.email
                ).length > 0 ? (
                  <div>
                    <Button
                      color="primary"
                      onClick={() => {
                        this.voteUp();
                      }}
                    >
                      &#8593;
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      color={this.state.voted}
                      onClick={() => {
                        this.toggle();
                        this.voteUp();
                      }}
                    >
                      &#8593;
                    </Button>
                    {!this.state.permission ? (
                      <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                          Stackoverflow
                        </ModalHeader>
                        <ModalBody>Login to vote</ModalBody>
                        <ModalFooter>
                          <NavLink href="/login/">Login</NavLink>
                          <Button color="primary" onClick={this.toggle}>
                            Login
                          </Button>{" "}
                          <Button color="secondary" onClick={this.toggle}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    ) : null}
                  </div>
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
