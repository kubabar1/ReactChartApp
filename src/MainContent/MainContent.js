import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Scatter } from "./ChartTypes/Scatter.js";
import { BarVertical } from "./ChartTypes/BarVertical.js";
import { BarHorizontal } from "./ChartTypes/BarHorizontal.js";
import { Line } from "./ChartTypes/Line.js";
import { Pie } from "./ChartTypes/Pie.js";
import { Zoom } from "./Zoom.js";
import { Move } from "./Move.js";
import { Legend } from "./Legend.js";

export class MainContent extends React.Component {


  renderChart = () => {
    const chartType = this.props.chartType;

    let tmp;

    if(chartType == "Scatter"){
      tmp=<Scatter
        zoom={this.props.zoom}
        top={this.props.top}
        left={this.props.left}
        color={this.props.color}
        data={this.props.data}
      />;
    }else if(chartType == "Pie"){
      tmp=<Pie
        zoom={this.props.zoom}
        top={this.props.top}
        left={this.props.left}
        color={this.props.color}
        data={this.props.data}
      />;
    }else if(chartType == "BarVertical"){
      tmp=<BarVertical
        zoom={this.props.zoom}
        top={this.props.top}
        left={this.props.left}
        color={this.props.color}
        data={this.props.data}
      />;
    }else if(chartType == "BarHorizontal"){
      tmp=<BarHorizontal
        zoom={this.props.zoom}
        top={this.props.top}
        left={this.props.left}
        color={this.props.color}
        data={this.props.data}
      />;
    }else if(chartType == "Line"){
      tmp=<Line
        zoom={this.props.zoom}
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

    return (
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10">
        <div className="row">
          <div id="content-main-container" className="col-10 mt-5 mb-5" >
            {this.renderChart()}
          </div>
          <div id="zoom_container" className="col-2">
            <Zoom
              zoomIn={this.props.zoomIn}
              zoomOut={this.props.zoomOut}
            />
            <Legend/>
          </div>
        </div>
        <div id="move_buttons_container" className="row col-10">
          <Move
            moveTop={this.props.moveTop}
            moveBottom={this.props.moveBottom}
            moveLeft={this.props.moveLeft}
            moveRight={this.props.moveRight}
          />
        </div>
      </div>
    );
  }
}
