import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { VictoryPie } from "victory";
import { connect } from 'react-redux'

class Pie extends React.Component {

  renderChart = () => {
    const rows = this.props.data.rows;
    const colnames = this.props.data.colnames;

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
          <VictoryPie colorScale={this.props.data.colors} data={dataArray} />
        </div>
    );
  }

  render() {
    return (
      <div id="chart-container" className="col-md-9 mx-auto text-center" style={{top:this.props.chartInfo.top, left:this.props.chartInfo.left}}>
        {this.renderChart()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data.present,
  chartInfo: state.chartInfo.present
})


export default connect(mapStateToProps, null)(Pie);
