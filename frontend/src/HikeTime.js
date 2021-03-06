import React, { Component } from "react";
import { Spinner, Toaster, Position, Collapse, Intent } from "@blueprintjs/core"
import LocationModal from "./custom-components/LocationModal";
import MarkerList from "./custom-components/MarkerList";
import HikeTimeNavbar from "./custom-components/HikeTimeNavbar";
import "./HikeTime.css";

const serverAddress = "http://localhost:7007";
const toasterProps = { position: Position.BOTTOM }

export default class HikeTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasMarkerData: false,
			markerData: Array(1).fill(null),
			showNewLocationModal: false,
			showMarkerList: true
		};

		this.addNewLocation = this.addNewLocation.bind(this);
	}

	componentDidMount() { this.fetchData(); }
	fetchData = async () => {
		const markerResponse = await fetch(serverAddress+"/getMarkers");
		const markerJSON = await markerResponse.json();
		const categoryResponse = await fetch(serverAddress+"/getCategories")
		const categoryJSON = await categoryResponse.json();
		this.setState({hasMarkerData: true, markerData: markerJSON, locationCategories: categoryJSON});
	};

	addNewLocation = (location) => { this.setState(oldState => ({
		markerData: [...oldState.markerData, location]
		}));
	}
	handleImageUpload = (imageFile) => {
		//TODO: send the file to the server
	}

	handleNewLocationOpen = () => { this.setState({showNewLocationModal: true}); }
	handleNewLocationClose = () => { this.setState({showNewLocationModal: false}); }

	toggleMarkerListVisibility = () => { this.setState(oldState => ({showMarkerList: !oldState.showMarkerList})); }

	toasterRefHandler = (ref) => {(this.toaster = ref)};

	render() {
		if (!this.state.hasMarkerData) {
			return (
				<div className="HikeTime">
					<p>Loading...</p>
					<Spinner size="50"/>
				</div>
			);
		}
		return (
			<div className="HikeTime">
				<Toaster {...toasterProps} ref={this.toasterRefHandler}/>

				<HikeTimeNavbar fixedToTop={true} onButtonClick={this.toggleMarkerListVisibility}/>

				<Collapse className="MarkerListWrapper" isOpen={this.state.showMarkerList}>
					<MarkerList data={this.state.markerData} locale={this.props.locale} 
						openNewLocationModal={this.handleNewLocationOpen}
						footerProps={{fill: true, minimal: false, intent: Intent.PRIMARY}}/>
				</Collapse>
				
				<LocationModal
					isOpen={this.state.showNewLocationModal}
					onClose={this.handleNewLocationClose}
					locale={this.props.locale}
					locationCategories={this.state.locationCategories}
					newLocationHandler={this.addNewLocation}
					imageUploadHandler={this.handleImageUpload}
					toaster={this.toaster}/>
			</div>
		);
	}
}