import { createBoard, addBlock, moveBlock, removeCompletedRows } from './board';

const initialGameState = {
  level: 1,
  score: 0,
  scoreSinceLevelUp: 0,
  tickWait: 1000,
  playing: 0, // game number
  paused: false,
};

export default function gameReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialGameState;
  }
  if (action.type === 'START_GAME') {
    return {
      ...initialGameState,
      playing: initialGameState.playing + 1,
    };
  }
  if (action.type === 'END_GAME') {
    return {
      ...state,
      playing: 0,
    };
  }
  if (action.type === 'PAUSE_GAME') {
    return {
      ...state,
      paused: true,
    };
  }
  if (action.type === 'RESUME_GAME') {
    return {
      ...state,
      paused: false,
    };
  }

  if (action.type === 'LEVEL_UP') {
    const { payload: { tickWait } } = action;
    return {
      ...state,
      level: state.level + 1,
      scoreSinceLevelUp: 0,
      tickWait,
    };
  }
  if (action.type === 'INCREASE_SCORE') {
    const { payload: { score } } = action;
    return {
      ...state,
      score: state.score + score,
      scoreSinceLevelUp: state.scoreSinceLevelUp + score
    };
  }
  return state;
}

export function startGame() {
  return (dispatch, getState) => {
    dispatch(createBoard(20, 10));

    dispatch({
      type: 'START_GAME',
    });

    const { game: { playing: gameNumber } } = getState();
    scheduleTick();
    function scheduleTick() {
      const { game: { tickWait } } = getState();
      setTimeout(() => {
        const { game: { playing: activeGameNumber, paused } } = getState();
        if (activeGameNumber !== gameNumber) return;

        !paused && tick()(dispatch, getState);
        scheduleTick();
      }, tickWait);
    }
  };
}

export function endGame() {
  return {
    type: 'END_GAME',
  };
}

export function togglePlaying() {
  return (dispatch, getState) => {
    const { game: { paused, playing } } = getState();
    if (!playing) return;
    if (!paused) {
      dispatch({
        type: 'PAUSE_GAME',
      });
    } else {
      dispatch({
        type: 'RESUME_GAME',
      });
    }
  };
}


export function levelUp() {
  return (dispatch, getState) => {
    const { game: { tickWait, scoreSinceLevelUp } } = getState();
    if (scoreSinceLevelUp < 1000) return;
    const newTickWait = Math.max(tickWait - 100, 300);
    dispatch({
      type: 'LEVEL_UP',
      payload: {
        tickWait: newTickWait
      }
    });
  };
}

export function increaseScore(removedRows) {
  return {
    type: 'INCREASE_SCORE',
    payload: { score: 2 ** removedRows * 100 }
  };
}

export function tick() {
  return (dispatch, getState) => {
    const {
      board: {
        previous: board,
      },
    } = getState();

    if (!board) {
      return console.log('no board defined');
    }

    if (!moveBlock('down')(dispatch, getState)) {
      const removedRows = removeCompletedRows()(dispatch, getState);
      if (removedRows > 0) {
        dispatch(increaseScore(removedRows));
        levelUp()(dispatch, getState);
      }
      if (!addBlock()(dispatch, getState)) {
        console.log('GAME OVER');
        return dispatch(endGame());
      }
    }
  };
}
