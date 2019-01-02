import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";
import {ExportDestinationSelect} from "./ExportDestinationSelect.js"
//import CSVReader from "react-csv-reader";

export class ModalExportData extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalExportData:false,
			exportDestination:null
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

	selectExportDestination = (exportDestination) => {
		this.setState({
			exportDestination:exportDestination
		});
		console.log(exportDestination);
	}

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalExportData} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Export data</ModalHeader>
          <ModalBody>
						<ExportDestinationSelect
							colors={this.props.colors}
							rows={this.props.rows}
							nrows={this.props.nrows}
							ncols={this.props.ncols}
							colnames={this.props.colnames}
							rownames={this.props.rownames}
							selectExportDestination={this.selectExportDestination}
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


/*

	<CSVReader
	 cssClass="react-csv-input"
		onFileLoaded={this.loadData}
	/>

*/
