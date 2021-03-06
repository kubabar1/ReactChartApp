import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import db from "../../Firebase/MyDB.js";
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {setData} from '../../../actions/index.js'

class FirebaseImport extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			charts:null
	  };
	}

	componentDidMount(){
		this.readChartsFromFirebase();
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
				<td><button className="btn btn-primary" type="button" onClick={()=>this.handleLoad(currElement)}>Import</button></td>
				<td><button className="btn btn-danger" type="button" onClick={()=>this.handleDelete(currElement)}>Delete</button></td>
			</tr>
		);
	}

	handleDelete = (data) => {
		db.collection("charts").doc(data.chartName).delete()
		.catch((error) => {
    	console.error("Error removing document: ", error);
		});

		this.readChartsFromFirebase();
	}

	handleLoad = (data) => {
		this.loadFromFirebase(data);
	}

	loadFromFirebase = (data) => {
		try{

				let tmpRows = [];
				let tmp=[];

				data.rows.forEach((item)=>{
					Object.keys(item).forEach((key)=>{
		    		tmp.push(parseFloat(item[key]));
					});
					tmpRows.push(tmp);
					tmp=[];
				});

				const dt = {
					x_name:data.x_name,
					y_name:data.y_name,
					chartName:data.chartName,
					chartType:data.chartType,
					colors:data.colors,
					rows:tmpRows,
					nrows:data.nrows,
					ncols:data.ncols,
					colnames:data.colnames,
					rownames:data.rownames
				}

				this.props.setData(dt);
				this.props.selectImportSource(null);
				this.setState({message:null});
				this.props.toggle();
		}catch(error){
			this.setState({message:error});
		}
	}

  render() {
		const charts = this.state.charts;
		const message = this.state.message;

    return (
      <div className="text-center">
				<div className="mb-4">
        	<h2>Select chart</h2>
	      </div>
				<div className="table-wrapper-scroll-y table-responsive">
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
				{
					message ? [
					<div key="error-message" className="alert alert-danger mt-4" role="alert">
						{"Data load error"}
					</div>] : ""
				}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data.present
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setData: setData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FirebaseImport);
