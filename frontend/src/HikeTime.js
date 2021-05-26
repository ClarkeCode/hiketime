import React, { Component } from "react";

class HikeTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasMarkerData: false,
			markerData: Array(1).fill(null)
		};
	}

	fetchData = async () => {
		const response = await fetch("http://localhost:7007/getMarkers");
		const resJSON = await response.json();
		this.setState({hasMarkerData: true, markerData: resJSON});
	};

	componentDidMount() {
		this.fetchData();
	}

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