import React, { Component } from 'react';
import { connect } from 'react-redux'

import Paused from './Paused';
import GameOver from './GameOver';
import Row from './Row';

class Board extends Component {
  render() {
    if (!this.props.board.current) {
      return <div>no board</div>;
    }
    return (
      <div className="Board" style={styles.board}>
        <Paused />
        <GameOver />
        {this.props.board.current.map((row, rowIndex) => (
          <Row
            row={row}
            rowIndex={rowIndex}
            key={`row-${rowIndex}`}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Board);

const styles = {
  board: {
    textAlign: 'center',
    float: 'left',
  },
};
