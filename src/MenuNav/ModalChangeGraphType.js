import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import "font-awesome/css/font-awesome.min.css";

export class ModalChangeGraphType extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalColorInput:false,
      graphType:this.props.graphType
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
        <Modal isOpen={this.props.modalChangeGraphType} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Select graph type</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Select list:</label>
              <select className="form-control" name="graphType" value={this.state.graphType} onChange={this.handleInputChange}>
                <option value="ScatterChart">ScatterChart</option>
                <option value="BarChart">BarChart</option>
                <option value="LineChart">LineChart</option>
                <option value="Table">Table</option>
              </select>
            </div>
            <div className="alert alert-danger">
              After clicking "Set" your data will be deleted.
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
							color="primary"
							onClick={(e) => {e.preventDefault(); this.props.setGraphType(this.state.graphType);}}
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
