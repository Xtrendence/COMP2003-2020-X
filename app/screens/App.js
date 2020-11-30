import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LoginPage } from '../screens/LoginPage';
import { BottomBar } from '../components/BottomBar';
import { globalColors, globalStyles } from '../styles/global';

export default function App() {
	let loggedIn = true;

	if(loggedIn) {
		return (
			// BottomBar is the NavigationContainer that allows the user to navigate between the different screens of the app. By default, the "Questions" page is shown.
			<BottomBar></BottomBar>
		);
	}
	return <LoginPage></LoginPage>
}