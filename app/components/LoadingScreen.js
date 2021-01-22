import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles } from '../styles/global';

export default class LoadingScreen extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.loadingText}>{ this.props.children }</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 99,
		top: 0,
		left: 0,
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(18,18,18,0.85)",
	},
	loadingText: {
		fontFamily: globalStyles.fontFamily,
		fontSize: globalStyles.bigFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
	},
});