import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Scatter } from "./ChartTypes/Scatter.js";
import { BarVertical } from "./ChartTypes/BarVertical.js";
import { BarHorizontal } from "./ChartTypes/BarHorizontal.js";
import { Line } from "./ChartTypes/Line.js";
import { Pie } from "./ChartTypes/Pie.js";
import { Move } from "./Move.js";
import { Legend } from "./Legend.js";

export class MainContent extends React.Component {


  renderChart = () => {
    const chartType = this.props.chartType;

    let tmp;

    if(chartType == "Scatter"){
      tmp=<Scatter
        top={this.props.top}
        left={this.props.left}
        color={this.props.color}
        data={this.props.data}
      />;
    }else if(chartType == "Pie"){
      tmp=<Pie
        top={this.props.top}
        left={this.props.left}
        color={this.props.color}
        data={this.props.data}
      />;
    }else if(chartType == "BarVertical"){
      tmp=<BarVertical
        top={this.props.top}
        left={this.props.left}
        color={this.props.color}
        data={this.props.data}
      />;
    }else if(chartType == "BarHorizontal"){
      tmp=<BarHorizontal
        top={this.props.top}
        left={this.props.left}
        color={this.props.color}
        data={this.props.data}
      />;
    }else if(chartType == "Line"){
      tmp=<Line
        top={this.props.top}
        left={this.props.left}
        color={this.props.color}
        data={this.props.data}
      />;
    }

    return(tmp);
  }


  render() {
    const chartType = this.props.chartType;
    const legend = this.props.legend;

    return (
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10">
        <div className="row">
          <div id="chart-cont" className="col-xs-12 col-sm-12 col-md-10 col-lg-10">
            {this.renderChart()}
            <Move
              moveTop={this.props.moveTop}
              moveBottom={this.props.moveBottom}
              moveLeft={this.props.moveLeft}
              moveRight={this.props.moveRight}
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 mx-auto">
            { legend ?
              <Legend
                data={this.props.data}
              /> : ""
            }
          </div>
        </div>
      </div>

    );
  }
}
