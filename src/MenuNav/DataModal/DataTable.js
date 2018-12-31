import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export class DataTable extends React.Component {

  constructor(props) {
    super(props);

	  this.state = {
		  modalDataInput:false
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

  /*convertRowsToAssociativeArray = () => {
    const rows = this.props.rows;
    const rownames = this.props.rownames;
    const colnames = this.props.colnames;

    let data = [];
    let tmp = {};

    rownames.forEach((rowname, i) => {
      tmp["ID"] = i;
      tmp["description"] = rowname;
      colnames.forEach((colname, j)=>{
        tmp[colname] = rows[i][j];
      })
      data.push(tmp);

      tmp = {};
    });

    return data;
  }*/

  renderColorInput = (item, i) => {
    return(
      <th key={i}>
        <input type="color" className="form-control" name="color" value={this.props.colors[i]} onChange={(e) => this.props.handleColorChange(i,e)}/>
      </th>
    );
  }

  renderColumnDescription = (item, i) => {
    return(
      <th key={i}>
        <input type="text" value={this.props.colnames[i]} className="form-control" onChange={(event)=>this.handleChangeColumnName(i,event)}/>
      </th>
    );
  }


  handleChangeColumnName = (i,event) => {
    this.props.setColumnName(i, event.target.value);
  }

  handleChangeRowName = (i,event) => {
    this.props.setRowName(i, event.target.value);
  }

  renderRows = (item, i) => {
    let tmpRows = [];
    for (let j = 0; j < item.length; j++) {
      tmpRows.push(
        <td>
          <input type="number" value={item[j]} className="form-control" onChange={(event)=>this.props.setValue(i,j, event.target.value)}/>
        </td>
      );
    }

    return(
      <tr key={i}>
        <td className="header_table_format"><input type="text" value={this.props.rownames[i]} className="form-control"  onChange={(event)=>this.handleChangeRowName(i,event)}/></td>
        {tmpRows}
      </tr>
    );
  }

  render() {
    const options = {
      deleteText: 'Delete rows',
      handleConfirmDeleteRow: this.customConfirm
    };

    const rows = this.props.rows;
    const rownames = this.props.rownames;
    const colnames = this.props.colnames;


    const cellEdit = {
      mode: 'click',
      blurToSave: true
    };

    return (
      <div className="">
          <table className="table table-bordered table-hover">
            <thead className="header_table_format">
              <tr>
                <th>Color</th>
                {colnames.map(this.renderColorInput)}
              </tr>
              <tr>
                <th>Description</th>
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

/*
<BootstrapTable options={ options } height='400' scrollTop={ 'Bottom' } data={this.convertRowsToAssociativeArray()} cellEdit={cellEdit} hover  >
  <TableHeaderColumn width='100' row='0' col='0' dataField='color' dataAlign='center' className={ this.headerFormat }>Color</TableHeaderColumn>
  {colnames.map(this.renderColorInput)}

  <TableHeaderColumn isKey={true} hidden={true} dataField='ID' >ID</TableHeaderColumn>
  <TableHeaderColumn width='100' row='1' col='0' dataField='description' columnClassName={ this.headerFormat } className={ this.headerFormat } dataAlign='center'>Description</TableHeaderColumn>
  {colnames.map(this.renderRows)}

</BootstrapTable>
*/
