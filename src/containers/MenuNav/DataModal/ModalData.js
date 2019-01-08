import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "./DataTable.js"
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import "font-awesome/css/font-awesome.min.css";
import {setValue, addRow, addCol, clearData} from '../../../actions/index.js'

export class ModalData extends React.Component {

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

	addEmptyRow = () => {
		this.props.addRow("x"+this.props.data.nrows, Array(this.props.data.ncols).fill().map((e,i)=>0));
	}

	addEmptyCol = () => {
		this.props.addCol("y"+this.props.data.ncols, Array(this.props.data.nrows).fill().map((e,i)=>0));
	}

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalData} toggle={this.props.toggle} size="lg">
          <ModalHeader toggle={this.props.toggle}>Enter data</ModalHeader>
          <ModalBody>
						<div className="col-12 container">
							<button type="button" className="btn btn-warning mb-2" style={{color:"#ffffff"}} onClick={this.props.clearData}><i className="fas fa-trash-alt"></i> Delete all</button>
							<DataTable/>
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

const mapStateToProps = (state) => ({
  data: state.data.present
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setValue: setValue, addRow: addRow, addCol:addCol, clearData:clearData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalData);
