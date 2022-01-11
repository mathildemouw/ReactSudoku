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

class PuzzleBoard extends React.Component {
	constructor(props) {
		super(props);
		this.makePuzzleSquares()
		this.state = {
			fillOptions: [
			{value: 1, selected: 'not-selected'},
			{value: 2, selected: 'not-selected'},
			{value: 3, selected: 'not-selected'},
			{value: 4, selected: 'not-selected'}],
		}
	}

	makePuzzleSquares(){
		let puzzleSquares = this.props.squares;
		this.removeMirrorPair(puzzleSquares);
		this.isSingleSolution(puzzleSquares);
		return puzzleSquares
	}

	removeMirrorPair(puzzleSquares){
		const mirrorPairArray = [[0, 15],
		[1, 14],
		[4, 11],
		[5, 10],
		[2, 13],
		[3, 12],
		[6,9],
		[8,7]]

		let pairIndex = Math.floor(Math.random() * mirrorPairArray.length)
		puzzleSquares[mirrorPairArray[pairIndex][0]].value = null
		puzzleSquares[mirrorPairArray[pairIndex][1]].value = null
	}

	isSingleSolution(puzzleSquares) {
		let checkSolutionSquares = JSON.parse(JSON.stringify(puzzleSquares))
		for(let i = 0; i < checkSolutionSquares.length; i++){
			if(checkSolutionSquares[i].value === null) {
				//look at row
				this.compareRow(checkSolutionSquares, i)
				//look at column
				// this.compareColumn(checkSolutionSquares, i)
				//look at quadrant
				// this.compareQuadrant(checkSolutionSquares, i)
				console.log(checkSolutionSquares)
				//TODO later: what to do if you have to guess to solve it
			}
		}
	}

	compareRow(checkSolutionSquares, i){
		let fillOptions = [1,2,3,4]

		let row1indices = [0,1,4,5]
		let row2indices = [2,3, 6,7]
		let row3indices = [8,9,12,13]
		let row4indices = [10,11,14,15]
		if(row1indices.includes(i)){
			for(let j=0; j < row1indices.length; j++){
				const fillOptionsIndex = fillOptions.indexOf(checkSolutionSquares[row1indices[j]].value);
				if(fillOptionsIndex > -1){
					fillOptions.splice(fillOptionsIndex,1)
				}
			}
			if(fillOptions.length == 1){checkSolutionSquares[i].value = fillOptions[0]}
			fillOptions = [1,2,3,4]
		}
		if(row2indices.includes(i)){
			for(let j=0; j < row2indices.length; j++){
				const fillOptionsIndex = fillOptions.indexOf(checkSolutionSquares[row2indices[j]].value);
				if(fillOptionsIndex > -1){
					fillOptions.splice(fillOptionsIndex,1)
				}
			}
			if(fillOptions.length == 1){checkSolutionSquares[i].value = fillOptions[0]}
			fillOptions = [1,2,3,4]
		}
		if(row3indices.includes(i)){
			for(let j=0; j < row3indices.length; j++){
				const fillOptionsIndex = fillOptions.indexOf(checkSolutionSquares[row3indices[j]].value);
				if(fillOptionsIndex > -1){
					fillOptions.splice(fillOptionsIndex,1)
				}
			}
			if(fillOptions.length == 1){checkSolutionSquares[i].value = fillOptions[0]}
			fillOptions = [1,2,3,4]
		}
		if(row4indices.includes(i)){
			for(let j=0; j < row4indices.length; j++){
				const fillOptionsIndex = fillOptions.indexOf(checkSolutionSquares[row4indices[j]].value);
				if(fillOptionsIndex > -1){
					fillOptions.splice(fillOptionsIndex,1)
				}
			}
			if(fillOptions.length == 1){checkSolutionSquares[i].value = fillOptions[0]}
			fillOptions = [1,2,3,4]
		}

	}

	compareColumn(checkSolutionSquares, i){
		let fillOptions = [1,2,3,4]
		for(let j = 0; j < checkSolutionSquares.length; j++){
			if(
				//matches odd or even
				((Math.floor(j/2) == j/2) == (Math.floor(i/2) == i/2)) &&
				//matches %4 odd or even
				(((Math.floor(Math.floor(j/4)/2)) == (Math.floor(j/4)/2)) ==
								((Math.floor(Math.floor(i/4)/2)) == (Math.floor(i/4)/2)))
			){
				fillOptions.splice(fillOptions.indexOf(checkSolutionSquares[j].value),1)
			}
			if(fillOptions.length == 1){
				checkSolutionSquares[i].value = fillOptions[0]
				return fillOptions[0]
			}
		}
	}

	compareQuadrant(checkSolutionSquares, i){
		let fillOptions = [1,2,3,4]
		for(let j = 0; j < checkSolutionSquares.length; j++){
			if(Math.floor(j/4) == Math.floor(i/4)){
				if(fillOptions.indexOf(checkSolutionSquares[j].value) > -1){
					fillOptions.splice(fillOptions.indexOf(checkSolutionSquares[j].value),1)
				}
			}
			if(fillOptions.length == 1){
				checkSolutionSquares[i].value = fillOptions[0]
				return fillOptions[0]
			}
		}
	}

	handleSquareClick(i) {
		const puzzleSquares = this.props.squares.slice();
		puzzleSquares[i].selected = 'selected';

		this.setState({puzzleSquares: puzzleSquares})
	}

	handleFillOptionClick(i) {
		const fillOptions = this.state.fillOptions.slice();
		fillOptions[i].selected ='selected';

		this.setState({fillOptions: fillOptions})
	}

	renderSquare(i) {
		return <Square
			value={this.props.squares[i].value}
			selected={this.props.squares[i].selected}
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

class SolutionBoard extends React.Component {
		constructor(props) {
		super(props);
		this.state = {
			fillOptions: [
			{value: 1, selected: 'not-selected'},
			{value: 2, selected: 'not-selected'},
			{value: 3, selected: 'not-selected'},
			{value: 4, selected: 'not-selected'}],
		}
	}

	handleSquareClick(i) {
		const squares = this.props.squares.slice();
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
			value={this.props.squares[i].value}
			selected={this.props.squares[i].selected}
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
		</div>
		)
	}
}

class Game extends React.Component {
	constructor(props){
		super(props);
		const initialSquares = this.initialSquares();
		const copyInitialSquare = JSON.parse(JSON.stringify(initialSquares));
		this.state = {
			initialSolutionSquares: initialSquares.slice(),
			initialPuzzleSquares: copyInitialSquare.slice(),
		}
	}

	render () {
		return(
			<div className="game">
				<div className="game-board">
					<div className="section"><p>Puzzle:</p></div>
					<PuzzleBoard squares={this.state.initialPuzzleSquares} />
					<div className="section"><p>Solution:</p></div>
					<SolutionBoard squares={this.state.initialSolutionSquares} />
				</div>
			</div>
		)
	}

	initialSquares() {
		let squares = [
			{},{},{},{},
			{},{},{},{},
			{},{},{},{},
			{},{},{},{}
		]

		this.firstQuadrantSolution(squares);
		this.secondQuadrantSolution(squares);
		this.thirdQuadrantSolution(squares);
		this.fourthQuadrantSolution(squares);

// TODO this doesn't always prevent some null suares from sneaking in
		for(let i=0; i<squares.length; i++){
			if(squares[i].value === null){this.initialSquares()}
		}

		return squares;
	}

	firstQuadrantSolution(squares){
		let fillOptions = [1,2,3,4]
		for(let i=0; i<4; i++){
			squares[i].value = fillOptions.splice(Math.floor(Math.random() * fillOptions.length), 1)[0]
		}
		return squares;
	}

	secondQuadrantSolution(squares){
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

	thirdQuadrantSolution(squares){
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

	fourthQuadrantSolution(squares){
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

		squares[13].value = fillOptions[0]

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

		squares[15].value = fillOptions[0]
	}

}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

