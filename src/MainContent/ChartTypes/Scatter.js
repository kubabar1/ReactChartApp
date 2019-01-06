import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { VictoryChart} from "victory-chart";
import { VictoryTheme, VictoryScatter, VictoryLabel, VictoryAxis, VictoryTooltip } from "victory";

export class Scatter extends React.Component {

  renderChart = () => {
    const rows = this.props.data.rows;
    const colors = this.props.data.colors;

    let dataArray = [];

    rows.forEach((item, i)=>{
      item.forEach((sub, j)=>{
        dataArray.push({x:j, y:sub, fill:colors[j], label:"test"});
      })
    });


    return(
      <VictoryChart
        theme={VictoryTheme.material} domainPadding={5}
        animate={{ duration: 1000 }}
      >
        <VictoryLabel text={this.props.data.chartName} x={180} y={30} textAnchor="middle"/>
        <VictoryAxis label={this.props.data.x_name} style={{ axisLabel: {padding: 35} }} />
        <VictoryAxis dependentAxis label={this.props.data.y_name} style={{ axisLabel: {padding: 50} }} />
        <VictoryScatter
          style={{
            data: {
              fill: (d) => d.fill,
              opacity: (d) => d.opacity
            }
          }}
          size={5}
          data={dataArray}
          labelComponent={<VictoryTooltip/>}
        />
      </VictoryChart>
    );
  }

  render() {


    return (
      <div id="chart-container" className="col-md-9 mx-auto text-center" style={{height:600, top:this.props.top, left:this.props.left}}>
        {this.renderChart()}
      </div>
    );
  }
}
