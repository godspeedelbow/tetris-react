import React, { Component } from 'react';
import { connect } from 'react-redux'

import logo from './logo.svg';

import Board from './Board';

import boardReducer, {
  createBoard,
  addBlock,
  dropBlock,
  moveBlock,
  rotateBlock,
  tick,
  startGame,
} from './Reducers/index.js';

import KeyHandler, { KEYDOWN } from 'react-key-handler';

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
  toggleMenu(event) {
    event.preventDefault();
    alert(event);
  }
  render() {
    return (
      <div className="App">
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowDown" onKeyHandle={this.moveDown} />
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowLeft" onKeyHandle={this.moveLeft} />
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowRight" onKeyHandle={this.moveRight} />
        <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowUp" onKeyHandle={this.rotateBlock} />
        <KeyHandler keyEventName={KEYDOWN} keyValue=" " onKeyHandle={this.dropBlock} />
        <Board />
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
