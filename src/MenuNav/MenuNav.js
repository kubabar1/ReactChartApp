import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import { MenuItem } from "./MenuItem.js";
import { MenuHeader } from "./MenuHeader.js";
import { ModalData } from "./DataModal/ModalData.js";
import { ModalColorInput } from "./ModalColorInput.js";
import { ModalSettings } from "./ModalSettings.js";
import { ModalExportData } from "./ExportModal/ModalExportData.js";
import { ModalImportData } from "./ImportModal/ModalImportData.js";
import { ModalHelp } from "./ModalHelp.js";
import "font-awesome/css/font-awesome.min.css";

export class MenuNav extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			settings:false,
			modalImportData:false,
			modalExportData:false,
			modalData:false,
			modalHelp:false
	  };
	}

	toggleData = (e) => {
		e.preventDefault();
		this.setState({
			modalData: !this.state.modalData
		});
	}

	toggleSettings = (e) => {
		e.preventDefault();
		this.setState({
			settings: !this.state.settings
		});
	}

	toggleModalImportData = (e) => {
		this.setState({
			modalImportData: !this.state.modalImportData
		});
	}

	toggleModalExportData = (e) => {
		e.preventDefault();
		this.setState({
			modalExportData: !this.state.modalExportData
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
			modalData: !this.state.modalData
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

	render() {
			return (
			<div id="menu_nav" className="col-xs-12 col-sm-12 col-md-2 col-lg-2 m-0 p-0">
				<MenuHeader/>
				<MenuItem icon="fas fa-plus-square" name="Add data" clickMenu={this.toggleData}/>
				<MenuItem icon="fas fa-undo" name="Undo" clickMenu={this.props.undo}/>
				<MenuItem icon="fas fa-file-upload" name="Import data" clickMenu={this.toggleModalImportData}/>
				<MenuItem icon="fas fa-file-download" name="Export data" clickMenu={this.toggleModalExportData}/>
				<MenuItem icon="fas fa-cog" name="Settings" clickMenu={this.toggleSettings}/>
				<MenuItem icon="far fa-question-circle" name="Help" clickMenu={this.toggleHelp}/>

				<ModalData
					modalData={this.state.modalData}
					toggle={this.toggleData}
          setData={this.props.setData}

					colors={this.props.colors}
					rows={this.props.rows}
					nrows={this.props.nrows}
					ncols={this.props.ncols}
					colnames={this.props.colnames}
					rownames={this.props.rownames}

					addRow={this.props.addRow}
					addCol ={this.props.addCol}
					size={this.props.size}
					setSize={this.props.setSize}
					setColNames={this.props.setColNames}
					setRowNames={this.props.setRowNames}
					setValue={this.props.setValue}
					value={this.props.value}
          handleColorChange={this.props.handleColorChange}
          clearData={this.props.clearData}
					setColumnName={this.props.setColumnName}
					setRowName={this.props.setRowName}
				/>
				<ModalSettings
					modalChangeGraphType={this.state.settings}
					toggle={this.toggleSettings}
					graphType={this.props.graphType}
					setGraphType={this.setGraphType}
				/>
				<ModalExportData
					modalExportData={this.state.modalExportData}
					toggle={this.toggleModalExportData}
					setData={this.setData}
					data={this.props.data}

					colors={this.props.colors}
					rows={this.props.rows}
					nrows={this.props.nrows}
					ncols={this.props.ncols}
					colnames={this.props.colnames}
					rownames={this.props.rownames}

					chartName={this.props.chartName}
				/>
				<ModalImportData
					modalImportData={this.state.modalImportData}
					toggle={this.toggleModalImportData}
          setData={this.props.setData}
				/>
				<ModalHelp
					modalHelp={this.state.modalHelp}
					toggle={this.toggleHelp}
				/>
			</div>
			);
	}
}
