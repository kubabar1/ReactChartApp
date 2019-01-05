import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";

export class ModalHelp extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalHelp:false
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
      if(i===0){
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
        <Modal isOpen={this.props.modalHelp} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Help</ModalHeader>
          <ModalBody>
            <div className="container">
              <h2>Welcome in Graph App!</h2>
              <h5 className="pt-4">Add data</h5>
              <p>This option allow us adding new points. In order to add new point to we should set filed "Value X" and "Value Y"</p>

              <h5 className="pt-4">Remove data</h5>
              <p>This option allow us delete all data stored in memory.</p>

              <h5 className="pt-4">Load data</h5>
              <p>
                This option allow us to load data from * .csv file. It is advisable to use only files generated by app. Format of this file look as follows:                <br></br>
                <strong>x,y,1,2,2,3,4,5,6,7</strong><br></br>
                This file consists of "x,y," chars and pairs of integers - points coordinates.
              </p>

              <h5 className="pt-4">Download data</h5>
              <p>This option allow us download all data stored in memory as a <b>graph_app.csv</b> file.</p>

              <h5 className="pt-4">Change type</h5>
              <p>
                This option allow us change type of chart. After selected chart type and pressed <b>Set</b> button, all data stored in
                memory will be deleted.
              </p>

              <h5 className="pt-4">Change color</h5>
              <p>
                This option allow us change color of our chart.
              </p>

              <h5 className="pt-4">Help</h5>
              <p>
                This option shows help.
              </p>
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
