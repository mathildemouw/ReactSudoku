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
			<button
				className={"fill-option " + this.props.selected}
				onClick={() => this.props.onClick()}
			>
				{this.props.value}
			</button>
		)
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: this.initialSquares(),
			fillOptions: [
			{value: 1, selected: 'not-selected'},
			{value: 2, selected: 'not-selected'},
			{value: 3, selected: 'not-selected'},
			{value: 4, selected: 'not-selected'}],
		}
	}

	initialSquares() {
		let squares = [
			{},{},{},{},
			{},{},{},{},
			{},{},{},{},
			{},{},{},{}
		]

		let fillOptions = [1,2,3,4]

		for(let i=0; i<16; i++){
			// if (fillOptions.length == 0) {
			// 	fillOptions = [1,2,3,4]
			// }
			// squares[i].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)

			squares[i].value = i
		}

		this.solveFirstQuadrant(squares);
		this.solveSecondQuadrant(squares);
		this.solveThirdQuadrant(squares);
		this.solveFourthQuadrant(squares);

		return squares;
	}

	solveFirstQuadrant(squares){
		let fillOptions = [1,2,3,4]
		for(let i=0; i<4; i++){
			squares[i].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)[0]
		}
		return squares;
	}

	solveSecondQuadrant(squares){
		let fillOptions = [1,2,3,4]
		let removeIndex = fillOptions.indexOf(squares[0].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[1].value)
		fillOptions.splice(removeIndex, 1)

		squares[4].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)[0]
		squares[5].value = fillOptions[0]

		fillOptions = [1,2,3,4]
		removeIndex = fillOptions.indexOf(squares[2].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[3].value)
		fillOptions.splice(removeIndex, 1)

		squares[6].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)[0]
		squares[7].value = fillOptions[0]
	}

	solveThirdQuadrant(squares){
		let fillOptions = [1,2,3,4]
		let removeIndex = fillOptions.indexOf(squares[0].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[2].value)
		fillOptions.splice(removeIndex, 1)

		squares[8].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)[0]
		squares[10].value = fillOptions[0]

		fillOptions = [1,2,3,4]
		removeIndex = fillOptions.indexOf(squares[1].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[3].value)
		fillOptions.splice(removeIndex, 1)

		squares[9].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)[0]
		squares[11].value = fillOptions[0]
	}

	solveFourthQuadrant(squares){
		let fillOptions = [1,2,3,4]
		let removeIndex = fillOptions.indexOf(squares[4].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[6].value)
		if(removeIndex!== -1){fillOptions.splice(removeIndex, 1)}
		removeIndex = fillOptions.indexOf(squares[8].value)
		if(removeIndex!== -1){fillOptions.splice(removeIndex, 1)}
		removeIndex = fillOptions.indexOf(squares[9].value)
		if(removeIndex!== -1){fillOptions.splice(removeIndex, 1)}

		squares[12].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)[0]

		fillOptions = [1,2,3,4]
		removeIndex = fillOptions.indexOf(squares[8].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[9].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[12].value)
		fillOptions.splice(removeIndex, 1)

		squares[13].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)[0]

		fillOptions = [1,2,3,4]
		removeIndex = fillOptions.indexOf(squares[4].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[6].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[12].value)
		fillOptions.splice(removeIndex, 1)

		squares[14].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)[0]

		fillOptions = [1,2,3,4]
		removeIndex = fillOptions.indexOf(squares[5].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[7].value)
		fillOptions.splice(removeIndex, 1)
		removeIndex = fillOptions.indexOf(squares[13].value)
		fillOptions.splice(removeIndex, 1)

		squares[15].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)[0]
	}

	handleSquareClick(i) {
		const squares = this.state.squares.slice();
		squares[i].selected = 'selected';

		this.setState({squares: squares})
	}

	handleFillOptionClick(i) {
		const fillOptions = this.state.fillOptions.slice();
		fillOptions[i].selected ='selected';

		this.setState({fillOptions: fillOptions})
	}

	renderSquare(i) {
		return <Square
			value={this.state.squares[i].value}
			selected={this.state.squares[i].selected}
			onClick={() => this.handleSquareClick(i)}
		/>;
	}

	renderFillOption(i) {
		return <FillOption
			value={this.state.fillOptions[i].value}
			selected={this.state.fillOptions[i].selected}
			onClick={() => this.handleFillOptionClick(i)}
		/>;
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
				{this.renderFillOption(0)}
				{this.renderFillOption(1)}
				{this.renderFillOption(2)}
				{this.renderFillOption(3)}
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

