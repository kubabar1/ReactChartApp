import React from "react";
import { MenuNav } from "./MenuNav/MenuNav";
import MainContent from "./MainContent/MainContent";

export class App extends React.Component {

  history = []

  constructor(props) {
    super(props);

    this.state = {
      top:0,
      left:0,
      legend:false,
      data:{
        x_name:"",
        y_name:"",
        chartName:"",
        chartType:"Scatter",
        colors:["#000000","#000000","#000000","#000000"],
        rows:[[0,1,2,3],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
        nrows:4,
        ncols:4,
        colnames:["y0", "y1", "y2", "y3"],
        rownames:["x0", "x1", "x2", "x3"]
      }
    };
  }

  copy = (src) => {
    return JSON.parse(JSON.stringify(src));
  }

  copyMultidimensionalArray = (currentArray) => {
    let newArray = [];

    for (let i = 0; i < currentArray.length; i++)
      newArray[i] = currentArray[i].slice();

    return newArray;
  }

  undo = () => {
    if(this.history[1]!=null){

      const historyLength = this.history.length;

      for(let i=0 ; i<historyLength-1 ; i++){
        this.history[i]=this.history[i+1];
      }

      this.history[historyLength-1]=null;

      const tmp = this.history[0];

      let tmpRows = this.copyMultidimensionalArray(tmp.data.rows);

      this.setState({
        zoom:tmp.zoom,
        top:tmp.top,
        left:tmp.left,
        data:
        {
          x_name:tmp.data.x_name,
          y_name:tmp.data.y_name,
          chartName:tmp.data.chartName,
          chartType:tmp.data.chartType,
          colors:tmp.data.colors.slice(),
          rows:tmpRows,
          nrows:tmp.data.nrows,
          ncols:tmp.data.ncols,
          colnames:tmp.data.colnames.slice(),
          rownames:tmp.data.rownames.slice()
        }
      });
    }
  }

  componentDidMount(){
    let tmp = this.copy(this.state);
    this.history = [tmp, null, null, null];
  }

  componentDidUpdate(prevProps, prevState){
    let tmp2 = this.copy(this.state);

    if(JSON.stringify(this.history[0]) !== JSON.stringify(tmp2)){
      const historyLength = this.history.length;

      for(let i=historyLength-1 ; i>0 ; i--){
        this.history[i]=this.history[i-1];
      }

      this.history[0]=tmp2;
    }

    tmp2 = {};
  }

  render() {
    return (
      <main className="row m-0 p-0">
        <MenuNav/>
        <MainContent/>
      </main>
    );
  }
}
