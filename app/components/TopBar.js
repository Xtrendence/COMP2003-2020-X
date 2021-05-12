import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { globalColors, globalStyles } from '../styles/global';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export class TopBar extends Component {
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
	}

	async logout() {
		let patientID = await AsyncStorage.getItem("patientID");

		let token = await AsyncStorage.getItem("token");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/users/logout.php";

		let body = { patientID:patientID, token:token };

		fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json", "Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		.then(async () => {
			await AsyncStorage.removeItem("token");
			await AsyncStorage.removeItem("patientID");
			this.navigation.dangerouslyGetParent().navigate("LoginPage");
		})
		.catch((error) => {
			console.log(error);
			showMessage({
				message: "Error",
				type: "danger"
			});
		});
	}

	render() {
		return (
			<View style={styles.header}>
				<TouchableOpacity style={styles.cogView} onPress={() => this.props.setSettings(this.props.page, !this.props.settings)}>
					<Icon name="cog" color={globalColors.accentContrast} size={globalStyles.topBarIconSize}  />
				</TouchableOpacity>
				<View style={styles.textView}>
					<Text style={styles.headerText}>{this.props.children }</Text>
				</View>
				<TouchableOpacity style={styles.logoutView} onPress={() => this.logout()}>
					<Icon name="log-out" color={globalColors.accentContrast} size={globalStyles.topBarIconSize}  />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 50,
		backgroundColor: globalColors.accentLight,	   
	},
	headerText: {
		fontWeight: "bold",
		fontSize: globalStyles.bigFont,
		fontFamily: globalStyles.fontFamily,
		color: globalColors.accentContrast,
		letterSpacing: 1,
	},
	cogView: {
		width: 50,
		height: 50,
		top: 0,
		left: 0,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
	},
	logoutView: {
		width:  50,
		height: 50,
		top: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
	},
	textView: {
		width: screenWidth - 50 - 50,
		height: 50,
		top: 0,
		left: 50,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
	}
});