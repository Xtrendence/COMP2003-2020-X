import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StackNavigator } from '../components/Navigators';
import Notifier from '../utils/Notifier';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.notifier = new Notifier(
			this.onRegister.bind(this),
			this.onNotification.bind(this)
		);
	}

	render() {
		// The StackNavigator contains the LoginPage as well as the BottomBar. The BottomBar contains the other pages.
		return <StackNavigator></StackNavigator>
	}

	onRegister(token) {
		let fcm = token.token;
	}

	onNotification(notification) {
		this.notifier.localNotification(notification.title, notification.message);
	}
}