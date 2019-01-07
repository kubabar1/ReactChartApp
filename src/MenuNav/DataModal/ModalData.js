import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {DataTable} from "./DataTable.js"
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";

export class ModalData extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalDataInput:false,
			x_input:null,
			y_input:null,
			message:null
	  };
	}

	showMessage = (message) => {
		this.setState({
			message:message
		});
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

	addEmptyRow = () => {
		this.props.addRow("x"+this.props.size()[0], Array(this.props.size()[1]).fill().map((e,i)=>0));
	}

	addEmptyCol = () => {
		this.props.addCol("y"+this.props.size()[1], Array(this.props.size()[0]).fill().map((e,i)=>0));
	}

  render() {
		const message = this.state.message;

    return (
      <div>
        <Modal isOpen={this.props.modalData} toggle={this.props.toggle} size="lg">
          <ModalHeader toggle={this.props.toggle}>Enter data</ModalHeader>
          <ModalBody>
						<div className="col-12 container">
							<button type="button" className="btn btn-warning mb-2" style={{color:"#ffffff"}} onClick={this.props.clearData}><i className="fas fa-trash-alt"></i> Delete all</button>
							<DataTable
								colors={this.props.colors}
								rows={this.props.rows}
								nrows={this.props.nrows}
								ncols={this.props.ncols}
								colnames={this.props.colnames}
								rownames={this.props.rownames}

								addRow={this.props.addRow}
								addCol ={this.props.addCol}
								size={this.props.size}
								setSize={this.props.setSize}
								setColNames={this.props.setColNames}
								setRowNames={this.props.setRowNames}
								setValue={this.props.setValue}
								value={this.props.value}
			          handleColorChange={this.props.handleColorChange}
								setColumnName={this.props.setColumnName}
								setRowName={this.props.setRowName}
								showMessage={this.showMessage}
							/>
							{
								message ? [
								<div key="error-message" className="alert alert-danger" role="alert">
							  	{message}
								</div>] : ""
							}
							<div className="row pt-3 pl-3">
								<button type="button" className="btn btn-outline-primary" onClick={this.addEmptyRow}><i className="fas fa-plus"></i> Add row</button>
								<button type="button" className="btn btn-outline-primary ml-4" onClick={this.addEmptyCol}><i className="fas fa-plus"></i> Add column</button>
							</div>
						</div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

/*
	<Button
		color="primary"
		onClick={(e) => {e.preventDefault(); this.props.addData(this.state.x_input, this.state.y_input); this.setInputNull();}}
		disabled={this.state.x_input==null||this.state.y_input==null}
	>
		Add
	</Button>
*/
