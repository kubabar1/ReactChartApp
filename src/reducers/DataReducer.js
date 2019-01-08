import * as types from '../constants/ActionTypes.js'
import undoable, { distinctState } from 'redux-undo'

const data = {
    x_name:"",
    y_name:"",
    chartName:"",
    chartType:"Scatter",
    colors:["#000000","#000000","#000000","#000000"],
    rows:[[0,1,2,3],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
    nrows:4,
    ncols:4,
    colnames:new Array("y0", "y1", "y2", "y3"),
    rownames:["x0", "x1", "x2", "x3"]
};

const copy = (src) => {
    return JSON.parse(JSON.stringify(src));
}

const copyMultidimensionalArray = (currentArray) => {
  let newArray = [];

  for (let i = 0; i < currentArray.length; i++)
    newArray[i] = currentArray[i].slice();

  return newArray;
}

const DataReducer = (state = data, action) => {
	switch (action.type) {
		case types.ADD_ROW:
			let nrowsTmp = state.nrows + 1;
			return Object.assign({}, state, {
				nrows: nrowsTmp,
        rownames: [...state.rownames, action.payload.rowname],
				rows: [...state.rows, action.payload.row]
      })

    case types.ADD_COL:
			let ncolsTmp = state.ncols + 1;
			let tmpRows = copyMultidimensionalArray(state.rows);
			state.rows.forEach((item, index) => {
					tmpRows[index] = [...item, action.payload.col[index]]
				}
			)
			return Object.assign({}, state, {
				ncols: ncolsTmp,
				colnames: [...state.colnames, action.payload.colname],
				colors:  [...state.colors, "#000000"],
				rows: tmpRows
      })

    case types.SET_COLUMN_NAME:
			let tmpColnames = copy(state.colnames);
			tmpColnames[action.payload.index] = action.payload.columnName;
  		return Object.assign({}, state, {
        colnames: tmpColnames
      })

    case types.SET_ROW_NAME:
			let tmpRownames = copy(state.rownames);
			tmpRownames[action.payload.index] = action.payload.rowName;
  		return Object.assign({}, state, {
        rownames: tmpRownames
      })

    case types.SET_VALUE:
			let tmpRow = copyMultidimensionalArray(state.rows);
			tmpRow[action.payload.r][action.payload.c] = parseFloat(action.payload.val);
			return Object.assign({}, state, {
        rows: tmpRow
      })

		case types.CHANGE_COLOR:
			let tmpColors = copy(state.colors);
			tmpColors[action.payload.index] = action.payload.color;
			return Object.assign({}, state, {
        colors: tmpColors
      })

		case types.CLEAR_DATA:
			if(window.confirm("Do you want to delete all data?")){
				const data = {
			    	x_name:"",
			    	y_name:"",
			    	chartName:"",
			    	chartType:"Scatter",
			    	colors:[],
			    	rows:[],
			    	nrows:0,
			    	ncols:0,
			    	colnames:[],
			    	rownames:[]
				};

				return Object.assign({}, state, data)
			}
			return state

		case types.SET_DATA:
			return Object.assign({}, state, action.payload)

		case types.SET_X_AXIS_NAME:
			return Object.assign({}, state, {
				x_name: action.payload
			})

		case types.SET_Y_AXIS_NAME:
			return Object.assign({}, state, {
				y_name: action.payload
			})

		case types.SET_CHART_TYPE:
			return Object.assign({}, state, {
				chartType: action.payload
			})

		case types.SET_CHART_NAME:
			return Object.assign({}, state, {
				chartName: action.payload
			})
	}
	return state
}

const undoableDataReducer = undoable(DataReducer, {
  filter: distinctState()
})

export default undoableDataReducer;
