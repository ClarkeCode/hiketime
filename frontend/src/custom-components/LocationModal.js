import React, { Component } from "react";
import { Dialog, Classes, Intent, Button, FormGroup, InputGroup, ControlGroup, NumericInput, FileInput, MenuItem } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";
import { Tooltip2 } from "@blueprintjs/popover2"
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

const latitudeProps = { placeholder: "Latitude", min: "-90", max: "90" };
const longitudeProps = { placeholder: "Longitude", min: "-180", max: "180" };
const latLongProps = { className: "latlongInput", buttonPosition: "none", clampValueOnBlur: true
// , stepSize: 0.0001, minorStepSize: 0.000001
, stepSize: 0.1, minorStepSize: 0.001
}


class LocationModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			autoFocus: true,
			canEscapeKeyClose: true,
			canOutsideClickClose: true,
			enforceFocus: true,
			usePortal: true,

			necessaryInfoIntent: Intent.NONE,
			fileInputText: "Upload location picture...",
			fileWasSelected: false,

			locationName: null,
			category: undefined,
			locationPictureFile: null
		};
	}

	getLocationInfo = () => { return {name: this.state.locationName, category: this.state.category, ...this.props.getCoordinate(), pictureFile: this.state.locationPictureFile}; }
	hasMinimumLocationInfo = () => { return this.state.locationName !== null && typeof this.state.category !== "undefined"; }
	clearLocationInfo = () => {
		this.setState({locationName: null, category: undefined, locationPictureFile: null, necessaryInfoIntent: Intent.NONE});
		this.props.handleClearCoordinates();
	}
	handleSaveInfo = () => {
		if (this.hasMinimumLocationInfo()) {
			const data = this.getLocationInfo();
			this.props.newLocationHandler(data);
			this.props.imageUploadHandler(this.state.locationPictureFile);
			this.props.toaster.show({intent: Intent.SUCCESS, timeout: 3000, icon: "tick", message: "Saved new location \""+data.name+"\"!"});
			this.clearLocationInfo();
			this.props.onClose();
		}
		else {
			this.setState({necessaryInfoIntent: Intent.DANGER});
		}
	}


	handleNameChange = (e) => this.setState({locationName: (e.target.value === "") ? null : e.target.value });
	handleLatitudeChange = (val) => this.props.handleLatitudeChange(val);
	handleLongitudeChange = (val) => this.props.handleLongitudeChange(val);

	handleFileSelection = (e) => this.setState({locationPictureFile: e.target.files[0], fileInputText: e.target.files[0].name, fileWasSelected: true});
	
	handleCategorySelectionChange = (val) => this.setState({category: val});
	itemRenderer = (category, {handleClick, modifiers}) => {
		return (<MenuItem
			active={modifiers.active}
			key={category}
			text={category}
			// label={category}
			onClick={handleClick}
		/>);
	}
	valueRenderer = () => "";
	newLocationCategoryRenderer = (query, isActive, clickHandler) => {
		<MenuItem icon="add" key={query} text={"Create \""+query+"\""} active={isActive} onClick={clickHandler}/>
	}
	

	render() {
		return (
			//TODO: Numeric input clamps to 3 decimal places, desired is 6
			<Dialog title="Add a new Hiking Location" isOpen={this.props.isOpen} onClose={this.props.onClose} {...this.state}>
				<div className={Classes.DIALOG_BODY}>
					<FormGroup
						label="Location Name"
						labelFor="text-input"
						labelInfo="(required)">
						<InputGroup id="text-input" placeholder="Location Name" onChange={this.handleNameChange} intent={(this.state.locationName !== null ? Intent.NONE:this.state.necessaryInfoIntent)}/>
						<Suggest
							inputProps={{intent: typeof this.state.category !== "undefined" ? Intent.NONE : this.state.necessaryInfoIntent, placeholder: "Select a category..."}}
							query={this.state.category}
							items={this.props.locationCategories}
							itemRenderer={this.itemRenderer}
							inputValueRenderer={this.valueRenderer}
							onItemSelect={this.handleCategorySelectionChange}
							noResults={<MenuItem icon="error" disabled={true} text="No categories found."/>}
							/>
					</FormGroup>

					<FormGroup
						label="Location Details"
						labelFor="text-input"
						labelInfo="(optional)">
						<FileInput
							text={this.state.fileInputText}
							hasSelection={this.state.fileWasSelected}
							onInputChange={this.handleFileSelection}
							inputProps={{accept: [".png",".jpg",".jpeg",".bmp"]}}/>
						<ControlGroup className="latlongInputGroup">
							<NumericInput value={this.props.getCoordinate().lat} onValueChange={this.handleLatitudeChange} locale={this.props.locale} {...latitudeProps}{...latLongProps}></NumericInput>
							<NumericInput value={this.props.getCoordinate().lon} onValueChange={this.handleLongitudeChange} locale={this.props.locale} {...longitudeProps}{...latLongProps}></NumericInput>
						</ControlGroup>
					</FormGroup>
				</div>
				
				<div className={Classes.DIALOG_FOOTER}>
					<div className={Classes.DIALOG_FOOTER_ACTIONS}>
						<Tooltip2 content={<p>Please fill in required information before saving</p>} disabled={this.hasMinimumLocationInfo()} placement="bottom">
							<Button onClick={this.handleSaveInfo} intent={Intent.PRIMARY}  rightIcon="floppy-disk">Save Location Information</Button>
						</Tooltip2>
					</div>
				</div>
			</Dialog>
		);
	}
}

export default LocationModal;