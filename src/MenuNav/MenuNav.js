import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import { MenuItem } from "./MenuItem.js";
import { ModalDataInput } from "./ModalDataInput.js";
import { ModalColorInput } from "./ModalColorInput.js";
import { ModalChangeGraphType } from "./ModalChangeGraphType.js";
import { ModalLoadData } from "./ModalLoadData.js";
import { ModalHelp } from "./ModalHelp.js";
import "font-awesome/css/font-awesome.min.css";

export class MenuNav extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			modalDataInput:false,
			modalColorInput:false,
			modalChangeGraphType:false,
			modalLoadData:false,
			modalHelp:false
	  };
	}

	toggleDataInput = (e) => {
		e.preventDefault();
		this.setState({
			modalDataInput: !this.state.modalDataInput
		});
	}

	toggleColorInput = (e) => {
		e.preventDefault();
		this.setState({
			modalColorInput: !this.state.modalColorInput
		});
	}

	toggleModalChangeGraphType = (e) => {
		e.preventDefault();
		this.setState({
			modalChangeGraphType: !this.state.modalChangeGraphType
		});
	}

	toggleModalLoadData = (e) => {
		e.preventDefault();
		this.setState({
			modalLoadData: !this.state.modalLoadData
		});
	}

	toggleHelp = (e) => {
		e.preventDefault();
		this.setState({
			modalHelp: !this.state.modalHelp
		});
	}

	addData = (x,y) => {
		this.props.addData(x,y);
		this.setState({
			modalDataInput: !this.state.modalDataInput
		});
	}

	setData = (data) => {
		this.props.setData(data);
		this.setState({
			modalLoadData: !this.state.modalLoadData
		});
	}

	setColor = (color) => {
		this.props.setColor(color);
		this.setState({
			modalColorInput: !this.state.modalColorInput
		});
	}

	setGraphType = (graphType) => {
		this.props.setGraphType(graphType);
		this.setState({
			modalChangeGraphType: !this.state.modalChangeGraphType
		});
	}

	downloadData = () => {
		var fileDownload = require('react-file-download');
		fileDownload(this.props.data, 'graph_app.csv');
	}

	render() {
			return (
			<div id="menu_nav" className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
				<MenuItem icon="fas fa-plus-square" name="Add data" clickMenu={this.toggleDataInput}/>
				<MenuItem icon="fas fa-eraser" name="Remove data" clickMenu={this.props.removeData}/>
				<MenuItem icon="fas fa-file-upload" name="Load data" clickMenu={this.toggleModalLoadData}/>
				<MenuItem icon="fas fa-file-download" name="Download data" clickMenu={this.downloadData}/>
				<MenuItem icon="fas fa-chart-bar" name="Change type" clickMenu={this.toggleModalChangeGraphType}/>
				<MenuItem icon="fas fa-fill-drip" name="Change color" clickMenu={this.toggleColorInput}/>
				<MenuItem icon="far fa-question-circle" name="Help" clickMenu={this.toggleHelp}/>
				<ModalDataInput
					modalDataInput={this.state.modalDataInput}
					toggle={this.toggleDataInput}
					addData={this.addData}
				/>
				<ModalColorInput
					modalColorInput={this.state.modalColorInput}
					toggle={this.toggleColorInput}
					setColor={this.setColor}
					color={this.props.color}
				/>
				<ModalChangeGraphType
					modalChangeGraphType={this.state.modalChangeGraphType}
					toggle={this.toggleModalChangeGraphType}
					graphType={this.props.graphType}
					setGraphType={this.setGraphType}
				/>
				<ModalLoadData
					modalLoadData={this.state.modalLoadData}
					toggle={this.toggleModalLoadData}
					setData={this.setData}
				/>
				<ModalHelp
					modalHelp={this.state.modalHelp}
					toggle={this.toggleHelp}
				/>
			</div>
			);
	}
}
