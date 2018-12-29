import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import "font-awesome/css/font-awesome.min.css";

export class ModalColorInput extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalColorInput:false,
      color:this.props.color
	  };
	}

	handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalColorInput} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Select color</ModalHeader>
          <ModalBody>
					<div className="form-group">
						<label>Color:</label>
						<input type="color" className="form-control" name="color" value={this.state.color} onChange={this.handleInputChange}/>
					</div>
          </ModalBody>
          <ModalFooter>
            <Button
							color="primary"
							onClick={(e) => {e.preventDefault(); this.props.setColor(this.state.color);}}
						>
							Set
						</Button>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
