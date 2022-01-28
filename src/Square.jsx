import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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


export default Square;