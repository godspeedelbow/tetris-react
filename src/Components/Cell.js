import React, { Component } from 'react';

export default ({ cell }) => {
  const style = cell ? styles.color(cell) : styles.emptyCell;
  return (
    <div
      className="Cell"
      style={{...styles.cell, ...style }}
    />
  );
}

const colors = [
  '#00008B', // 'darkblue',
  '#DC143C', // 'crimson',
  '#32CD32', // 'limegreen',
  '#8B008B', // 'darkmagenta'
  '#FF8C00', // 'darkorange'
  '#008B8B', // 'cyan',
  '#FF1493', // 'deeppink',
];

const styles = {
  cell: {
    width: '50px',
    height: '50px',
    float: 'left',
  },
  emptyCell: {
    border: '1px solid #ddd',
    backgroundColor: '#eee'
  },
  color: cell => {
    const color = colors[cell - 1];
    return {
      color,
      backgroundColor: color,
      border: '1px solid ' + color,
    }
  }
};
