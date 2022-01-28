import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Square from './Square.jsx'

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

export default SolutionBoard;