import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles, globalColorsDark } from '../styles/global';
import Card from './Card';
import Notifier from '../utils/Notifier';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../utils/ThemeProvider';
import { wait } from '../utils/Utils';

export class SettingsPopup extends Component{
	static contextType = ThemeContext;
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
	
		};
		this.toggleTheme;
	}

	componentDidUpdate() {
		AsyncStorage.getItem("theme").then(result => {
			if (result !== this.state.theme && (result === "Light" || result === "Dark")) {
				this.setState({theme:result});
			}
		}).catch(error => {
			console.log(error);
		});
	}

	componentDidMount() {
		const { theme, toggleTheme } = this.context;
		this.setState({theme:theme});
		this.toggleTheme = toggleTheme;
	}

	
	render() {
		return (	
			<View style={styles.settingsContainer}>
				<ScrollView style={[styles.cardContainer, styles[`cardContainer${this.state.theme}`]]}>
					<Card>
						<Text style={globalComponentStyles.cardTitle}>Enter the time of day you'd like to recieve notifications of your falls</Text>
						<Text style={styles.settingsText}>Time of day:</Text>
						<TextInput style={[globalComponentStyles.inputFieldMultiline,{height: 50}]} placeholder="HH.MM" multiline={false} keyboardType="numeric" onChangeText={(value) => this.setState({time:value})} value={this.state.time}></TextInput>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity style={styles.actionButton} onPress={() => notifcation()}>
								<Text style={styles.actionText}>Save</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity style={styles.actionButton} onPress={() => this.toggleTheme()}>
								<Text style={styles.actionText}>Theme</Text>
							</TouchableOpacity>
						</View>
					</Card>
				</ScrollView>
			</View>
		);
	}
}

function notifcation(){
	notifier.cancellAll();
	nnotifier.repeatNotification("Record Fall", "Please remember to record the number of falls you had today.", new Date(Date.parse(SomeDate)));
}

function saveAnswer(key, value) {
	setLoading(true);
	setTimeout(() => {
		setLoading(false);
	}, 100);
}

function onRegister(token) {
	let fcm = token.token;
}

function onNotification(notification) {
	notifier.localNotification(notification.title, notification.message);
	getData();
}

const styles = StyleSheet.create({

	cardContainer: {
		width: "100%",
		height: "100%",
		paddingLeft: 20,
		paddingTop: 220,
		backgroundColor: globalColors.mainFirst
	},
	cardContainerDark:{
		backgroundColor: globalColorsDark.mainFirst,
	},
    settingsContainer: {
		height: "100%",
		backgroundColor: "rgba(52, 52, 52, 0.8)",
	},
	buttonWrapper: {
		width: "100%",
		marginTop: 15,
		justifyContent: "center",
		alignItems: "center"
	},
	actionButton: {
		backgroundColor: globalColors.accentDark,
		width: 100,
		height: 35,
		justifyContent: "center",
		borderRadius: globalStyles.borderRadius,
	},
	actionText: {
		fontSize: globalStyles.mediumFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
});
