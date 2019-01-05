import React from "react";
import { MenuNav } from "./MenuNav/MenuNav";
import { MainContent } from "./MainContent/MainContent";

export class App extends React.Component {

  history = []

  constructor(props) {
    super(props);

    this.state = {
      zoom:50,
      top:0,
      left:0,
      data:{
        x_name:"",
        y_name:"",
        chartName:null,
        chartType:"Scatter",
        colors:["#000000","#000000","#000000","#000000"],
        rows:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
        nrows:4,
        ncols:4,
        colnames:["y0", "y1", "y2", "y3"],
        rownames:["x0", "x1", "x2", "x3"]
      }
    };
  }

  setData = (data) => {
    this.setState({
      data:data
    });
  }

  setColNames = (arr) => {
    this.setState(prevState => ({
      data: {
          ...prevState.data,
          colnames: arr
      }
    }))
  }

  setRowNames = (arr) => {
    this.setState(prevState => ({
      data: {
          ...prevState.data,
          rownames: arr
      }
    }))
  }

  setColors = (arr) => {
    this.setState(prevState => ({
      data: {
          ...prevState.data,
          colors: arr
      }
    }))
  }

  setSize = (nr, nc) => {
    this.setState(prevState => ({
      data: {
          ...prevState.data,
          nrows:nr,
          ncols:nc
      }
    }))
  }

  setRows = (arr) => {
    this.setState(prevState => ({
      data: {
          ...prevState.data,
          rows: arr
      }
    }))
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

  clearData = () => {
    if(window.confirm("Do you want to delete all data?")){
      const data = {
        x_name:"",
        y_name:"",
        chartName:null,
        chartType:"Scatter",
        colors:[],
        rows:[],
        nrows:0,
        ncols:0,
        colnames:[],
        rownames:[]
      };

      this.setState({
        data:data
      })
    }
  }

  addRow = (rowname, row) => {
    let actualSize = this.size();
    this.setSize(actualSize[0]+1, actualSize[1]);

    let tmpRowNames = [...this.state.data.rownames, rowname];
    let tmpRows = [...this.state.data.rows, row];

    this.setState(prevState => ({
      data:{
        ...prevState.data,
        rownames: [...this.state.data.rownames, rowname],
        rows: [...this.state.data.rows, row]
      }
    }))
  }

  addCol = (colname, arr) => {
    let actualSize = this.size();
    this.setSize(actualSize[0], actualSize[1]+1);

    this.setState(prevState => ({
      data:{
        ...prevState.data,
        colnames: [...this.state.data.colnames, colname],
        colors:  [...this.state.data.colors, "#000000"]
      }
    }))

    const columnsNumber = this.size()[1];

    let tmp;

    this.state.data.rows.forEach((item, index) => {
        tmp = this.state.data.rows;
        tmp[index] = [...item, arr[index]]
        this.setState(prevState => ({
          data: {
              ...prevState.data,
              rows:tmp
          }
        }));
      }
    )
  }

  size = () => {
    return [this.state.data.nrows, this.state.data.ncols];
  }

  setValue = (r,c, val) => {
    let tmpRow = this.state.data.rows;
    tmpRow[r][c] = parseInt(val);

    this.setState(prevState => ({
      data: {
          ...prevState.data,
          rows:tmpRow
      }
    }));
  }

  setChartType = (chartType) => {
    this.setState(prevState => ({
      data: {
          ...prevState.data,
          chartType:chartType
      }
    }));
  }

  value = (r,c) => {
    return this.state.data.rows[r][c]
  }

  handleColorChange = (index, event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    let tmpColors = this.state.data.colors;
    tmpColors[index] = value;

    this.setState(prevState => ({
      data: {
          ...prevState.data,
          colors:tmpColors
      }
    }));
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



  setColumnName = (i, name) => {
    let tmpColnames = this.state.data.colnames;
    tmpColnames[i] = name;

    this.setState(prevState => ({
      data:{
        ...prevState.data,
        colnames: tmpColnames
      }
    }));
  }

  setRowName = (i, name) => {
    let tmpRowNames = this.state.data.rownames;
    tmpRowNames[i] = name;

    this.setState(prevState => ({
      data:{
        ...prevState.data,
        rownames: tmpRowNames
      }
    }));
  }


  render() {
    return (
      <main className="row m-0 p-0">
        <MenuNav
          setColors={this.setColors}
          data={this.state.data}
          setData={this.setData}

          colors={this.state.data.colors}
          rows={this.state.data.rows}
          nrows={this.state.data.nrows}
          ncols={this.state.data.ncols}
          colnames={this.state.data.colnames}
          rownames={this.state.data.rownames}
          chartType={this.state.data.chartType}

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
          setChartType={this.setChartType}

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
          chartType={this.state.data.chartType}
          colors={this.state.data.colors}
          data={this.state.data}
        />
      </main>
    );
  }
}
