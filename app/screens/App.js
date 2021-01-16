import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { StackNavigator } from '../components/StackNavigator';
import Notifier from '../utils/Notifier';
import { globalColors } from '../styles/global';

changeNavigationBarColor(rgbToHex(globalColors.accentDark), false);

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

function rgbToHex(rgb) {
	let numbers = rgb.split("(")[1].split(")")[0].split(",");
	let hexArray = numbers.map((number) => {
		number = parseInt(number).toString(16);
		return (number.length === 1) ? "0" + number : number;
	});
	return "#" + hexArray.join("");
}