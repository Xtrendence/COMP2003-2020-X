import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StackNavigator } from '../components/BottomBar';

export default function App() {
	// The StackNavigator contains the LoginPage as well as the BottomBar. The BottomBar contains the other pages.
	return <StackNavigator></StackNavigator>
}