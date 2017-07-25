import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  startGame,
} from '../Reducers/game';


const GameOver = ({ playing, startGame }) => {
  if (playing) return null;
  return (
    <div style={style.container}>
      <div style={style.title}>Game Over</div>
      <button style={style.button} onClick={startGame}>Play again</button>
    </div>
  );
};

const mapStateToProps = ({ game: { playing }}) => {
  return {
    playing,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch(startGame()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameOver);

const style = {
  container: {
    position: 'absolute',
    top: 200,
    left: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  button: {
    marginTop: 10,
    border: 'none',
    fontSize: '20px',
    backgroundColor: 'lime',
    borderRadius: '5px',
    padding: '5px 10px',
    textTransform: 'uppercase'
  }
};
