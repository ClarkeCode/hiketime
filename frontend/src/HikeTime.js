import React, { Component } from "react";
// import logo from './logo.svg';
// import shouldPureComponentUpdate from 'react-pure-render/function';

class HikeTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasMarkerData: false,
			markerData: Array(1).fill(null)
		};
	}

	// const [data, setData] = React.useState(null);
	componentDidMount() {
		fetch("http://localhost:7007/getMarkers")
			.then((res) => res.json())
			.then((data) => {this.setState({hasMarkerData: true, markerData: data}); });
	}

	// shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<div className="HikeTime">
				<div>HikeTime</div>
				<div>{!this.state.hasMarkerData ? "Loading..." : JSON.stringify(this.state.markerData, null, '\t')}</div>
			</div>
		);
	}
}

export default HikeTime;