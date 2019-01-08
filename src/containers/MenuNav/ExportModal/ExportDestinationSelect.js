import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";
import { CSVLink } from "react-csv";
import db from "../../Firebase/MyDB.js";
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {setData} from '../../../actions/index.js'

class ExportDestinationSelect extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			message:null
	  };
	}

	saveDataInFirebase = (e) => {
		const rows = this.props.data.rows;
		const chartName = this.props.data.chartName;

		if(chartName!=null && chartName!=""){
			let objArr = [];

			rows.map((val, index) => {
				objArr.push(Object.assign({}, val));
			});

			db.collection("charts").doc(chartName).set({
					x_name:this.props.data.x_name,
        	y_name:this.props.data.y_name,
        	chartName:this.props.data.chartName,
        	chartType:this.props.data.chartType,
		    	colors: this.props.data.colors,
		    	colnames: this.props.data.colnames,
		    	rownames: this.props.data.rownames,
		    	nrows: this.props.data.nrows,
		    	ncols: this.props.data.ncols,
					rows: objArr
			})
			.catch((error) => {
		    	console.error("Error writing document: ", error);
			});

			this.setState({messge:null});
			this.props.toggle(e);
		}else{
			this.setState({message:"If you want to export data to firebase, you must enter the name of the chart"});
		}
	}

  render() {
		const chartName = this.props.chartName;
		const message = this.state.message;

    const csvData = [
			[this.props.data.x_name],
			[this.props.data.y_name],
      [this.props.data.chartName],
      [this.props.data.chartType],

			[this.props.data.nrows],
			[this.props.data.ncols],
      [this.props.data.colors],
      [this.props.data.colnames],
      [this.props.data.rownames],
      [this.props.data.rows]
    ];

    return (
      <div className="container col-10 offset-1">
        <div className="text-center pb-3">
          <h4>Select data export destination:</h4>
        </div>
        <div className="row">
          <CSVLink data={csvData} filename={chartName!=null ? chartName+".csv" : 'react_chart_app_data.csv'} id="import_select_container" className="col-3 offset-2">
            <div>
              <img src={require('../../../images/hard_drive.png')} className="img-fluid"/>
            </div>
            <div className="text-center">
              <p className="pb-0 mb-0 pt-1">Device</p>
            </div>
          </CSVLink>
          <div id="import_select_container" className="col-3 offset-2" onClick={this.saveDataInFirebase}>
            <div>
              <img src={require('../../../images/firebase.png')} className="img-fluid"/>
            </div>
            <div className="text-center">
              <p className="pb-0 mb-0 pt-1">Firebase</p>
            </div>
          </div>
        </div>
				{
					message ? [
					<div key="error-message" className="alert alert-danger mt-4" role="alert">
						{message}
					</div>] : ""
				}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setData:setData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportDestinationSelect);
