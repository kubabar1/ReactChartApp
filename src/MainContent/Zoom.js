import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";

export class Zoom extends React.Component {

  handleZoomIn = (e) => {
    e.preventDefault();
    this.props.zoomIn();
  };


  render() {
    return (
      <div id="zoom_icon_container" className="col-md-9 mx-auto text-center py-5">
        <div className="">
          <a href="#" onClick={this.handleZoomIn}>
            <i className="fas fa-search-plus" />
          </a>
          <br />
          <a href="#" onClick={this.props.zoomOut}>
            <i className="fas fa-search-minus" />
          </a>
        </div>
      </div>
    );
  }
}
