import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {setValue, changeColor, setColumnName, setRowName} from '../../../actions/index.js'

class DataTable extends React.Component {

  constructor(props) {
    super(props);

	  this.state = {
		  modalDataInput:false
	  };
  }

  renderColorInput = (item, i) => {
    return(
      <th style={{minWidth:"100px"}} key={i}>
        <input type="color" className="form-control" name="color" value={this.props.data.colors[i]} onChange={(e) => this.props.changeColor(i,e.target.value)}/>
      </th>
    );
  }

  renderColumnDescription = (item, i) => {
    return(
      <th style={{minWidth:"100px"}} key={i}>
        <input type="text" value={this.props.data.colnames[i]} className="form-control" onChange={(event)=>this.handleChangeColumnName(i,event)}/>
      </th>
    );
  }


  handleChangeColumnName = (i,event) => {
    this.props.setColumnName(i, event.target.value);
  }

  handleChangeRowName = (i,event) => {
    this.props.setRowName(i, event.target.value);
  }

  setVal = (i, j, val) => {
    if(!isNaN(val) && val!=""){
      this.props.setValue(i,j,val);
    }
  }

  renderRows = (item, i) => {
    let tmpRows = [];
    for (let j = 0; j < item.length; j++) {
      tmpRows.push(
        <td key={j}>
          <input type="number" value={item[j]} className="form-control" onChange={(event)=>this.setVal(i,j, event.target.value)}/>
        </td>
      );
    }

    return(
      <tr key={i}>
        <td className="header_table_format"><input type="text" value={this.props.data.rownames[i]} className="form-control"  onChange={(event)=>this.handleChangeRowName(i,event)}/></td>
        {tmpRows}
      </tr>
    );
  }

  render() {
    const options = {
      deleteText: 'Delete rows',
      handleConfirmDeleteRow: this.customConfirm
    };

    const rows = this.props.data.rows;
    const rownames = this.props.data.rownames;
    const colnames = this.props.data.colnames;

    const cellEdit = {
      mode: 'click',
      blurToSave: true
    };

    return (
      <div className="table-wrapper-scroll-y table-responsive text-nowrap">
          <table className="table table-bordered table-hover">
            <thead className="header_table_format">
              <tr>
                <th style={{minWidth:"100px"}}>Color</th>
                {colnames.map(this.renderColorInput)}
              </tr>
              <tr>
                <th style={{minWidth:"100px"}}>Description</th>
                {colnames.map(this.renderColumnDescription)}
              </tr>
            </thead>
            <tbody>
              {rows.map(this.renderRows)}
            </tbody>
          </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setValue: setValue,
    changeColor: changeColor,
    setColumnName:setColumnName,
    setRowName:setRowName
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
