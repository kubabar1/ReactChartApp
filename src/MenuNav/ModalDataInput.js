import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import "font-awesome/css/font-awesome.min.css";

export class ModalDataInput extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalDataInput:false,
			x_input:null,
			y_input:null
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

	setInputNull = () => {
		this.setState({
			x_input:null,
			y_input:null
		});
	}

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalDataInput} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Enter data</ModalHeader>
          <ModalBody>
					<div className="form-group">
						<label>Value 'X':</label>
						<input type="number" className="form-control" name="x_input" onChange={this.handleInputChange}/>
					</div>
					<div className="form-group">
						<label>Value 'Y':</label>
						<input type="number" className="form-control" name="y_input" onChange={this.handleInputChange}/>
					</div>
          </ModalBody>
          <ModalFooter>
            <Button
							color="primary"
							onClick={(e) => {e.preventDefault(); this.props.addData(this.state.x_input, this.state.y_input); this.setInputNull();}}
							disabled={this.state.x_input==null||this.state.y_input==null}
						>
							Add
						</Button>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
