import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './Board.css';

class Board extends Component {
  render() {
    if (!this.props.board.current) {
      return <div>no board</div>;
    }
    return (
      <div className="Board">
        {this.props.board.current.map((row, rowIndex) => (
          <div className="Row" key={`row-${rowIndex}`}>
            {row.map((cell, colIndex) => (
              <div className="Cell" key={`cell-${rowIndex}-${colIndex}`}>
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
