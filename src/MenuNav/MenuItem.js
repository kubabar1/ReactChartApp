import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import "font-awesome/css/font-awesome.min.css";

export class MenuItem extends React.Component {

  handleMenuClick = (e) => {
    e.preventDefault();
    this.props.clickMenu(e);
  }

  render() {
    return (
      <div className="menu_item_container">
        <a className="nav_item" href="#" onClick={this.handleMenuClick}>
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
