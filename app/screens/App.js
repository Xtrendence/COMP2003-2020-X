import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StackNavigator } from '../components/StackNavigator';
import Notifier from '../utils/Notifier';

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let notifier = new Notifier(
			onRegister.bind(this),
			onNotification.bind(this)
		);

		// The StackNavigator contains the LoginPage as well as the BottomBar. The BottomBar contains the other pages.
		return <StackNavigator></StackNavigator>

		async function onRegister(token) {
			if (!empty(token.token)) {
				await AsyncStorage.setItem("fcm", token.token);
			}
		}

		function onNotification(notification) {
			notifier.localNotification(notification.title, notification.message);
		}
	}
}