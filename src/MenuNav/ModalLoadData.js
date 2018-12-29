import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import "font-awesome/css/font-awesome.min.css";
import CSVReader from "react-csv-reader";

export class ModalLoadData extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalLoadData:false
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



  loadData = (data) => {
    var v = [];
    var i;
    for (i = 0; i < data[0].length; i+=2) {
      if(i==0){
        v.push([data[0][i],data[0][i+1]])
      }else{
        v.push([parseInt(data[0][i]),parseInt(data[0][i+1])])
      }
    }
    this.props.setData(v)
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalLoadData} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Select file</ModalHeader>
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
