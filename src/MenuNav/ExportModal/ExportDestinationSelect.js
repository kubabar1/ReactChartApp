import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";
import { CSVLink } from "react-csv";

import db from "../../Firebase/MyDB.js";

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

	saveDataInFirebase = (e) => {
		const rows = this.props.data.rows;
		const chartName = this.props.data.chartName;

		if(chartName!=null){
			let objArr = [];

			rows.map((val, index) => {
				objArr.push(Object.assign({}, val));
			});

			db.collection("charts").doc(chartName).set({
					x_name:this.props.data.x_name,
        	y_name:this.props.data.y_name,
        	chartName:this.props.data.chartName,
        	graphType:this.props.data.graphType,
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

		}
		this.props.toggle(e);
	}

  render() {
		const chartName = this.props.chartName;

    const csvData = [
			[this.props.data.x_name],
			[this.props.data.y_name],
      [this.props.data.chartName],
      [this.props.data.graphType],

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
              <img src={require('../../hard_drive.png')} className="img-fluid"/>
            </div>
            <div className="text-center">
              <p className="pb-0 mb-0 pt-1">Device</p>
            </div>
          </CSVLink>
          <div id="import_select_container" className="col-3 offset-2" onClick={this.saveDataInFirebase}>
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
