import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { VictoryChart} from "victory-chart";
import { VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis, VictoryTooltip } from "victory";
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class BarVertical extends React.Component {

  renderChart = () => {
    const rows = this.props.data.rows;
    const colors = this.props.data.colors;
    const colnames = this.props.data.colnames;
    const rownames = this.props.data.rownames;

    let dataArray = [];

    rows.forEach((item, i)=>{
      item.forEach((sub, j)=>{
        dataArray.push({x:j, y:sub, fill:colors[j], label:rownames[i]+", "+colnames[j]});
      })
    });


    return(
      <VictoryChart
        theme={VictoryTheme.material} domainPadding={5}
        animate={{ duration: 1000 }}
      >
        <VictoryLabel text={this.props.data.chartName} x={180} y={30} textAnchor="middle"/>
        <VictoryAxis label={this.props.data.x_name} style={{ axisLabel: {padding: 35} }} />
        <VictoryAxis dependentAxis label={this.props.data.y_name} style={{ axisLabel: {padding: 30} }} />
        <VictoryBar
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
      <div id="chart-container" className="col-md-9 mx-auto text-center" style={{top:this.props.chartInfo.top, left:this.props.chartInfo.left}}>
        {this.renderChart()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  chartInfo: state.chartInfo
})

export default connect(mapStateToProps, null)(BarVertical);
