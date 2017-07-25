import { combineReducers } from 'redux'

import block from './block'
import board from './board'
import game from './game'

export default combineReducers({
  block,
  board,
  game,
});
