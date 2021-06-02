import React, { Component } from "react";
import GoogleMap from "google-map-react";
import LocationMarker from "./LocationMarker";
import {Popover2} from "@blueprintjs/popover2";
import {Button} from "@blueprintjs/core";

export default class HikeTimeMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clickPopover: false,
			buttonCoords: {lat: undefined, lng: undefined}
		};
	}
	
	closePopover = () => this.setState({clickPopover: false})

	handleClickMap = ({x,y,lat,lng, event}) => {
		this.closePopover();
		// console.log(x,y,lat,lng,event);
		this.setState({clickPopover: true, buttonCoords: {lat: lat, lng: lng}});
	}
	handleNewLocation = () => {
		if (typeof this.props.updateModalCoordinates !== "undefined")
			this.props.updateModalCoordinates(this.state.buttonCoords);
		this.props.openNewLocationModal();
	}
	
	render() {
		const generatedMarkers = this.props.markerData.filter((location) => location.lat !== null && location.lon !== null).map(location => {
			return (<LocationMarker key={location.name} lat={location.lat} lng={location.lon} text={location.name}/>);
		});
		const popoverProps = {
			className: "ClickablePopover",
			interactionKind: "hover",
			placement: "top-end",
			hoverCloseDelay: 100
		};
		return (
			<>
				<GoogleMap
					bootstrapURLKeys={{key: this.props.apiKey}}
					defaultZoom={15}
					defaultCenter={this.props.defaultCenter}
					yesIWantToUseGoogleMapApiInternals
					onClick={this.handleClickMap}
				>
					<Popover2 onClose={this.closePopover} {...this.state.buttonCoords} {...popoverProps} content={
						<Button icon="add" onClick={this.handleNewLocation} locale={this.props.locale} minimal={true} intent="primary">Add New Location</Button>
					}>
						<div className={popoverProps.className+"Anchor"} style={{width: "15px", height: "30px"}} {...this.state.buttonCoords}></div>
					</Popover2>
					{generatedMarkers}
				</GoogleMap>
			</>
		);
	}
};
