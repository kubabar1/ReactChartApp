import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export class MenuItem extends React.Component {

  render() {
    return (
      <div className="menu_item_container">
        <a className="nav_item" href="#" onClick={(e)=>this.props.clickMenu(e)}>
          <div className="row px-4 py-3">
            <div className="menu_icon">
              <i className={this.props.icon} />
            </div>
            <div className="menu_item_name pl-3 col-10">{this.props.name}</div>
          </div>
        </a>
      </div>
    );
  }
}
