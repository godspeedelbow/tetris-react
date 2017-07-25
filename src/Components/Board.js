import React, { Component } from 'react';
import { connect } from 'react-redux'

import Cell from './Cell';
import GameOver from './GameOver';

class Board extends Component {
  render() {
    if (!this.props.board.current) {
      return <div>no board</div>;
    }
    return (
      <div className="Board" style={styles.board}>
        <GameOver />
        {this.props.board.current.map((row, rowIndex) => (
          <div className="Row" key={`row-${rowIndex}`} style={styles.row}>
            {row.map((cell, colIndex) => (
              <Cell
                key={`cell-${rowIndex}-${colIndex}`}
                cell={cell}
              />
            ))}
          </div>
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
  row: {
    clear: 'both',
  },
};
