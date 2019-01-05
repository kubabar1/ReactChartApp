import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";
import { VictoryChart} from "victory-chart";
import { VictoryTheme, VictoryScatter, VictoryPie, VictoryBar, VictoryLine } from "victory";

export class ModalSettings extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalColorInput:false,
      chartType:null
	  };
	}

	componentDidMount(){
		this.setState({
			chartType:this.props.chartType
		});
	}

	handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

	handleChartInputChange = (event) => {
		this.handleInputChange(event);

		this.props.setChartType(event.target.value);
	}

	renderExampleChart = () =>{
		const chartType=this.state.chartType;
		if(chartType=="Scatter"){
			return(
				<VictoryChart
					theme={VictoryTheme.material}
					domain={{ x: [1, 4], y: [1, 4] }}
				>
					<VictoryScatter
						style={{ data: { fill: "#c43a31" } }}
						size={7}
						data={[
							{ x: 1, y: 2 },
							{ x: 2, y: 3 },
							{ x: 3, y: 4 },
							{ x: 4, y: 4 },
						]}
					/>
				</VictoryChart>
			);
		}else if(chartType=="BarVertical"){
			return(
				<VictoryChart
  				theme={VictoryTheme.material}
  				domainPadding={10}
				>
					<VictoryBar
    				style={{ data: { fill: "#c43a31" } }}
						data={[
							{ x: 1, y: 2 },
							{ x: 2, y: 3 },
							{ x: 3, y: 4 },
							{ x: 4, y: 4 },
						]}
  				/>
				</VictoryChart>
			);
		}else if(chartType=="BarHorizontal"){
			return(
				<VictoryChart
  				theme={VictoryTheme.material}
  				domainPadding={{ y: 10 }}
				>
					<VictoryBar horizontal
    				style={{
      				data: { fill: "#c43a31" }
    				}}
						data={[
							{ x: 1, y: 2 },
							{ x: 2, y: 3 },
							{ x: 3, y: 4 },
							{ x: 4, y: 4 },
						]}
  				/>
				</VictoryChart>
			);
		}else if(chartType=="Line"){
			return(
				<VictoryChart
  				theme={VictoryTheme.material}
				>
  				<VictoryLine
    				style={{
      				data: { stroke: "#c43a31" },
      				parent: { border: "1px solid #ccc"}
    				}}
    				data={[
      				{ x: 1, y: 2 },
      				{ x: 2, y: 3 },
      				{ x: 3, y: 5 },
      				{ x: 4, y: 4 },
      				{ x: 5, y: 7 }
    				]}
  				/>
				</VictoryChart>
			);
		}else if(chartType=="Pie"){
			return(
				<VictoryPie
  				data={[
    				{ x: "Cats", y: 35 },
    				{ x: "Dogs", y: 40 },
    				{ x: "Birds", y: 55 }
  				]}
				/>
			);
		}

	}

  render() {
		const chartType = this.state.chartType;

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
              <select className="form-control" name="chartType" value={this.state.chartType} onChange={this.handleChartInputChange}>
                <option value="Scatter">Scatter</option>
                <option value="BarVertical">Bar vertical</option>
                <option value="BarHorizontal">Bar horizontal</option>
	              <option value="Line">Line</option>
		            <option value="Pie">Pie</option>
              </select>
            </div>
						<div className="col-8 offset-2">
							{chartType ? this.renderExampleChart() : ""}
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
