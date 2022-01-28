import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'animate.css';
import Square from './Square.jsx'
import PuzzleBoard from './PuzzleBoard.jsx'
import SolutionBoard from './SolutionBoard.jsx'

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
  );
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

