import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export class DataSourceSelect extends React.Component {

  render() {
    return (
      <div className="container col-10 offset-1">
        <div className="text-center pb-3">
          <h4>Select data source:</h4>
        </div>
        <div className="row">
          <div id="import_select_container" className="col-3 offset-2" onClick={() => this.props.selectImportSource("device")}>
            <div>
              <img src={require('../../../images/hard_drive.png')} className="img-fluid"/>
            </div>
            <div className="text-center">
              <p className="pb-0 mb-0 pt-1">Device</p>
            </div>
          </div>
          <div id="import_select_container" className="col-3 offset-2" onClick={() => this.props.selectImportSource("firebase")}>
            <div>
              <img src={require('../../../images/firebase.png')} className="img-fluid"/>
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
