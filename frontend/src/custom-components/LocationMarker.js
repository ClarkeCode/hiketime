import React, { Component } from "react";

// const K_SIZE = 40;
// const greatPlaceStyle = {
//   // initially any map object has left top corner at lat lng coordinates
//   // it's on you to set object origin to 0,0 coordinates
//   position: 'absolute',
//   width: K_SIZE,
//   height: K_SIZE,
//   left: -K_SIZE / 2,
//   top: -K_SIZE / 2,
//   border: '5px solid #f44336',
//   borderRadius: K_SIZE,
//   backgroundColor: 'white',
//   textAlign: 'center',
//   color: '#3f51b5',
//   fontSize: 16,
//   fontWeight: 'bold',
//   padding: 4,
//   cursor: 'pointer'
// };
// const greatPlaceStyleHover = {
//   ...greatPlaceStyle,
//   border: '5px solid #3f51b5',
//   color: '#f44336'
// };

export default class LocationMarker extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	generateStyle = (sizeFont, sizeVert, sizeHoriz) => {
		return {
			position: 'absolute',
			width: sizeHoriz,
			height: sizeVert,
			left: -sizeHoriz / 2,
			top: -sizeVert / 2,

			border: '5px solid '+(this.props.hover?'#3f51b5':'#f44336'),
			borderRadius: sizeVert,
			backgroundColor: 'white',
			textAlign: 'center',
			color: '#3f51b5',
			fontSize: sizeFont,
			fontWeight: 'bold',
			padding: 4,
			cursor: 'pointer'
		}
	}

	render() {
		const selectedStyle = this.generateStyle(16, 40, 11 * this.props.text.length);//this.props.hover ? greatPlaceStyleHover : greatPlaceStyle;
		return (
			<div style={selectedStyle}>
				{this.props.text}
			</div>
		);
	}
};
