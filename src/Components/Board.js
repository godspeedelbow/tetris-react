import React, { Component } from 'react';
import { connect } from 'react-redux'

class Board extends Component {
  render() {
    if (!this.props.board.current) {
      return <div>no board</div>;
    }
    return (
      <div className="Board" style={styles.board}>
        {this.props.board.current.map((row, rowIndex) => (
          <div className="Row" key={`row-${rowIndex}`} style={styles.row}>
            {row.map((cell, colIndex) => (
              <div className="Cell" key={`cell-${rowIndex}-${colIndex}`} style={styles.cell}>
                {cell ? cell : '.'}
              </div>
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
  },
  row: {
    clear: 'both',
  },
  cell: {
    width: '20px',
    float: 'left',
  },
};
