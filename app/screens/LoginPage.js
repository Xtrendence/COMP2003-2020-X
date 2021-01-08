import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Svg, Path } from 'react-native-svg';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Notifier from '../utils/Notifier';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalColors, globalStyles } from '../styles/global';
import LoadingScreen from '../components/LoadingScreen';

export class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: null,
			loading: false,
			username: null,
			password: null
		};
		this.navigation = props.navigation;
	}

	login() {
		// To be removed once testing is complete.
		let username = "maureenW38";
		let password = "Iamthedefault";

		if (!empty(this.state.token)) {
			this.setState({loading:true});

			setTimeout(() => {
				this.setState({loading:false});
			}, 5000);

			// To be changed to use the username and password stored in state.
			let body = { patient_username:username, patient_password:password, fcmToken:this.state.token };

			fetch("http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/users/login.php", {
				method: "POST",
				headers: {
					Accept: "application/json", "Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			})
			.then((response) => {
				return response.json();
			})
			.then(async (json) => {
				this.setState({loading:false});
				if (json.valid !== true) {
					showMessage({
						message: json.message,
						type: "warning"
					});
				} else {
					await AsyncStorage.setItem("token", json.token);
					await AsyncStorage.setItem("patientID", json.patientID);

					if (!empty(json.token) && !empty(json.patientID) && !empty(await AsyncStorage.getItem("token")) && !empty(await AsyncStorage.getItem("patientID"))) {
						this.navigation.navigate("BottomBar");
					}
				}
			})
			.catch((error) => {
				console.log(error);
				this.setState({loading:false});
				showMessage({
					message: "Network Error",
					type: "danger"
				});
			});
		} else {
			showMessage({
				message: "App Error",
				description: "Please wait until your device is registered.",
				type: "warning"
			});
		}
	}

	componentDidMount() {
		// To be removed once testing is complete.
		this.setState({username:"maureenW38"});
		this.setState({password:"Iamthedefault"});
	}

	render() {
		let notifier = new Notifier(
			onRegister.bind(this),
			onNotification.bind(this)
		);

		return (
			<View style={styles.pageContainer}>
				{ this.state.loading &&
					<LoadingScreen>Loading...</LoadingScreen>
				}
				<View style={styles.imageWrapper}>
					<Image style={styles.image} source={require("../assets/Logo.png")}/>
				</View>
				<View style={styles.loginForm}>
					<TextInput style={styles.inputField} selectionColor={globalColors.accentDark} underlineColorAndroid="transparent" placeholder="Username" onChangeText={(value) => this.setState({username:value})} value={this.state.username}></TextInput>
					<TextInput style={styles.inputField} selectionColor={globalColors.accentDark} underlineColorAndroid="transparent" placeholder="Password" onChangeText={(value) => this.setState({password:value})} onSubmitEditing={() => this.login()} secureTextEntry>{this.state.password}</TextInput>
					<TouchableOpacity style={styles.actionButton} onPress={() => this.login()}>
						<Text style={styles.actionText}>Login</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.bottomContainer}>
					<Svg style={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><Path fill={globalColors.accentLightest} fill-opacity="1" d="M0,192L48,165.3C96,139,192,85,288,74.7C384,64,480,96,576,122.7C672,149,768,171,864,165.3C960,160,1056,128,1152,101.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></Path></Svg>
					<View style={styles.bottomFill}></View>
				</View>
			</View>
		);

		function onRegister(token) {
			this.setState({token:token.token});
			if (!empty(token.token)) {
				this.setState({loading:false});
			}
		}

		function onNotification(notification) {
			notifier.localNotification(notification.title, notification.message);
		}
	}
}

function empty(value) {
	if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
		return true;
	}
	return false;
}

const styles = StyleSheet.create({
	pageContainer: {
		backgroundColor: globalColors.mainSecond,
		flex: 1,
		position: "relative",
		width: "100%",
		height: "100%"
	},
	imageWrapper: {
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		width: "100%",
		top: "10%",
		height: 140,
	},
	image: {
		width: 120,
		height: 120
	},
	loginForm: {
		position: "absolute",
		left: 0,
		top: "50%",
		width: "100%",
		zIndex: 2,
		justifyContent: "flex-start",
		alignItems: "center"
	},
	inputField: {
		width: 160,
		height: 40,
		borderBottomWidth: 0,
		color: globalColors.mainContrast,
		backgroundColor: globalColors.mainFirst,
		borderRadius: globalStyles.borderRadius,
		paddingLeft: 10,
		paddingRight: 10,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
		marginBottom: 20,
		fontFamily: globalStyles.fontFamily,
	},
	actionButton: {
		backgroundColor: globalColors.accentDarkest,
		width: 160,
		height: 40,
		justifyContent: "center",
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
		borderRadius: globalStyles.borderRadius,
	},
	actionText: {
		fontSize: globalStyles.bigFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
	switcherText: {
		fontSize: globalStyles.smallFont,
		color: globalColors.accentContrast,
		textAlign: "center",
		textDecorationColor: globalColors.accentContrast,
		textDecorationLine: "underline",
		marginTop: 15
	},
	bottomContainer: {
		flex: 1,
		justifyContent: "flex-end"
	},
	svg: {
		width: "100%",
		height: "60%",
		position: "absolute",
		left: 0,
		bottom: "35%"
	},
	bottomFill: {
		backgroundColor: globalColors.accentLightest,
		height: "60%",
		width: "100%",
		position: "absolute",
		left: 0,
		bottom: 0
	}
});