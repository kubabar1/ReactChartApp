import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import { Chart } from "react-google-charts";
import { VictoryChart, VictoryTheme, VictoryScatter } from "victory-chart";

export class Graph extends React.Component {

  renderChart = (data) => {

    return(
      <VictoryChart
        style={{}}
      />
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
