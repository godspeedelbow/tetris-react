import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';

const Score = (props) => {
  console.log('***** props', props)
  return (
    <div className="Score">{ props.score }</div>
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
