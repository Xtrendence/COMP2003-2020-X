import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalColors, globalStyles } from '../styles/global';
import { TopBar } from '../components/TopBar';
import { SettingsPopup} from '../components/SettingsPopup';


export class CalendarPage extends Component {
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			settings: false,
		};
		this._mounted;
		this.toggleTheme;
	}

	setSettings(page, value){
		page.setState({settings:value})
	}

	render() {
		return (
			<View>
				<TopBar navigation={this.navigation} settings={this.state.settings} setSettings={this.setSettings} page={this}>Calendar</TopBar>
				{ this.state.settings &&
                    <SettingsPopup></SettingsPopup> 
				}
			</View>
		);
	}
}