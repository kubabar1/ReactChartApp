import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import { Chart } from "react-google-charts";

export class Graph extends React.Component {

  renderChart = () => {
    return(
      <Chart
        height="100%"
        chartType={this.props.graphType}
        loader={<div className="mx-auto text-center"><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i><span>Loading chart ...</span></div>}
        data={this.props.data}
        options={{
          legend: 'none',
          chartArea: { width: this.props.zoom+'%', height: this.props.zoom+'%'},
          colors: [this.props.color],
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    );
  }

  render() {
    return (
      <div id="chart-container" className="col-md-9 mx-auto text-center" style={{height:600, top:this.props.top, left:this.props.left}}>
        {this.props.data.length>1 ? this.renderChart() : ""}
      </div>
    );
  }
}
