import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {moveTop, moveBottom, moveLeft, moveRight} from '../../actions/index.js'

class Move extends React.Component {

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
      <div id="move-button-container" className="text-center mt-3">
        <div className="container">
          <i className="fas fa-chevron-up mx-3 move-button" onClick={this.handleMoveTop}/>
          <i className="fas fa-chevron-down mx-3 move-button" onClick={this.handleMoveBottom}/>
          <i className="fas fa-chevron-left mx-3 move-button" onClick={this.handleMoveLeft}/>
          <i className="fas fa-chevron-right mx-3 move-button" onClick={this.handleMoveRight}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  chartInfo: state.chartInfo
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    moveTop: moveTop,
    moveBottom: moveBottom,
    moveLeft:moveLeft,
    moveRight:moveRight
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Move);
