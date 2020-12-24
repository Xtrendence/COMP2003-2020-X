import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalColors, globalStyles } from '../styles/global';
import { TopBar } from '../components/TopBar';

export const FallsPage = ({ navigation }) => {
	return (
		<View>
			<TopBar navigation={navigation}>Recording Falls</TopBar>
		</View>
	);
}