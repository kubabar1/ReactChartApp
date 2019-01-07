import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export class Legend extends React.Component {

  constructor(props) {
	  super(props);
	  this.state = {

	  };
	}

  render() {
    return (
      <div id="legend" className="container">
        <div className="container">
          <div className="row my-1">
            <div className="pl-3 legend-color-sq" style={{backgroundColor:"red"}}></div>
            <div className="pl-3 col-8">Konstantynopol</div>
          </div>
          <div className="row my-1">
            <div className="pl-3 legend-color-sq" style={{backgroundColor:"green"}}></div>
            <div className="pl-3 col-8">Test</div>
          </div>
          <div className="row my-1">
            <div className="pl-3 legend-color-sq" style={{backgroundColor:"blue"}}></div>
            <div className="pl-3 col-8">qweqweqwe</div>
          </div>
          <div className="row my-1">
            <div className="pl-3 legend-color-sq" style={{backgroundColor:"yellow"}}></div>
            <div className="pl-3 col-8">ffsdfsdf</div>
          </div>
          <div className="row my-1">
            <div className="pl-3 legend-color-sq" style={{backgroundColor:"orange"}}></div>
            <div className="pl-3 col-8">sasasas</div>
          </div>
          <div className="row my-1">
            <div className="pl-3 legend-color-sq" style={{backgroundColor:"black"}}></div>
            <div className="pl-3 col-8">xvdxgdfg</div>
          </div>
          <div className="row my-1">
            <div className="pl-3 legend-color-sq" style={{backgroundColor:"red"}}></div>
            <div className="pl-3 col-8">dfsdfsdfsdf</div>
          </div>
          <div className="row my-1">
            <div className="pl-3 legend-color-sq" style={{backgroundColor:"green"}}></div>
            <div className="pl-3 col-8">Test</div>
          </div>
          <div className="row my-1">
            <div className="pl-3 legend-color-sq" style={{backgroundColor:"black"}}></div>
            <div className="pl-3 col-8">xvdxgdfg</div>
          </div>
        </div>
      </div>
    );
  }
}
