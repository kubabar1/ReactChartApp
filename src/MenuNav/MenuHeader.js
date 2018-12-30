import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import "font-awesome/css/font-awesome.min.css";

export class MenuHeader extends React.Component {

  render() {
    return (
      <div id="nav_menu_header">
        <div className="row px-4 py-3">
          <div className="menu_icon">
            <b><i className="fas fa-chart-pie"/></b>
          </div>
          <div className="menu_item_name pl-3 col-10"><b>CHART APP</b></div>
        </div>
      </div>
    );
  }
}
