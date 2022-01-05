import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
	render() {
		return (
			<button className="square">
				{this.props.value}
			</button>
		)
	}
}

class FillOption extends React.Component {
	render() {
		return (
			<button className="fill-option">
				{this.props.value}
			</button>
		)
	}
}

class Board extends React.Component {
	renderSquare(i) {
		return <Square value={i} />;
	}

	renderFillOption(i) {
		return <FillOption value={i} />
	}

	render() {
		return (
		<div>
			<div className="section-row">
				
				<div className="section1">
					<div className="square-row">
						{this.renderSquare(1)}
						{this.renderSquare(2)}
					</div>

					<div className="square-row">
						{this.renderSquare(3)}
						{this.renderSquare(4)}
					</div>

				</div>

				<div className="section2">
					<div className="square-row">
						{this.renderSquare(0)}
						{this.renderSquare(0)}
					</div>

					<div className="square-row">
						{this.renderSquare(0)}
						{this.renderSquare(0)}
					</div>

				</div>

			</div>

			<div className="section-row">
				
				<div className="section3">
					<div className="square-row">
						{this.renderSquare(0)}
						{this.renderSquare(0)}
					</div>

					<div className="square-row">
						{this.renderSquare(0)}
						{this.renderSquare(0)}
					</div>

				</div>

				<div className="section4">
					<div className="square-row">
						{this.renderSquare(0)}
						{this.renderSquare(0)}
					</div>

					<div className="square-row">
						{this.renderSquare(0)}
						{this.renderSquare(0)}
					</div>

				</div>

			</div>

			<div className="fill-options-nav">
				{this.renderFillOption(1)}
				{this.renderFillOption(2)}
				{this.renderFillOption(3)}
				{this.renderFillOption(4)}
			</div>
		</div>
		)
	}
}

class Game extends React.Component {
	render () {
		return(
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
			</div>
		)
	}
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

