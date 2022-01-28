import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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

export default FillOption;