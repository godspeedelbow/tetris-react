import tetris, {
  blocks,
  canAddBlockToBoard,
  addBlockToBoard,
  getCompletedRows,
  removeRowsAndFill,
} from 'tetrisjs';

import range from 'lodash/range';
import shuffle from 'lodash/shuffle';

const initialState = {};

export default function boardReducer(state, action) {
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
  if (action.type === 'REMOVE_ROW') {
    const { board } = action.payload;
    return {
      ...state,
      current: board,
      previous: board,
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

    if (!block) {
      return;
    }

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

export function removeCompletedRows() {
    return (dispatch, getState) => {
      const {
        board: {
          current: board,
        },
      } = getState();
      const rows = getCompletedRows(board);
      if (!rows.length) return rows;
      dispatch({
        type: 'REMOVE_ROW',
        payload: {
          board: removeRowsAndFill(board, rows),
        }
      });
      return rows.length;
    };
}
