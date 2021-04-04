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
	}

	render() {
		return (
			<View>
				<TopBar navigation={this.navigation}>Calendar</TopBar>
			</View>
		);
	}
}