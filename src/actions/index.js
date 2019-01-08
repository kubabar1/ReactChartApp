import * as types from '../constants/ActionTypes.js'

export const setValue = (r, c, val) => ({
  type: types.SET_VALUE,
  payload: {r, c, val}
})

export const changeColor = (index, color) => ({
  type: types.CHANGE_COLOR,
  payload: {index, color}
})

export const setColumnName = (index, columnName) => ({
  type: types.SET_COLUMN_NAME,
  payload: {index, columnName}
})

export const setRowName = (index, rowName) => ({
  type: types.SET_ROW_NAME,
  payload: {index, rowName}
})

export const addRow = (rowname, row) => ({
  type: types.ADD_ROW,
  payload: {rowname, row}
})

export const addCol = (colname, col) => ({
  type: types.ADD_COL,
  payload: {colname, col}
})

export const clearData = () => ({
  type: types.CLEAR_DATA
})

export const setData = (data) => ({
  type: types.SET_DATA,
  payload: data
})

export const setXAxisName = (xAxisName) => ({
  type: types.SET_X_AXIS_NAME,
  payload: xAxisName
})

export const setYAxisName = (yAxisName) => ({
  type: types.SET_Y_AXIS_NAME,
  payload: yAxisName
})

export const setChartType = (chartType) => ({
  type: types.SET_CHART_TYPE,
  payload: chartType
})

export const setChartName = (chartName) => ({
  type: types.SET_CHART_NAME,
  payload: chartName
})

export const setLegendVisibility = (legendVisibility) => ({
  type: types.SET_LEGEND_VISIBILITY,
  payload: legendVisibility
})

export const moveTop = () => ({
  type: types.MOVE_TOP
})

export const moveBottom = () => ({
  type: types.MOVE_BOTTOM
})

export const moveLeft = () => ({
  type: types.MOVE_LEFT
})

export const moveRight = () => ({
  type: types.MOVE_RIGHT
})
