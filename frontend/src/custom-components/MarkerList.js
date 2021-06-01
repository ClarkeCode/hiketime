import React, { Component } from "react";
import { Menu, MenuItem, Classes, Button } from "@blueprintjs/core";

export default class MarkerList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderListItem = (item, clickHandler) => {
		return (
			<MenuItem
				locale={this.props.locale}
				key={item.name}
				text={item.name}
				label={item.category}
				onClick={clickHandler}
			/>
		);
	};

	render() {
		//TODO: implement the ability to click/interact with menu items, re: clickHandler
		const menuContents = this.props.data.map((item) => { return this.renderListItem(item); });
		return (
			<div className="MarkerList">
				<Menu>
					{menuContents}
					<div className={Classes.MENU_FOOTER}>
						<Button icon="add" onClick={this.props.openNewLocationModal} {...this.props.footerProps} locale={this.props.locale}>Add New Location</Button>
					</div>
				</Menu>
			</div>
		);
	}
};
