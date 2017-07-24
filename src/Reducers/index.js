import { combineReducers } from 'redux'

import tetris, {
  blocks,
  canAddBlockToBoard,
  addBlockToBoard,
} from 'tetrisjs';

const initialState = {};

function boardReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  if (action.type === 'CREATE_BOARD') {
    const { board, rows, columns } = action.payload;
    return {
      ...state,
      previous: board,
      current: board,
      rows,
      columns,
    }
  }
  if (action.type === 'ADD_BLOCK') {
    const { board } = action.payload;
    return {
      ...state,
      current: board,
      previous: state.current,
    }
  }
  if (action.type === 'DROP_BLOCK') {
    const { board } = action.payload;
    return {
      ...state,
      current: board,
      previous: board,
    };
  }
  if (action.type === 'MOVE_BLOCK') {
    const { board } = action.payload;
    return {
      ...state,
      current: board,
    }
  }
  if (action.type === 'ROTATE_BLOCK') {
    const { board } = action.payload;
    return {
      ...state,
      current: board,
    }
  }

  return state;
}

function blockReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
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

export function createBoard(rows, columns) {
  const board = tetris.createBoard(rows, columns);

  return {
    type: 'CREATE_BOARD',
    payload: {
      board,
      rows,
      columns,
    }
  };
}

export function startGame() {
  return (dispatch, getState) => {
    function scheduleTick() {
      setTimeout(() => {
        tick()(dispatch, getState);
        scheduleTick();
      }, 1000);
    }
    scheduleTick();
  };
}

export function tick() {
  return (dispatch, getState) => {
    const {
      board: {
        previous: board,
      },
      block: {
        current: block,
      }
    } = getState();

    if (!board) {
      console.log('no board defined');
    }

    if (!block) {
      return addBlock()(dispatch, getState);
    }

    if (!moveBlock('down')(dispatch, getState)) {
      addBlock()(dispatch, getState);
    }
  };
}

export function addBlock() {
  return (dispatch, getState) => {
    const { board: { current: currentBoard, columns } } = getState();
    const blockRow = 0;
    const blockCol = Math.floor(Math.random() * columns);
    const randomBlockId = Math.floor(Math.random() * blocks.length);
    const block = blocks[randomBlockId];

    if (!canAddBlockToBoard(currentBoard, block, blockRow, blockCol)) {
      console.log('cannot add random block to random location');
      return false;
    }

    return dispatch({
      type: 'ADD_BLOCK',
      payload: {
        blockId: randomBlockId,
        block,
        blockRow,
        blockCol,
        board: addBlockToBoard(currentBoard, block, blockRow, blockCol),
      }
    });
  };
}

export function dropBlock() {
  return (dispatch, getState) => {
    const {
      board: {
        previous: previousBoard
      },
      block: {
        current: block,
        row: blockRow,
        column: blockCol
      }
    } = getState();

    let lowestRow = blockRow;
    while (canAddBlockToBoard(previousBoard, block, lowestRow + 1, blockCol)) {
      lowestRow++;
    }
    return dispatch({
      type: 'DROP_BLOCK',
      payload: {
        board: addBlockToBoard(previousBoard, block, lowestRow, blockCol),
      }
    });
  };
}

export function moveBlock(direction) {
  return (dispatch, getState) => {
    const {
      board: {
        previous: previousBoard,
      },
    } = getState();

    let {
      block: {
        row: blockRow,
        column: blockCol,
        current: block,
      }
    } = getState();

    if (direction === 'down') {
      blockRow++;
    }
    if (direction === 'right') {
      blockCol++;
    }
    if (direction === 'left') {
      blockCol--;
    }

    if (!canAddBlockToBoard(previousBoard, block, blockRow, blockCol)) {
      console.log('cannot move block');
      return false;
    }

    return dispatch({
      type: 'MOVE_BLOCK',
      payload: {
        blockRow,
        blockCol,
        board: addBlockToBoard(previousBoard, block, blockRow, blockCol),
      },
    });
  };
}

export function rotateBlock() {
  return (dispatch, getState) => {
    const {
      board: {
        previous: previousBoard
      },
      block: {
        current: block,
        row: blockRow,
        column: blockCol
      }
    } = getState();
    const rotatedBlock = tetris.rotateBlock(block);
    if (!canAddBlockToBoard(previousBoard, rotatedBlock, blockRow, blockCol)) {
      console.log('cannot rotate block');
      return false;
    }
    return dispatch({
      type: 'ROTATE_BLOCK',
      payload: {
        block: rotatedBlock,
        board: addBlockToBoard(previousBoard, rotatedBlock, blockRow, blockCol),
      }
    });
  };
};

export default combineReducers({
  board: boardReducer,
  block: blockReducer,
});
