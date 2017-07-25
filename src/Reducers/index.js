import { combineReducers } from 'redux'

import tetris, {
  blocks,
  canAddBlockToBoard,
  addBlockToBoard,
} from 'tetrisjs';

import range from 'lodash/range';
import shuffle from 'lodash/shuffle';

const initialState = {};

const initialGameState = {
  tickWait: 1000,
  playing: false,
};

function gameReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialGameState;
  }
  if (action.type === 'START_GAME') {
    return {
      ...state,
      playing: true,
    }
  }
  if (action.type === 'END_GAME') {
    return {
      ...state,
      playing: false,
    }
  }
  if (action.type === 'SPEED_UP') {
    const { payload: { tickWait } } = action;
    return {
      ...state,
      tickWait,
    }
  }

  return state;
}

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
    dispatch({
      type: 'START_GAME',
    });

    scheduleTick();
    function scheduleTick() {
      const { game: { tickWait } } = getState();
      setTimeout(() => {
        const { game: { playing } } = getState();
        if (!playing) return;

        tick()(dispatch, getState);
        scheduleTick();
      }, tickWait);
    }
  };
}

export function speedUp() {
  return (dispatch, getState) => {
    const { game: { tickWait } } = getState();
    const newTickWait = Math.max(tickWait - 100, 300);
    dispatch({
      type: 'SPEED_UP',
      payload: {
        tickWait: newTickWait
      }
    });
  };
}

export function endGame() {
  return {
    type: 'END_GAME',
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
      return console.log('no board defined');
    }

    if (!moveBlock('down')(dispatch, getState)) {
      if (!addBlock()(dispatch, getState)) {
        console.log('GAME OVER')
      }
    }
  };
}

export function addBlock() {
  return (dispatch, getState) => {
    const { board: { current: currentBoard, columns } } = getState();

    const randomBlockId = Math.floor(Math.random() * blocks.length);
    const block = blocks[randomBlockId];

    const blockRow = 0;
    const randomColumns = shuffle(range(columns));
    const blockCol = randomColumns.find(col => canAddBlockToBoard(currentBoard, block, blockRow, col));
    if (blockCol === undefined) {
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

    if (!block) {
      return;
    }

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

    if (!block) {
      return;
    }

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
  game: gameReducer,
});
