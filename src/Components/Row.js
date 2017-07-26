import React, { Component } from 'react';

import isEqual from 'lodash/isEqual';

import Cell from './Cell';

export default class Row extends Component {
  shouldComponentUpdate({ row }) {
    return !isEqual(row, this.props.row);
  }
  render() {
    const { row, rowIndex } = this.props;
    return (
      <div className="Row" style={styles.row}>
        {row.map((cell, colIndex) => (
          <Cell
            key={`cell-${rowIndex}-${colIndex}`}
            cell={cell}
          />
        ))}
      </div>
    );
  }
}

const styles = {
  row: {
    clear: 'both',
  },
};
