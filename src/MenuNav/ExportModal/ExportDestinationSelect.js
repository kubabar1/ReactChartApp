import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";
import { CSVLink } from "react-csv";

export class ExportDestinationSelect extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {

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

    const csvData = [
      [this.props.colors],
      [this.props.colnames],
      [this.props.rownames],
      [this.props.rows],
      [this.props.nrows],
      [this.props.ncols]
    ];

    return (
      <div className="container col-10 offset-1">
        <div className="text-center pb-3">
          <h4>Select data export destination:</h4>
        </div>
        <div className="row">
          <CSVLink data={csvData} filename='react_chart_app_data.csv' id="import_select_container" className="col-3 offset-2">
            <div>
              <img src={require('../../hard_drive.png')} className="img-fluid"/>
            </div>
            <div className="text-center">
              <p className="pb-0 mb-0 pt-1">Device</p>
            </div>
          </CSVLink>
          <div id="import_select_container" className="col-3 offset-2" onClick={() => this.props.selectExportDestination("firebase")}>
            <div>
              <img src={require('../../firebase.png')} className="img-fluid"/>
            </div>
            <div className="text-center">
              <p className="pb-0 mb-0 pt-1">Firebase</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
