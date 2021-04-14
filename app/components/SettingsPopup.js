import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles, globalColorsDark } from '../styles/global';
import Card from './Card';
import Notifier from '../utils/Notifier';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../utils/ThemeProvider';
import { wait } from '../utils/Utils';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export class SettingsPopup extends Component{
	static contextType = ThemeContext;
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {};
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
				<View style={styles.cardContainer}>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>Enter the time of day you'd like to recieve notifications of your falls</Text>
						<Text style={[styles.settingsText, styles[`settingsText${this.state.theme}`]]}>Time of day:</Text>
						<TextInput style={[globalComponentStyles.inputFieldMultiline, styles[`inputFieldMultiline${this.state.theme}`], { height: 50 }]} placeholder="HH.MM" multiline={false} keyboardType="numeric" onChangeText={(value) => this.setState({time:value})} value={this.state.time} placeholderTextColor={this.state.theme === "Dark" ? globalColorsDark.mainPlaceholder : globalColors.mainPlaceholder}></TextInput>
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
				</View>
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
	settingsContainer: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(52, 52, 52, 0.8)",
		justifyContent: "center",
		alignItems: "center",
	},
	cardContainer: {
		width: screenWidth - 40,
		marginBottom: 40,
		position: "absolute",
		top: (screenHeight / 4),
		zIndex: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	cardTitleDark: {
		color: globalColorsDark.mainContrast
	},
	inputFieldMultilineDark: {
		backgroundColor: globalColorsDark.mainThird,
		color: globalColorsDark.mainContrast
	},
	settingsText: {
		color: globalColors.mainContrast,
		marginBottom: 10,
	},
	settingsTextDark: {
		color: globalColorsDark.mainContrast,
		
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
