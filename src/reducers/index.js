import { combineReducers } from 'redux';
import DataReducer from './DataReducer.js'
import ChartReducer from './ChartReducer.js'

const rootReducer = combineReducers({
	data: DataReducer,
	chartInfo: ChartReducer
});

export default rootReducer;
