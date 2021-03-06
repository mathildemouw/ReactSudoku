import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Square from './Square.jsx'
import FillOption from './FillOption.jsx'

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
		if (this.state.selectedFillOptionIndex != null) {
			if(
				this.notInColumn(puzzleSquareIndex) &&
				this.notInRow(puzzleSquareIndex) &&
				this.notInQuadrant(puzzleSquareIndex)){
				puzzleSquares[puzzleSquareIndex].answerStatus = 'correct';
			} else { puzzleSquares[puzzleSquareIndex].answerStatus = 'incorrect'; }
			puzzleSquares[puzzleSquareIndex].value = this.state.fillOptions[this.state.selectedFillOptionIndex].value
		}
	}

	notInQuadrant(puzzleSquareIndex){
		let quadrant1indices = [0,1,2,3]
		let quadrant2indices = [4,5, 6,7]
		let quadrant3indices = [8,9,10,11]
		let quadrant4indices = [12,13,14,15]

		const fillValue = this.state.fillOptions[this.state.selectedFillOptionIndex].value

		if(quadrant1indices.includes(puzzleSquareIndex)){
			return !quadrant1indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
		if(quadrant2indices.includes(puzzleSquareIndex)){
			return !quadrant2indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
		if(quadrant3indices.includes(puzzleSquareIndex)){
			return !quadrant3indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
		if(quadrant4indices.includes(puzzleSquareIndex)){
			return !quadrant4indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
	}

	notInRow(puzzleSquareIndex){
		let row1indices = [0,1,4,5]
		let row2indices = [2,3, 6,7]
		let row3indices = [8,9,12,13]
		let row4indices = [10,11,14,15]

		const fillValue = this.state.fillOptions[this.state.selectedFillOptionIndex].value

		if(row1indices.includes(puzzleSquareIndex)){
			return !row1indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
		if(row2indices.includes(puzzleSquareIndex)){
			return !row2indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
		if(row3indices.includes(puzzleSquareIndex)){
			return !row3indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
		if(row4indices.includes(puzzleSquareIndex)){
			return !row4indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
	}

	notInColumn(puzzleSquareIndex){
		let column1indices = [0,1,2,3]
		let column2indices = [4,5, 6,7]
		let column3indices = [8,9,10,11]
		let column4indices = [12,13,14,15]

		const fillValue = this.state.fillOptions[this.state.selectedFillOptionIndex].value

		if(column1indices.includes(puzzleSquareIndex)){
			return !column1indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
		if(column2indices.includes(puzzleSquareIndex)){
			return !column2indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
		if(column3indices.includes(puzzleSquareIndex)){
			return !column3indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
		if(column4indices.includes(puzzleSquareIndex)){
			return !column4indices.map((e)=>{return this.props.squares[e].value;}).includes(fillValue)
		}
	}

	handleFillOptionClick(i) {
		if(this.state.selectedFillOptionIndex != null){
			this.unSelectFillOption(this.state.selectedFillOptionIndex)
		}
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

export default PuzzleBoard;