import React, { Component } from "react";
import { Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";


export default class HikeTimeNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Navbar fixedToTop={this.props.fixedToTop}>
				<NavbarGroup>
					<Button icon="menu" text="Locations" fill={true} minimal={true} onClick={this.props.onButtonClick}/>
					<NavbarDivider/>
					<NavbarHeading>HikeTime</NavbarHeading>
				</NavbarGroup>
			</Navbar>
		);
	}
};
