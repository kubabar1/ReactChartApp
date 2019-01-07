import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export class Zoom extends React.Component {

  render() {
    return (
      <div id="zoom_icon_container" className="mx-auto text-center py-2">
        <div className="container">
          <i className="fas fa-search-plus mr-3 zoom-button"  onClick={this.props.zoomIn}/>
          <i className="fas fa-search-minus zoom-button" onClick={this.props.zoomOut}/>
        </div>
      </div>
    );
  }
}
