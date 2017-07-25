const initialState = {};

export default function blockReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  if (action.type === 'START_GAME') {
    return {
    };
  }
  if (action.type === 'ADD_BLOCK') {
    const { block, blockId, blockRow, blockCol } = action.payload;
    return {
      ...state,
      id: blockId,
      row: blockRow,
      column: blockCol,
      current: block,
    };
  }
  if (action.type === 'DROP_BLOCK') {
    return {
    };
  }
  if (action.type === 'MOVE_BLOCK') {
    const { blockCol, blockRow } = action.payload;
    return {
      ...state,
      row: blockRow,
      column: blockCol,
    }
  }
  if (action.type === 'ROTATE_BLOCK') {
    const { block } = action.payload;
    return {
      ...state,
      current: block,
    }
  }
  return state;
}
