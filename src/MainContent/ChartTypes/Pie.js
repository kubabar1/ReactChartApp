import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { VictoryChart} from "victory-chart";
import { VictoryTheme, VictoryPie, VictoryLabel, VictoryAxis } from "victory";

export class Pie extends React.Component {

  renderChart = () => {
    const rows = this.props.data.rows;
    const colnames = this.props.data.colnames;
    const rownames = this.props.data.rownames;

    let dataArray = [];

    rows[0].forEach((sub, j)=>{
      dataArray.push({x:colnames[j], y:sub});
    })

    rows.slice(1,rows.length).forEach((item, i)=>{
      item.forEach((sub, j)=>{
        dataArray[j].y=dataArray[j].y+sub;
      })
    });

    return(
        <div>
          <h4>{this.props.data.chartName}</h4>
          <VictoryPie colorScale={this.props.data.colors} data={dataArray} radius={110} height={300}/>
        </div>
    );
  }

  render() {


    return (
      <div id="chart-container" className="col-md-9 mx-auto text-center" style={{height:450, top:this.props.top, left:this.props.left}}>
        {this.renderChart()}
      </div>
    );
  }
}
