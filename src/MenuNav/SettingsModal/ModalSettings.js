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
			modalColorInput:false
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

	renderExampleChart = () =>{
		const chartType=this.props.data.chartType;
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
		const chartType = this.props.data.chartType;
		const chartName = this.props.data.chartName;
		const x_name = this.props.data.x_name;
		const y_name = this.props.data.y_name;
		const legend = this.props.legend;

    return (
      <div>
        <Modal isOpen={this.props.modalChangeGraphType} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Settings</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Chart title:</label>
              <input type="text" className="form-control" value={chartName} onChange={(e)=>this.props.setChartName(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>X-axis title:</label>
              <input type="text" className="form-control" value={x_name} onChange={(e)=>this.props.setXAxisName(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Y-axis title:</label>
              <input type="text" className="form-control" value={y_name} onChange={(e)=>this.props.setYAxisName(e.target.value)}/>
            </div>
            <div className="form-group form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" checked={legend} onChange={(e)=>this.props.setLegendVisibility(e.target.checked)}/> Legend
              </label>
            </div>
            <div className="form-group">
              <label>Chart type:</label>
              <select className="form-control" name="chartType" value={chartType} onChange={(e)=>this.props.setChartType(e.target.value)}>
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
