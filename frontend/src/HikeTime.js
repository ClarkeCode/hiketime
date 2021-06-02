import React, { Component } from "react";
import { Spinner, Toaster, Position, Collapse, Intent } from "@blueprintjs/core";
import LocationModal from "./custom-components/LocationModal";
import MarkerList from "./custom-components/MarkerList";
import HikeTimeNavbar from "./custom-components/HikeTimeNavbar";
import HikeTimeMap from "./custom-components/HikeTimeMap";
import "./HikeTime.css";

const serverAddress = "http://localhost:7007";
const toasterProps = { position: Position.BOTTOM }

export default class HikeTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasMarkerData: false,
			markerData: Array(1).fill(null),
			showMarkerList: true,

			showNewLocationModal: false,
			modalLat: null,
			modalLong: null
		};

		this.addNewLocation = this.addNewLocation.bind(this);
	}

	componentDidMount() { this.fetchData(); }
	fetchData = async () => {
		const markerResponse = await fetch(serverAddress+"/getMarkers");
		const markerJSON = await markerResponse.json();
		const categoryResponse = await fetch(serverAddress+"/getCategories")
		const categoryJSON = await categoryResponse.json();
		const mapSettings = await (await fetch(serverAddress+"/getMapSettings")).json();
		this.setState({hasMarkerData: true, markerData: markerJSON, locationCategories: categoryJSON, mapSettings: mapSettings});
	};

	addNewLocation = (location) => { this.setState(oldState => ({
		markerData: [...oldState.markerData, location]
		}));
	}
	handleImageUpload = (imageFile) => {
		//TODO: send the file to the server
	}

	handleModalLatitudeChange = (val) => this.setState({modalLat: val});
	handleModalLongitudeChange = (val) => this.setState({modalLong: val});
	getModalCoordinate = () => { return {lat: this.state.modalLat, lon: this.state.modalLong}};
	handleModalNewCoordinate = (coords) => { this.handleModalLatitudeChange(coords.lat); this.handleModalLongitudeChange(coords.lng); };
	handleModalClearCoordinate = () => this.setState({modalLat: null, modalLong: null});

	handleNewLocationOpen = () => { this.setState({showNewLocationModal: true}); }
	handleNewLocationClose = () => { this.setState({showNewLocationModal: false}); this.handleModalClearCoordinate(); }

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

				<HikeTimeMap
					markerData={this.state.markerData}
					apiKey={this.state.mapSettings.googleMapsAPIKey}
					defaultCenter={this.state.mapSettings.defaultLatLongCentre}
					openNewLocationModal={this.handleNewLocationOpen}
					updateModalCoordinates={this.handleModalNewCoordinate}/>
				
				<LocationModal
					onClose={this.handleNewLocationClose}
					handleLatitudeChange={this.handleModalLatitudeChange}
					handleLongitudeChange={this.handleModalLongitudeChange}
					handleClearCoordinates={this.handleModalClearCoordinate}
					getCoordinate={this.getModalCoordinate}

					isOpen={this.state.showNewLocationModal}
					locale={this.props.locale}
					locationCategories={this.state.locationCategories}
					newLocationHandler={this.addNewLocation}
					imageUploadHandler={this.handleImageUpload}
					toaster={this.toaster}/>
			</div>
		);
	}
}