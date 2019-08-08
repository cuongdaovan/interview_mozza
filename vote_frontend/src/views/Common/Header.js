import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const username = cookies.get("username") ? cookies.get("username") : "";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      username: username
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount() {
    const username = cookies.get("username") ? cookies.get("username") : "";
    this.setState({ username: username });
  }
  onLogout = () => {
    cookies.remove("username", { path: "/" });
    cookies.remove("access_token", { path: "/" });
    cookies.remove("userId", { path: "/" });
    cookies.remove("email", { path: "/" });
    this.setState({ username: null });
  };
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Stackoverflow</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/posts/">posts</NavLink>
              </NavItem>
              {this.state.username ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {this.state.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Profile</DropdownItem>
                    <DropdownItem>
                      <Button onClick={this.onLogout}>Logout</Button>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NavItem>
                  <NavLink href="/login/">Login</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
