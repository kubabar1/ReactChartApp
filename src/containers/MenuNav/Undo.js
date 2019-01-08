import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'
import {MenuItem} from "./MenuItem.js"

let Undo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <MenuItem icon="fas fa-undo" name="Undo" clickMenu={onUndo} disabledButton={!canUndo}/>
)

const mapStateToProps = state => {
  return {
    canUndo: state.data.past.length > 0,
    canRedo: state.data.future.length > 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
}

Undo = connect(
  mapStateToProps,
  mapDispatchToProps
)(Undo)

export default Undo
