import React from "react";
import { MenuNav } from "./MenuNav/MenuNav";
import { MainContent } from "./MainContent/MainContent";

export class App extends React.Component {

  history = []

  constructor(props) {
    super(props);

    this.state = {
      chartName:null,
      zoom:50,
      top:0,
      left:0,
      x_name:null,
      y_name:null,
      graphType:"ScatterChart",
      colors:["#000000","#000000","#000000","#000000"],
      rows:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
      nrows:4,
      ncols:4,
      colnames:["y0", "y1", "y2", "y3"],
      rownames:["x0", "x1", "x2", "x3"]
    };
  }

  copy = (src) => {
    let target = {};
    for (let prop in src) {
      if (src.hasOwnProperty(prop)) {
        target[prop] = src[prop] instanceof Array ? (src[prop][0] instanceof Array ? this.copyMultidimensionalArray(src[prop]) : src[prop].slice()) : src[prop];
      }
    }
    return target;
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

      let tmpRows = this.copyMultidimensionalArray(tmp.rows);

      this.setState({
        zoom:tmp.zoom,
        top:tmp.top,
        left:tmp.left,
        x_name:tmp.x_name,
        y_name:tmp.y_name,
        graphType:tmp.graphType,
        colors:tmp.colors.slice(),
        rows:tmpRows,
        nrows:tmp.nrows,
        ncols:tmp.ncols,
        colnames:tmp.colnames.slice(),
        rownames:tmp.rownames.slice()
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

  clearData = () => {
    if(window.confirm("Do you want to delete all data?")){
      this.setState({
        colors:[],
        rows:[],
        nrows:0,
        ncols:0,
        colnames:[],
        rownames:[]
      })
    }
  }

  addRow = (rowname, row) => {
    let actualSize = this.size();
    this.setSize(actualSize[0]+1, actualSize[1]);

    let tmpRowNames = [...this.state.rownames, rowname];
    let tmpRows = [...this.state.rows, row];

    this.setState({
      rownames: [...this.state.rownames, rowname],
      rows: [...this.state.rows, row]
    })
  }

  addCol = (colname, arr) => {
    let actualSize = this.size();
    this.setSize(actualSize[0], actualSize[1]+1);

    this.setState({
      colnames: [...this.state.colnames, colname],
      colors:  [...this.state.colors, "#000000"]
    })

    const columnsNumber = this.size()[1];

    let tmp;

    this.state.rows.forEach((item, index) => {
        tmp = this.state.rows;
        tmp[index] = [...item, arr[index]]
        this.setState({
          rows:tmp
        });
      }
    )
  }

  size = () => {
    return [this.state.nrows, this.state.ncols];
  }

  setSize = (nr, nc) => {
    this.setState({
      nrows:nr,
      ncols:nc
    });
  }

  setColNames = (arr) => {
    this.setState({
      colnames:arr
    });
  }

  setRowNames = (arr) => {
    this.setState({
      rownames:arr
    });
  }

  setValue = (r,c, val) => {
    let tmpRow = this.state.rows;
    tmpRow[r][c] = parseInt(val);

    this.setState({
      rows: tmpRow
    });
  }

  value = (r,c) => {
    return this.state.rows[r][c]
  }

  handleColorChange = (index, event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    let tmpColors = this.state.colors;
    tmpColors[index] = value;

    this.setState({
      colors: tmpColors
    });
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

  setColumnName = (i, name) => {
    let tmpColnames = this.state.colnames;
    tmpColnames[i] = name;

    this.setState({
      colnames: tmpColnames
    });
  }

  setRowName = (i, name) => {
    let tmpRowNames = this.state.rownames;
    tmpRowNames[i] = name;

    this.setState({
      rownames: tmpRowNames
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

          colors={this.state.colors}
          rows={this.state.rows}
          nrows={this.state.nrows}
          ncols={this.state.ncols}
          colnames={this.state.colnames}
          rownames={this.state.rownames}

          addRow={this.addRow}
          addCol ={this.addCol}
          size={this.size}
          setSize={this.setSize}
          setColNames={this.setColNames}
          setRowNames={this.setRowNames}
          setValue={this.setValue}
          value={this.value}
          handleColorChange={this.handleColorChange}
          clearData={this.clearData}
          setColumnName={this.setColumnName}
          setRowName={this.setRowName}

          undo={this.undo}

          chartName={this.state.chartName}
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
          graphType={this.state.graphType}
          rows={this.state.rows}
          colors={this.state.colors}
        />
      </main>
    );
  }
}
