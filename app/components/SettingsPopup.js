import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalColors, globalStyles } from '../styles/global';

export function SettingsPopup(props) {
    return (
		<View style={styles.settingsContainer}>
			<Text style={styles.settingsText}></Text>
		</View>
	);

}

const styles = StyleSheet.create({
    settingsContainer: {
		


		height: "100%",
		backgroundColor: "rgba(52, 52, 52, 0.8)",


    },
});
