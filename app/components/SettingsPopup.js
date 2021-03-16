import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles } from '../styles/global';
import Card from './Card';
import Notifier from '../utils/Notifier';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SettingsPopup(props) {

	const [time, setTime] = React.useState();

    return (	
		<View style={styles.settingsContainer}>
			<ScrollView style={styles.cardContainer}>
				<Card>
					<Text style={globalComponentStyles.cardTitle}>Enter the time of day you'd like to recieve notifications of your falls</Text>
					<Text style={styles.settingsText}>Time of day:</Text>
					<TextInput style={[globalComponentStyles.inputFieldMultiline,{height: 50}]} placeholder="HH.MM" multiline={false} keyboardType="numeric" onChangeText={(value) => setTime(value)} value={time}></TextInput>
					<View style={styles.buttonWrapper}>
						<TouchableOpacity style={styles.actionButton} onPress={() => saveAnswer(1, answers[1])}>
							<Text style={styles.actionText}>Save</Text>
						</TouchableOpacity>
					</View>
				</Card>
			</ScrollView>
		</View>
	);
}

function onPress(){
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
		width: 80,
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
