import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import CSVReader from 'react-csv-reader'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {setData} from '../../../actions/index.js'

class DeviceImport extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			message:null
	  };
	}

  handleCSVLoad = (data, filename) => {

    if(data.length!==10){
        throw new Error("Incorrect csv input data array length");
    }

		const x_name = data[0][0];
		const y_name = data[1][0];
		const chartName = data[2][0];
		const chartType = data[3][0];

    const nrows = parseInt(data[4][0]);
    const ncols = parseInt(data[5][0]);
    let colors = [];
    let colnames = [];
    let rownames = [];

    let color = null;
    let colname = null;
    let rowname = null;


    var patt = /^#\d{6}$/

    data[6][0].split(",").map((x,i) => {
      color = x.replace(/\s/g, "");
      if(color!=null && patt.test(color)){
        colors.push(color);
      }
			return null;
    });

    if(colors.length!==ncols){
      throw new Error("Colors array length not mach number of columns");
    }

    data[7][0].split(",").map((x,i) => {
      colname = x.replace(/\s/g, "");
      if(colname!=null){
        colnames.push(colname);
      }
			return null;
    });

    if(colnames.length!==ncols){
      throw new Error("Colnames array length not mach number of columns");
    }

    data[8][0].split(",").map((x,i) => {
      rowname = x.replace(/\s/g, "");
      if(rowname!=null){
        rownames.push(rowname);
      }
			return null;
    });

    if(rownames.length!==nrows){
      throw new Error("Rownames array length not mach number of rows");
    }

    const rowsVals = data[9][0].split(",");

		if(rowsVals.length !== nrows*ncols){
			throw new Error("Incorrect number of values");
		}

		let rows=[];
		let tmp=[];

    for(let i=0; i<ncols ; i++){
      for(let j=0; j<nrows ; j++){
					tmp.push(parseFloat(rowsVals[i*nrows+j]));
      }
			rows.push(tmp);
			tmp=[];
    }

		const dt = {
			x_name:x_name,
			y_name:y_name,
			chartName:chartName,
			chartType:chartType,
			colors:colors,
			rows:rows,
			nrows:nrows,
			ncols:ncols,
			colnames:colnames,
			rownames:rownames
		}

		this.props.setData(dt);
		this.props.selectImportSource(null);
		this.props.toggle();
  }

	loadCSV = (data, filename) => {
		try{
			this.setState({message:null});
			this.handleCSVLoad(data, filename);
		}catch(error){
			this.setState({message:error});
		}
	}

  render() {
		const message = this.state.message;

    return (
      <div className="custom-file">
        <CSVReader
          cssInputClass="custom-file-input"
          cssClass="csv-reader-input"
          onFileLoaded={this.loadCSV}
          inputId="csvChartDataFile"
        />
				{
					message ? [
					<div key="error-message" className="alert alert-danger mt-4" role="alert">
						{"CSV load error"}
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

export default connect(mapStateToProps, mapDispatchToProps)(DeviceImport);
