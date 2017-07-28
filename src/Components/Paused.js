import React from 'react';
import { connect } from 'react-redux'

import {
  togglePlaying,
} from '../Reducers/game';


const Paused = ({ paused, togglePlaying }) => {
  if (!paused) return null;
  return (
    <div style={style.container}>
      <div style={style.title}>Paused</div>
      <button style={style.button} onClick={togglePlaying}>Resume</button>
    </div>
  );
};

const mapStateToProps = ({ game: { paused }}) => {
  return {
    paused,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    togglePlaying: () => dispatch(togglePlaying()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Paused);

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
