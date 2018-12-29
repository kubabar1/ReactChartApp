import React from "react";
import { MenuNav } from "./MenuNav/MenuNav";
import { MainContent } from "./MainContent/MainContent";

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zoom:50,
      top:0,
      left:0,
      data:[['x', 'y']],
      x_name:null,
      y_name:null,
      color:"#000000",
      graphType:"ScatterChart"
    };
  }

  zoomIn = () => {
    var x = this.state.zoom;
    var y = parseInt(x)+5;
    if(y<=100){
      this.setState({
        zoom:y
      })
    }
  }

  zoomOut = () => {
    var x = this.state.zoom;
    var y = parseInt(x)-5;
    if(y>0){
      this.setState({
        zoom:y
      })
    }
  }

  moveTop = () => {
    var top = this.state.top;
    var y = top-10;
    if(y>=-200){
      this.setState({
        top:y
      })
    }
  }

  moveBottom = () => {
      var top = this.state.top;
      var y = top+10;
      if(y<=200){
        this.setState({
          top:y
        })
      }
  }

  moveLeft = () => {
      var left = this.state.left;
      var y = left-10;
      if(y>=-200){
        this.setState({
          left:y
        })
      }
  }

  moveRight = () => {
      var left = this.state.left;
      var y = left+10;
      if(y<=200){
        this.setState({
          left:y
        })
      }
  }

  addData = (x,y) => {
    this.setState({
      data:this.state.data.concat([[parseInt(x),parseInt(y)]])
    });
  }

  setData = (data) => {
    this.setState({
      data:data
    });
  }

  removeData = () => {
    this.setState({
      data:[['x', 'y']]
    });
  }

  setColor = (color_str) => {
    this.setState({
      color:color_str
    });
  }

  setGraphType = (graphType) => {
    this.removeData();
    this.setState({
      graphType:graphType
    });
  }

  render() {
    return (
      <main className="row m-0 p-0">
        <MenuNav
          addData={this.addData}
          removeData={this.removeData}
          color={this.state.color}
          setColor={this.setColor}
          graphType={this.state.graphType}
          setGraphType={this.setGraphType}
          data={this.state.data}
          setData={this.setData}
        />
        <MainContent
          zoom={this.state.zoom}
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
          top={this.state.top}
          left={this.state.left}
          moveTop={this.moveTop}
          moveBottom={this.moveBottom}
          moveLeft={this.moveLeft}
          moveRight={this.moveRight}
          data={this.state.data}
          color={this.state.color}
          graphType={this.state.graphType}
        />
      </main>
    );
  }
}
