import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";
import db from "../../Firebase/MyDB.js";

export class FirebaseImport extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			charts:null
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

	readChartsFromFirebase = () => {
		var charts = [];

		db.collection("charts").get().then((querySnapshot) => {
    	querySnapshot.forEach((doc) => {
				charts.push({ ...doc.data() });
    	});
		}).then(() => {
        this.setState({
          charts: charts
        });
    }).catch((error) => {
				console.log("Error getting document:", error);
		});
	}

	renderRow = (currElement, index) => {
		return(
			<tr key={index}>
				<td>{currElement.chartName}</td>
				<td><a href="#" className="btn btn-primary" role="button" onClick={()=>this.handleLoad(currElement)}>Import</a></td>
				<td><a href="#" className="btn btn-danger" role="button" onClick={()=>this.handleDelete(currElement)}>Delete</a></td>
			</tr>
		);
	}

	handleDelete = (data) => {
		db.collection("charts").doc(data.chartName).delete()
		.catch((error) => {
    	console.error("Error removing document: ", error);
		});

		this.readChartsFromFirebase();
		this.props.selectImportSource(null);
		this.props.toggle();
	}

	handleLoad = (data) => {
		let tmpRows = [];
		let tmp=[];

		data.rows.forEach((item)=>{
			Object.keys(item).forEach((key)=>{
    		tmp.push(item[key]);
			});
			tmpRows.push(tmp);
			tmp=[];
		});

		const dt = {
			x_name:data.x_name,
			y_name:data.y_name,
			chartName:data.chartName,
			graphType:data.graphType,
			colors:data.colors,
			rows:tmpRows,
			nrows:data.nrows,
			ncols:data.ncols,
			colnames:data.colnames,
			rownames:data.rownames
		}

		this.props.setData(dt);
		this.props.selectImportSource(null);
		this.props.toggle();
	}

	componentDidMount(){
		this.readChartsFromFirebase();
	}

  render() {

		const charts = this.state.charts;

    return (
      <div className="text-center">
				<div className="mb-4">
        	<h2>Select chart</h2>
	      </div>
				<table className="table table-bordered table-hover">
    			<thead className="thead-light">
      			<tr>
        			<th>Chart name</th>
        			<th>Import</th>
        			<th>Delete</th>
      			</tr>
    			</thead>
    			<tbody>
						{charts ? charts.map(this.renderRow) : <tr></tr>}
    			</tbody>
  			</table>
      </div>
    );
  }
}
