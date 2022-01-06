import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selected: "not-selected"
		};
	}

	render() {
		return (
			<button
			className={"square " + this.state.selected}
			onClick={() => this.select()}
			>
				{this.props.value}
			</button>
		)
	}

	select() {
		this.setState({
			selected: "selected",
		});
		// TODO let the board know i've been selected so it can handle seleection, unselect any other selected
		// styling wise, do i add a class?
	}
}

class FillOption extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selected: "not-selected"
		};
	}

	render() {
		return (
			<button className={"fill-option " + this.state.selected} onClick={() => this.select()}>
				{this.props.value}
			</button>
		)
	}

	select() {
		this.setState({
			selected: "selected",
		});
		// TODO let the board know i've been selected so it can try to fill the square and do so if the number works
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(1),
			fillOptions: [1,2,3,4],
		}
	}

	renderSquare(i) {
		return <Square value={this.state.squares[i]} />;
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

