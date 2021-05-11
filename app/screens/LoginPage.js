import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, DevSettings, Dimensions } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Notifier from '../utils/Notifier';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wave from 'react-native-waveview';
import { globalColors, globalColorsDark, globalStyles } from '../styles/global';
import LoadingScreen from '../components/LoadingScreen';
import { ThemeContext } from '../utils/ThemeProvider';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export class LoginPage extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);
		this.state = {
			wave: true,
			loading: false,
			username: null,
			password: null,
			theme: "Light"
		};
		this.navigation = props.navigation;
		this._mounted;
		this.toggleTheme;
	}

	async login(params) {
		// To be removed once testing is complete.
		let username = "maureenW38";
		let password = "Iamthedefault";

		let fcm = await AsyncStorage.getItem("fcm");

		if (!empty(fcm)) {
			if (this._mounted) {
				this.setState({loading:true});
			}

			setTimeout(() => {
				if (this._mounted) {
					this.setState({loading:false});
				}
			}, 5000);
			
			if (!empty(params) && "token" in params) {
				fetch("http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/users/verify.php?key=" + params.token, {
					method: "GET",
					headers: {
						Accept: "application/json", "Content-Type": "application/json"
					}
				})
				.then((response) => {
					return response.json();
				})
				.then(async (json) => {
					this.processLogin(json);
				})
				.catch((error) => {
					console.log(error);
					if (this._mounted) {
						this.setState({loading:false});
					}
					showMessage({
						message: "Network Error",
						type: "danger"
					});
				});
			} else {
				let body = { patient_username:username, patient_password:password, fcmToken:fcm };

				fetch("http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/users/login.php", {
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
					this.processLogin(json);
				})
				.catch((error) => {
					console.log(error);
					if (this._mounted) {
						this.setState({loading:false});
					}
					showMessage({
						message: "Network Error",
						type: "danger"
					});
				});
			}
		} else {
			showMessage({
				message: "App Error",
				description: "Please wait until your device is registered.",
				type: "warning"
			});
			DevSettings.reload();
		}
	}

	async processLogin(response) {
		if (this._mounted) {
			this.setState({loading:false});
		}
		if (response.valid !== true) {
			showMessage({
				message: response.message,
				type: "warning"
			});
		} else {
			await AsyncStorage.setItem("token", response.token);
			await AsyncStorage.setItem("patientID", response.patientID);

			if (!empty(response.token) && !empty(response.patientID) && !empty(await AsyncStorage.getItem("token")) && !empty(await AsyncStorage.getItem("patientID"))) {
				this.navigation.navigate("BottomBar");
			}
		}
	}

	async getToken() {
		return new Promise(async (resolve, reject) => {
			let token = await AsyncStorage.getItem("token");
			let patientID = await AsyncStorage.getItem("patientID");

			if (!empty(token) && !empty(patientID)) {
				resolve({ token:token, patientID:patientID });
			} else {
				reject();
			}
		});
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

		this._mounted = true;

		this.getToken().then(patient => {
			this.login({ patient });
		}).catch(error => {
			console.log(error);
		});

		// To be removed once testing is complete.
		this.setState({username:"maureenW38"});
		this.setState({password:"Iamthedefault"});
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	render() {
		let notifier = new Notifier(
			onRegister.bind(this),
			onNotification.bind(this)
		);

		return (
			<View style={[styles.pageContainer, styles[`pageContainer${this.state.theme}`]]}>
				{ this.state.loading &&
					<LoadingScreen>Loading...</LoadingScreen>
				}
				<View style={styles.imageWrapper}>
					<Image style={styles.image} source={require("../assets/Logo.png")}/>
				</View>
				<View style={styles.loginForm}>
					<TextInput style={[styles.inputField, styles[`inputField${this.state.theme}`]]} selectionColor={globalColors.accentDark} underlineColorAndroid="transparent" placeholder="Username" onChangeText={(value) => this.setState({username:value})} value={this.state.username} placeholderTextColor={(this.state.theme === "Dark") ? globalColorsDark.mainPlaceholder : globalColors.mainPlaceholder} autoCorrect={false}></TextInput>
					<TextInput style={[styles.inputField, styles[`inputField${this.state.theme}`]]} selectionColor={globalColors.accentDark} underlineColorAndroid="transparent" placeholder="Password" onChangeText={(value) => this.setState({password:value})} onSubmitEditing={() => this.login()} secureTextEntry placeholderTextColor={(this.state.theme === "Dark") ? globalColorsDark.mainPlaceholder : globalColors.mainPlaceholder} autoCorrect={false}>{this.state.password}</TextInput>
					<TouchableOpacity style={styles.actionButton} onPress={() => this.login()}>
						<Text style={styles.actionText}>Login</Text>
					</TouchableOpacity>
				</View>
				{ this.state.wave &&
					<Wave
						style={{width:"100%", height:"100%"}}
						H={screenHeight - 300}
						waveParams={[
							{A: 30, T: screenWidth, fill: "rgba(104,112,141,1)"},
							{A: 20, T: screenWidth + 20, fill: "rgba(104,112,141,0.7)"},
							{A: 40, T: screenWidth + 40, fill: "rgba(104,112,141,0.5)"},
						]}
						animated={true}
					/>
				}
				{ !this.state.wave &&
					<View style={styles.bottomContainer}>
						<Svg style={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
							<Path fill={globalColors.accentLightest} fill-opacity="1" d="M0,192L48,165.3C96,139,192,85,288,74.7C384,64,480,96,576,122.7C672,149,768,171,864,165.3C960,160,1056,128,1152,101.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></Path>
						</Svg>
						<LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 0.9}} colors={[globalColors.accentLightest, globalColors.accentDark]} style={styles.bottomFill}></LinearGradient>
					</View>
				}				
			</View>
		);

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
	pageContainerDark: {
		backgroundColor: globalColorsDark.mainThird
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
	inputFieldDark: {
		backgroundColor: globalColorsDark.mainThird,
		color: globalColorsDark.mainContrast
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
		fontFamily: globalStyles.fontFamily,
		fontSize: globalStyles.bigFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
	switcherText: {
		fontFamily: globalStyles.fontFamily,
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