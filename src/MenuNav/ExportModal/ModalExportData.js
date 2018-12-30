import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";
import CSVReader from "react-csv-reader";

export class ModalExportData extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalImportData:false
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
        <Modal isOpen={this.props.modalExportData} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Export data</ModalHeader>
          <ModalBody>
            <CSVReader
	 					 cssClass="react-csv-input"
						  onFileLoaded={this.loadData}
 					  />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
