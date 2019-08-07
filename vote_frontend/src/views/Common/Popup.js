import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.permission
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    console.log(this.props.permission);
    if (this.props.permission === true) {
      return <Button color={this.props.color}>{this.props.buttonLabel}</Button>;
    } else {
      return (
        <div>
          <Button color={this.props.color} onClick={this.toggle}>
            {this.props.buttonLabel}
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Stackoverflow</ModalHeader>
            <ModalBody>
              Login to vote
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>
                Login
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
}

export default Popup;
