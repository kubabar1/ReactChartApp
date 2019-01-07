import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export class Zoom extends React.Component {

  handleZoomIn = (e) => {
    e.preventDefault();
    this.props.zoomIn();
  };


  render() {
    return (
      <div id="zoom_icon_container" className="mx-auto text-center py-5">
        <div className="row container">
          <a href="#" onClick={this.handleZoomIn}>
            <i className="fas fa-search-plus mr-3" />
          </a>
          <a href="#" onClick={this.props.zoomOut}>
            <i className="fas fa-search-minus" />
          </a>
        </div>
      </div>
    );
  }
}
