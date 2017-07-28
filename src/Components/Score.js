import React from 'react';
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
  fontSize: '30px',
  fontWeight: 'bold',
  float: 'left',
  paddingBottom: '20px'
};
