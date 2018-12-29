import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import { Graph } from "./Graph.js";
import { Zoom } from "./Zoom.js";
import { Move } from "./Move.js";

export class MainContent extends React.Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10">
        <div className="row">
          <div id="graph_container" className="col-10 mt-5 mb-5" style={{height:600}}>
            <Graph
              zoom={this.props.zoom}
              top={this.props.top}
              left={this.props.left}
              data={this.props.data}
              color={this.props.color}
              graphType={this.props.graphType}
            />
          </div>
          <div id="zoom_container" className="col-2">
            <Zoom
              zoomIn={this.props.zoomIn}
              zoomOut={this.props.zoomOut}
            />
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
