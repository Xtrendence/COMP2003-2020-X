import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomBar } from '../components/BottomBar';
import { globalColors, globalStyles } from '../styles/global';

export default function App() {
	return (
		<BottomBar></BottomBar>
	);
}
