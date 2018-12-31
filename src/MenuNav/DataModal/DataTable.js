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

  headerFormat = (fieldValue, row, rowIdx, colIdx) => {
    return 'header_table_format';
  }



  convertRowsToAssociativeArray = () => {
    const rows = this.props.rows;
    const rownames = this.props.rownames;
    const colnames = this.props.colnames;

    let data = [];
    let tmp = {};

    rownames.forEach((rowname, i) => {
      tmp["description"] = rowname;
      colnames.forEach((colname, j)=>{
        tmp[colname] = rows[i][j];
      })
      data.push(tmp);

      tmp = {};
    });

    return data;
  }

  renderColorInput = (item, i) => {
    return(
        <TableHeaderColumn key={i} row='0' col={i+1} dataField='color' dataAlign='center' className={ this.headerFormat }>
          <input type="color" className="form-control" name="color" value={this.props.colors[i]} onChange={(e) => this.props.handleColorChange(i,e)}/>
        </TableHeaderColumn>
    );
  }

  renderRows = (item, i) => {
    return(
      <TableHeaderColumn key={i} row='1' col={i+1} dataField={'y'+i} dataAlign='center' className={ this.headerFormat }>
        {'y'+i}
      </TableHeaderColumn>
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
      <div>
        <BootstrapTable options={ options } data={this.convertRowsToAssociativeArray()} cellEdit={cellEdit} hover responsive >
          <TableHeaderColumn row='0' col='0' dataField='color' dataAlign='center' className={ this.headerFormat }>Color</TableHeaderColumn>
          {colnames.map(this.renderColorInput)}

          <TableHeaderColumn row='1' col='0' dataField='description' columnClassName={ this.headerFormat } className={ this.headerFormat } isKey={true} dataAlign='center'>Description</TableHeaderColumn>
          {colnames.map(this.renderRows)}

        </BootstrapTable>
      </div>
    );
  }
}
