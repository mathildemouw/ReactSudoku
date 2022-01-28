import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'animate.css';


function CountExample() {
  const [count, setCount] = useState(0);

  useEffect(() => { document.title = `You clicked ${count} times`; }, [count]
  );
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );}

class Square extends React.Component {
	render() {
		return (
			<button
			className={"square " + this.props.selected + " " + this.props.answerStatus}
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
				className={"fill-option animate__animated animate__bounce " + this.props.selected}
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
			selectedSquareIndex: null,
			selectedFillOptionIndex: null,
		}
	}

	makePuzzleSquares(){
		let puzzleSquares = this.props.squares;
		this.removeMirrorPair(puzzleSquares);
		this.removeMirrorPair(puzzleSquares);
		this.removeMirrorPair(puzzleSquares);
		this.removeMirrorPair(puzzleSquares);
		// this.isSingleSolution(puzzleSquares)
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
		let unsolvedSquares = 0
		for(let i = 0; i < checkSolutionSquares.length; i++){
			if(checkSolutionSquares[i].value === null) {
				unsolvedSquares += 1
				//look at row
				this.compareRows(checkSolutionSquares, i)
				//look at column
				this.compareColumns(checkSolutionSquares, i)
				//look at quadrant
				this.compareQuadrants(checkSolutionSquares, i)
				if(checkSolutionSquares[i].value != null){unsolvedSquares -= 1}
			}
		}
		return unsolvedSquares === 0;
		//TODO later: what to do if you have to guess to solve it
		// TODO: what to do if you have to cycle through more than once
		//TODO: see that it fails when the puzzle can't be solved
	}

	compareRows(checkSolutionSquares, i){
		let fillOptions = [1,2,3,4]

		let row1indices = [0,1,4,5]
		let row2indices = [2,3, 6,7]
		let row3indices = [8,9,12,13]
		let row4indices = [10,11,14,15]
		if(row1indices.includes(i)){
			this.compareRow(checkSolutionSquares, i, row1indices, fillOptions);
		}
		if(row2indices.includes(i)){
			this.compareRow(checkSolutionSquares, i, row2indices, fillOptions);
		}
		if(row3indices.includes(i)){
			this.compareRow(checkSolutionSquares, i, row3indices, fillOptions);
		}
		if(row4indices.includes(i)){
			this.compareRow(checkSolutionSquares, i, row4indices, fillOptions);
		}
	}

	compareRow(checkSolutionSquares, i, rowindices, fillOptions){
		for(let j=0; j < rowindices.length; j++){
			const fillOptionsIndex = fillOptions.indexOf(checkSolutionSquares[rowindices[j]].value);
			if(fillOptionsIndex > -1){
				fillOptions.splice(fillOptionsIndex,1)
			}
		}
		if(fillOptions.length === 1){checkSolutionSquares[i].value = fillOptions[0]}
		fillOptions = [1,2,3,4]
	}

	compareColumns(checkSolutionSquares, i){
		let fillOptions = [1,2,3,4]
		for(let j = 0; j < checkSolutionSquares.length; j++){
			if(
				//matches odd or even
				((Math.floor(j/2) === j/2) === (Math.floor(i/2) === i/2)) &&
				//matches %4 odd or even
				(((Math.floor(Math.floor(j/4)/2)) === (Math.floor(j/4)/2)) ===
								((Math.floor(Math.floor(i/4)/2)) === (Math.floor(i/4)/2)))
			){
				fillOptions.splice(fillOptions.indexOf(checkSolutionSquares[j].value),1)
			}
			if(fillOptions.length === 1){
				checkSolutionSquares[i].value = fillOptions[0]
				return fillOptions[0]
			}
		}
	}

	compareQuadrants(checkSolutionSquares, i){
		let fillOptions = [1,2,3,4]
		for(let j = 0; j < checkSolutionSquares.length; j++){
			if(Math.floor(j/4) === Math.floor(i/4)){
				if(fillOptions.indexOf(checkSolutionSquares[j].value) > -1){
					fillOptions.splice(fillOptions.indexOf(checkSolutionSquares[j].value),1)
				}
			}
			if(fillOptions.length === 1){
				checkSolutionSquares[i].value = fillOptions[0]
				return fillOptions[0]
			}
		}
	}

	handleSquareClick(i) {
		//unselect previous square
		if(this.state.selectedSquareIndex != null){this.unSelectSquare(this.state.selectedSquareIndex)}
		const puzzleSquares = this.props.squares.slice();
		//mark square selected
		puzzleSquares[i].selected = 'selected';

		//if fillOption chosen and square is blank, attempt to fill
		if (puzzleSquares[i].value == null){
			this.attemptToFill(i)
		}

		this.setState({selectedSquareIndex: i, puzzleSquares: puzzleSquares})
	}

	unSelectSquare(i) {
		const puzzleSquares = this.props.squares.slice();
		puzzleSquares[i].selected = 'unselected';

		this.setState({selectedSquareIndex: null, puzzleSquares: puzzleSquares})
	}

	attemptToFill(puzzleSquareIndex){
		const puzzleSquares = this.props.squares.slice();
		//fill in with number
		//find column, row, quadrant and check whether fill option is a possible option
		// if it is, style as a possible correct
		// if it isn't, style as incorrect
		if (this.state.selectedFillOptionIndex != null) {
			const fillValue = this.state.fillOptions[this.state.selectedFillOptionIndex].value
			if(this.notInColumn(fillValue, puzzleSquareIndex) && this.notInRow(fillValue, puzzleSquareIndex) && this.notInQuadrant(fillValue, puzzleSquareIndex)){
				puzzleSquares[puzzleSquareIndex].answerStatus = 'correct';
			}else{puzzleSquares[puzzleSquareIndex].answerStatus = 'incorrect';}
			puzzleSquares[puzzleSquareIndex].value = this.state.fillOptions[this.state.selectedFillOptionIndex].value
		}
	}

	notInQuadrant(fillValue, puzzleSquareIndex){
		return true
	}

	notInRow(fillValue, puzzleSquareIndex){
		return true
	}

	notInColumn(fillValue, puzzleSquareIndex){
		return true
	}

	handleFillOptionClick(i) {
		if(this.state.selectedFillOptionIndex != null){this.unSelectFillOption(this.state.selectedFillOptionIndex)}
		const fillOptions = this.state.fillOptions.slice();

		fillOptions[i].selected ='selected';

		this.setState({selectedFillOptionIndex: i, fillOptions: fillOptions})
	}

	unSelectFillOption(i) {
		const fillOptions = this.state.fillOptions.slice();
		fillOptions[i].selected = 'unselected';

		this.setState({selectedFillOptionIndex: null, fillOptions: fillOptions})
	}

	renderSquare(i) {
		return <Square
			value={this.props.squares[i].value}
			selected={this.props.squares[i].selected}
			answerStatus={this.props.squares[i].answerStatus}
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

	renderSquare(i) {
		return <Square
			value={this.props.squares[i].value}
			selected={this.props.squares[i].selected}
			onClick={() => this.handleSquareClick(i)}
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
				<div><CountExample /></div>
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

		// TODO: prevent null squares from sneaking in
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

