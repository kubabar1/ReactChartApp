import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";
import {DataSourceSelect} from "./DataSourceSelect.js"
import {DeviceImport} from "./DeviceImport.js"
import {FirebaseImport} from "./FirebaseImport.js"

export class ModalImportData extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalImportData:false,
			importSource:null
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

	selectImportSource = (sourceOfImport) => {
		this.setState({
			importSource:sourceOfImport
		});
	}

  loadData = (data) => {
    var v = [];
    var i;
    for (i = 0; i < data[0].length; i+=2) {
      if(i===0){
        v.push([data[0][i],data[0][i+1]])
      }else{
        v.push([parseInt(data[0][i]),parseInt(data[0][i+1])])
      }
    }
    this.props.setData(v)
  }

  render() {
		const importSource = this.state.importSource;

    return (
      <div>
        <Modal isOpen={this.props.modalImportData} toggle={(e) => {this.selectImportSource(null); this.props.toggle(e);}} className={this.props.className}>
          <ModalHeader toggle={(e) => {this.selectImportSource(null); this.props.toggle(e);}}>Import data</ModalHeader>
          <ModalBody>
						{importSource!=null ?
							(
								importSource=="device" ?
								<DeviceImport
			          	setData={this.props.setData}
									toggle={this.props.toggle}
									selectImportSource={this.selectImportSource}
								/> :
								<FirebaseImport
									setData={this.props.setData}
									toggle={this.props.toggle}
									selectImportSource={this.selectImportSource}
								/>
							) :
							<DataSourceSelect selectImportSource={this.selectImportSource}/>
						}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={(e) => {this.selectImportSource(null); this.props.toggle(e); }}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
