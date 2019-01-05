import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { VictoryChart} from "victory-chart";
import { VictoryTheme, VictoryScatter } from "victory";

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
