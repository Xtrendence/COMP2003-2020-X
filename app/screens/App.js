import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LoginPage } from '../screens/LoginPage';
import { BottomBar } from '../components/BottomBar';
import { globalColors, globalStyles } from '../styles/global';


export default function App() {
	let loggedIn = true;
	
	if(loggedIn) {
		return (
			<BottomBar></BottomBar>
			
		);
	}
	return <LoginPage></LoginPage>
}