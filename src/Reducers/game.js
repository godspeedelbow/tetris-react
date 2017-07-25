import { addBlock, moveBlock } from './board';

const initialGameState = {
  tickWait: 1000,
  playing: false,
};

export default function gameReducer(state, action) {
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

export function endGame() {
  return {
    type: 'END_GAME',
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

export function increaseScore() {
  return {
    type: 'INCREASE_SCORE',
    score: 100,
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
        console.log('GAME OVER');
        return dispatch(endGame());
      }
    }
  };
}