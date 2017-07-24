import React, { Component } from 'react';
import { connect } from 'react-redux'

import logo from './logo.svg';

import Board from './Board';

import boardReducer, { createBoard, addBlock, dropBlock, moveBlock, rotateBlock, tick, startGame } from './Reducers/index.js';

import tetris, {
  blocks,
  canAddBlockToBoard,
  addBlockToBoard,
} from 'tetrisjs';

class App extends Component {
  constructor(props) {
    super(props);

    this.rows = 10;
    this.columns = 10;

    this.props.createBoard(this.rows, this.columns);
    this.props.startGame();

    this.addBlock = this.props.addBlock.bind(this);
    this.rotateBlock = this.props.rotateBlock.bind(this);
    this.dropBlock = this.props.dropBlock.bind(this);
    this.moveRight = this.props.moveBlock.bind(this, 'right');
    this.moveLeft = this.props.moveBlock.bind(this, 'left');
    this.moveDown = this.props.moveBlock.bind(this, 'down');
    this.tick = this.props.tick.bind(this);
  }
  render() {
    return (
      <div className="App">
        <Board />
        <button className="AddBlock" onClick={this.addBlock} style={{clear:'both', float: 'left', color: 'red'}}>add block</button>
        <button className="MoveBlockDown" onClick={this.moveDown} style={{clear:'both', float: 'left', color: 'gold'}}>down</button>
        <button className="MoveBlockRight" onClick={this.moveRight} style={{clear:'both', float: 'left', color: 'green'}}>right</button>
        <button className="MoveBlockLeft" onClick={this.moveLeft} style={{clear:'both', float: 'left', color: 'red'}}>left</button>
        <button className="RotateBlock" onClick={this.rotateBlock} style={{clear:'both', float: 'left', color: 'purple'}}>rotate</button>
        <button className="DropBlock" onClick={this.dropBlock} style={{clear:'both', float: 'left', color: 'orange'}}>drop</button>
        <button className="Tick" onClick={this.tick} style={{clear:'both', float: 'left', color: 'blue'}}>tick</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createBoard: (rows, cols) => {
      dispatch(createBoard(rows, cols))
    },
    addBlock: (rows, cols) => {
      dispatch(addBlock(rows, cols))
    },
    dropBlock: () => dispatch(dropBlock()),
    moveBlock: direction => dispatch(moveBlock(direction)),
    rotateBlock: () => dispatch(rotateBlock()),
    tick: () => dispatch(tick()),
    startGame: () => dispatch(startGame()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
