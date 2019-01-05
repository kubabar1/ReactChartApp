import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { VictoryChart} from "victory-chart";
import { VictoryTheme, VictoryScatter, VictoryLabel } from "victory";

export class Scatter extends React.Component {

  renderChart = () => {
    const rows = this.props.data.rows;

    let dataArray = [];

    rows.forEach((item, i)=>{
      item.forEach((sub, j)=>{
        dataArray.push({x:j, y:sub});
      })
    });


    return(
      <VictoryChart
        theme={VictoryTheme.material}
      >
        <VictoryLabel text={this.props.data.chartName} x={180} y={30} textAnchor="middle"/>
        <VictoryScatter
          style={{ data: { fill: "#c43a31" } }}
          size={5}
          data={dataArray}
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
