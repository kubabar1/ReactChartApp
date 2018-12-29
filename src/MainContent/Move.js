import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";

export class Move extends React.Component {

  handleMoveTop = (e) => {
    e.preventDefault();
    this.props.moveTop();
  }

  handleMoveBottom = (e) => {
    e.preventDefault();
    this.props.moveBottom();
  }

  handleMoveLeft = (e) => {
    e.preventDefault();
    this.props.moveLeft();
  }

  handleMoveRight = (e) => {
    e.preventDefault();
    this.props.moveRight();
  }

  render() {
    return (
      <div className="mx-auto">
        <a href="#" onClick={this.handleMoveTop}>
          <i className="fas fa-chevron-up mx-3" />
        </a>
        <a href="#" onClick={this.handleMoveBottom}>
          <i className="fas fa-chevron-down mx-3" />
        </a>
        <a href="#" onClick={this.handleMoveLeft}>
          <i className="fas fa-chevron-left mx-3" />
        </a>
        <a href="#" onClick={this.handleMoveRight}>
          <i className="fas fa-chevron-right mx-3" />
        </a>
      </div>
    );
  }
}
