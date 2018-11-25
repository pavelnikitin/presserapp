import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
              <img className="img-fluid d-block mx-auto mb-4" src={this.props.url} alt="sketch"/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Sketch;