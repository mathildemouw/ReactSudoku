import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
	render() {
		return (
			<button
			className={"square " + this.props.selected}
			onClick={() => this.props.onClick()}
			>
				{this.props.value}
			</button>
		)
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
			squares: this.initialSquares(),
			fillOptions: [1,2,3,4],
		}
	}

	initialSquares() {
		let squares =
			[{},{},{},{},
			{},{},{},{},
			{},{},{},{},
			{},{},{},{}]

		let fillOptions = [1,2,3,4]

		for(let i=0; i<16; i++){
			if (fillOptions.length == 0) {
				fillOptions = [1,2,3,4]
			}
			squares[i].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)
		}

		return squares;
	}

	handleClick(i) {
		const squares = this.state.squares.slice();
		squares[i].selected = 'selected'

		this.setState({squares: squares})
		console.log('click!')
	}

	renderSquare(i) {
		return <Square
			value={this.state.squares[i].value}
			selected={this.state.squares[i].selected}
			onClick={() => this.handleClick(i)}
		/>;
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
						{this.renderSquare(0)}
						{this.renderSquare(1)}
					</div>

					<div className="square-row">
						{this.renderSquare(2)}
						{this.renderSquare(3)}
					</div>

				</div>

				<div className="section2">
					<div className="square-row">
						{this.renderSquare(4)}
						{this.renderSquare(5)}
					</div>

					<div className="square-row">
						{this.renderSquare(6)}
						{this.renderSquare(7)}
					</div>

				</div>

			</div>

			<div className="section-row">
				
				<div className="section3">
					<div className="square-row">
						{this.renderSquare(8)}
						{this.renderSquare(9)}
					</div>

					<div className="square-row">
						{this.renderSquare(10)}
						{this.renderSquare(11)}
					</div>

				</div>

				<div className="section4">
					<div className="square-row">
						{this.renderSquare(12)}
						{this.renderSquare(13)}
					</div>

					<div className="square-row">
						{this.renderSquare(14)}
						{this.renderSquare(15)}
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

