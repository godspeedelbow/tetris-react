import React, { Component } from 'react';
import { connect } from 'react-redux'

const Score = ({ score }) => {
  return (
    <div className="Score">{ score }</div>
  );
};

const mapStateToProps = ({ game: { score }}) => {
  return {
    score,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Score);
