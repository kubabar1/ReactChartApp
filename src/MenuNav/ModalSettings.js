import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import "font-awesome/css/font-awesome.min.css";
import { Chart } from "react-google-charts";

export class ModalSettings extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalColorInput:false,
      graphType:this.props.graphType
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

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalChangeGraphType} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Settings</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Chart title:</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="form-group">
              <label>X-axis title:</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Y-axis title:</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="form-group form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox"/> Legend
              </label>
            </div>
            <div className="form-group">
              <label>Chart type:</label>
              <select className="form-control" name="graphType" value={this.state.graphType} onChange={this.handleInputChange}>
                <option value="ScatterChart">ScatterChart</option>
                <option value="BarChart">BarChart</option>
                <option value="LineChart">LineChart</option>
                <option value="Table">Table</option>
              </select>
            </div>
            <Chart
              chartType="ScatterChart"
              loader={<div className="mx-auto text-center"><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i><span>Loading chart ...</span></div>}
              data={[
                ['x', 'y'],
                [8, 12],
                [4, 5.5],
                [11, 14],
                [4, 5],
                [3, 3.5],
                [6.5, 7],
              ]}
              options={{
                legend: 'none'
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
							color="primary"
							onClick={(e) => {e.preventDefault(); this.props.setGraphType(this.state.graphType);}}
						>
							Set
						</Button>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
