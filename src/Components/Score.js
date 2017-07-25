import React, { Component } from 'react';
import { connect } from 'react-redux'

const Score = ({ level, score, progress }) => {
  return (
    <div className="Score" style={style}>
      Score: { score }<br />
      Level: { level }<br />
    </div>
  );
};

const mapStateToProps = ({ game: { score, level }}) => {
  return {
    score,
    level,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Score);

const style = {
  fontSize: '50px',
  fontWeight: 'bold',
  padding: '10px',
  // border: '1px solid black',
  float: 'right',
  height: '100px',
};
