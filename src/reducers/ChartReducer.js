import * as types from '../constants/ActionTypes.js'
import undoable, { distinctState } from 'redux-undo'

const chartInfo = {
  top:0,
  left:0,
  legend:false
};

const ChartReducer = (state = chartInfo, action) => {
	switch (action.type) {
		case types.SET_LEGEND_VISIBILITY:
      return Object.assign({}, state, {
        legend: action.payload
      })

    case types.MOVE_TOP:
      let top1 = state.top;
      let y1 = top1-10;
      if(y1>=-200){
        return Object.assign({}, state, {
          top: y1
        })
      }
      return state

    case types.MOVE_BOTTOM:
      let top2 = state.top;
      let y2 = top2+10;
      if(y2<=200){
        return Object.assign({}, state, {
          top: y2
        })
      }
      return state;

    case types.MOVE_LEFT:
      let left1 = state.left;
      let y3 = left1-10;
      if(y3>=-200){
        return Object.assign({}, state, {
          left:y3
        })
      }
      return state;

    case types.MOVE_RIGHT:
        let left2 = state.left;
        let y4 = left2+10;
        if(y4<=200){
          return Object.assign({}, state, {
            left:y4
          })
        }
        return state;
    default:
      return state
	}
}
const undoableChartReducer = undoable(ChartReducer, {
  filter: distinctState()
})

export default undoableChartReducer
