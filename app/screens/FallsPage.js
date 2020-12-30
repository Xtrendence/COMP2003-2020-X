import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles } from '../styles/global';
import { TopBar } from '../components/TopBar';
import Card from '../components/Card';
import LoadingScreen from '../components/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from 'react-native-flash-message';

export const FallsPage = ({ navigation }) => {

	const [falls, setFalls] = React.useState(0);
	const [diary, setDiary] = React.useState();
	const [loading, setLoading] = React.useState(false);

	return (
		<View>
			{ loading &&
				<LoadingScreen>Loading...</LoadingScreen>
			}
			<TopBar navigation={navigation}>Recording Falls</TopBar>
			<ScrollView style={styles.cardContainer} contentContainerStyle={{paddingBottom: 20}}>
				<Card>
					<Text style={globalComponentStyles.cardTitle}>Today's Number of Falls</Text>
					<TextInput style={globalComponentStyles.inputField} placeholder="Number..." multiline={false} keyboardType="numeric" onChangeText={(value) => setFalls(value)} value={falls.toString()}></TextInput>
					<View style={styles.buttonWrapper}>
						<TouchableOpacity style={styles.actionButton} onPress={() => saveFalls()}>
							<Text style={styles.actionText}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</Card>
				<Card>
					<Text style={globalComponentStyles.cardTitle}>Diary Entry</Text>
					<TextInput style={[globalComponentStyles.inputFieldMultiline,{height: 120}]} placeholder="..." multiline={true} onChangeText={(value) => setDiary(value)} value={diary}></TextInput>
					<View style={styles.buttonWrapper}>
						<TouchableOpacity style={styles.actionButton} onPress={() => saveDiary()}>
							<Text style={styles.actionText}>Save</Text>
						</TouchableOpacity>
					</View>
				</Card>
			</ScrollView>
		</View>
	);

	async function saveFalls() {

		let token = await AsyncStorage.getItem("token");

		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/falls/create.php?key=" + token;

		let body = { patientID:patientID, falls:falls};

		fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json", "Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		.then(() => {
			showMessage({
				message: "Falls Confirmed",
				type: "success"
			})
		})
		.catch((error) => {
			console.log(error);
			showMessage({
				message: "Network Error",
				type: "danger"
			});
		});
	}

	async function saveDiary() {

	}


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: globalColors.mainSecond,
		width: "100%",
	},
	cardContainer: {
		width: "100%",
		height: "100%",
		paddingLeft: 20,
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