import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Pressable, Alert, RefreshControl, Dimensions, BackHandler } from 'react-native';
import { globalColors, globalColorsDark, globalStyles, globalComponentStyles,  } from '../styles/global';
import { TopBar } from '../components/TopBar';
import Card from '../components/Card';
import LoadingScreen from '../components/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { SettingsPopup } from '../components/SettingsPopup';
import { ThemeContext } from '../utils/ThemeProvider';
import { RadioButton } from 'react-native-paper';
import { wait } from '../utils/Utils';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export class FallsPage extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);
		this.state = {
			falls: null,
			diary: null,
			settings: false,
			modalVisible: false,
			loading: false,
			refreshing: false,
			entries: {},
			from: 0,
			to: 10,
		};
		this.navigation = props.navigation;
		
	}

	setSettings(page, value) {
		page.setState({settings:value})
	}

	async saveFalls() {
		let token = await AsyncStorage.getItem("token");

		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/falls/create.php?key=" + token;

		let body = { patientID:patientID, falls:this.state.falls};

		fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json", "Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		.then(() => {
			this.setState({falls:0});
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

	componentDidMount() {
		const { theme, toggleTheme } = this.context;
		this.setState({theme:theme});
		this.toggleTheme = toggleTheme;
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

	async saveDiary() {
		let token = await AsyncStorage.getItem("token");

		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/diary-entries/create.php?key=" + token;

		let body = { patientID:patientID, entry:this.state.diary};

		fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json", "Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		.then(() => { 
			this.setState({diary:null});
			showMessage({
				message: "Diary Saved",
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

	async getData() {
		let token = await AsyncStorage.getItem("token");

		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/diary-entries/read-user.php?id=" + patientID + "&key=" + token;

		if (this._mounted) {
			this.setState({loading:true});
		}

		fetch(endpoint, {
			method: "GET",
			headers: {
				Accept: "application/json", "Content-Type": "application/json"
			}
		})
		.then((response) => {
			return response.json();
		})
		.then(async (json) => {
			if ("data" in json) {
				if (this._mounted) {
					let diaryEntries = {};

					Object.keys(json.data).map(key => {
						let entry = json.data[key];
						let entryID = entry.entryID;
						delete entry.entryID;
						diaryEntries[entryID] = entry;
					});

					this.setState({entries:diaryEntries});
				}
			}

			if (this._mounted) {
				this.setState({loading:false});
			}
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

	onRefresh = () => {
		this.setState({refreshing:true})
		this.getData();
		wait(750).then(() => this.setState({refreshing:false}));
	};

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
		this._mounted = true;

		const { theme, toggleTheme } = this.context;
		
		this.setState({theme:theme});
		this.toggleTheme = toggleTheme;

		this.getData();

		if (this._mounted) {
			this.setState({loading:true});
		}

		this.navigation.addListener("focus", () => {
			this.getData();
		});
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	getCards(object) {
		return Object.keys(object).map(entryID => {
			return (
				<Card key={entryID}>
					<View>
						<TextInput style={[globalComponentStyles.inputFieldMultiline, styles[`inputFieldMultiline${this.state.theme}`]]} placeholder="Entry..." multiline={true} onChangeText={(value) => this.updateEntry(entryID, value)} value={this.state.entries[entryID]["entry"]} placeholderTextColor={(this.state.theme === "Dark") ? globalColorsDark.mainPlaceholder : globalColors.mainPlaceholder}></TextInput>
						<View style={styles.cardButtonWrapper}>
							<TouchableOpacity style={styles.actionButton} onPress={() => this.deleteEntry(entryID)}>
								<Text style={styles.actionText}>Delete</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.actionButton, { marginLeft:10 }]} onPress={() => this.saveEntry(entryID, this.state.entries[entryID]["entry"])}>
								<Text style={styles.actionText}>Save</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Card>
			);
		});
	}

	getPrevious() {
		if (this.state.from - 10 >= 0) {
			this.setState({from:this.state.from - 10});
			this.setState({to:this.state.to - 10});
		}
	}

	getNext() {
		this.setState({from:this.state.from + 10});
		this.setState({to:this.state.to + 10});
	}

	getRange(from, to, object) {
		let items = {};
		let keys = Object.keys(object);

		for (let i = from; i < to; i++) {
			if (!empty(object[keys[i]])) {
				items[keys[i]] = object[keys[i]];
			}
		}
		return items;
	}

	updateEntry(entryID, entry) {
		let current = this.state.entries;
		
		if (entryID in current) {
			current[entryID]["entry"] = entry;
			this.setState({entries:current});
		}
	}

	async saveEntry(entryID, entry) {		
		let patientID = await AsyncStorage.getItem("patientID");
		let key = await AsyncStorage.getItem("token");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/diary-entries/update.php?key=" + key;
		let method = "PUT";
		let body = { patientID:patientID, entryID:entryID, entry:entry };

		if (this._mounted) {
			this.setState({loading:true});
		}
		
		fetch(endpoint, {
			method: method,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		.then(() => {
			setTimeout(() => {
				showMessage({
					message: "Entry Updated",
					type: "success"
				})
				this.getData();
			}, 1000);
		})
		.catch((error) => {
			console.log(error);
			this.getData();
			showMessage({
				message: "Network Error",
				type: "danger"
			});
		});
	}

	async deleteEntry(entryID) {		
		let patientID = await AsyncStorage.getItem("patientID");
		let key = await AsyncStorage.getItem("token");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/diary-entries/delete.php?key=" + key;
		let method = "DELETE";
		let body = { patientID:patientID, entryID:entryID };

		if (this._mounted) {
			this.setState({loading:true});
		}
		
		fetch(endpoint, {
			method: method,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		.then(() => {
			setTimeout(() => {
				showMessage({
					message: "Entry Deleted",
					type: "success"
				})
				this.getData();
			}, 1000);
		})
		.catch((error) => {
			console.log(error);
			this.getData();
			showMessage({
				message: "Network Error",
				type: "danger"
			});
		});
	}
	
	render() {
		return (
			<View style={[styles.container, styles[`container${this.state.theme}`]]}>
				{ this.state.loading &&
					<LoadingScreen>Loading...</LoadingScreen>
				}
				<TopBar navigation={this.navigation} settings={this.state.settings} setSettings={this.setSettings} page={this}>Recording Falls</TopBar>
				{ this.state.settings &&
					<SettingsPopup></SettingsPopup> 
				}
				<ScrollView style={styles.cardContainer} contentContainerStyle={{paddingBottom: 20, paddingLeft: 20}}>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, styles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>Today's Number of Falls</Text>
						<TextInput style={[globalComponentStyles.inputField, styles[`inputFieldMultiline${this.state.theme}`], styles[`textColor${this.state.theme}`]]} placeholder="Number..." multiline={false} keyboardType="numeric" onChangeText={(value) => this.setState({falls:value})} value={this.state.falls} placeholderTextColor={(this.state.theme === "Dark") ? globalColorsDark.mainPlaceholder : globalColors.mainPlaceholder}></TextInput>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity style={styles.actionButton} onPress={() => this.saveFalls()}>
								<Text style={styles.actionText}>Confirm</Text>
							</TouchableOpacity>
						</View>
					</Card>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, styles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>Diary Entry</Text>
						<TextInput style={[[globalComponentStyles.inputFieldMultiline,{height: 120}], styles[`inputFieldMultiline${this.state.theme}`], styles[`textColor${this.state.theme}`]]} placeholder="Entry..." multiline={true} onChangeText={(value) => this.setState({diary:value})} value={this.state.diary} placeholderTextColor={(this.state.theme === "Dark") ? globalColorsDark.mainPlaceholder : globalColors.mainPlaceholder}></TextInput>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity style={styles.actionButton} onPress={() => this.saveDiary()}>
								<Text style={styles.actionText}>Save</Text>
							</TouchableOpacity>
						</View>
					</Card>
					<View style={styles.diaryWrapper}>
						<TouchableOpacity style={styles.diaryButton} onPress={() => this.setState({modalVisible:true})}>
							<Text style={styles.actionText}>View Diary Entries</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.centeredView}>
						<Modal
							animationType="slide"
							transparent={true}
							visible={this.state.modalVisible}
							onRequestClose={() => {this.setState({modalVisible:false})}}
						>
							<View style={[styles.centeredView, styles[`centeredView${this.state.theme}`]]}>
								<View style={[styles.modalView, styles[`modalView${this.state.theme}`]]}>
									<View style={[styles.modalButtonWrapper, styles[`modalButtonWrapper${this.state.theme}`]]}>
										<TouchableOpacity style={[styles.actionButton, styles.backButton]} onPress={() => this.setState({modalVisible:false})}>
											<Text style={styles.textStyle}>Back</Text>
										</TouchableOpacity>
										<TouchableOpacity style={[styles.actionButton, styles.previousButton]} onPress={() => this.getPrevious()}>
											<Text style={styles.textStyle}>Previous</Text>
										</TouchableOpacity>
										<TouchableOpacity style={[styles.actionButton, styles.nextButton]} onPress={() => this.getNext()}>
											<Text style={styles.textStyle}>Next</Text>
										</TouchableOpacity>
									</View>
									<ScrollView style={styles.cardContainer} contentContainerStyle={{paddingBottom: 20, paddingLeft: 20}} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}>
										{ !empty(this.state.entries) &&
											<View>
												{
													this.getCards(this.getRange(this.state.from, this.state.to, this.state.entries))
												}
											</View>
										}
									</ScrollView>
								</View>
							</View>
						</Modal>
					</View>
				</ScrollView>
			</View>
		);
	}
}

function empty(value) {
	if (typeof value === "object" && value !== null && Object.keys(value).length === 0) {
		return true;
	}
	if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
		return true;
	}
	return false;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: globalColors.mainSecond,
		width: "100%",
	},
	containerDark: {
		backgroundColor: globalColorsDark.mainThird
	},
	cardContainer: {
		width: "100%",
		height: "100%"
	},
	cardTitle: {
		color: globalColors.mainContrast
	},
	cardTitleDark: {
		color: globalColorsDark.mainContrast
	},
	inputFieldMultilineDark: {
		backgroundColor: globalColorsDark.mainThird,
		color: globalColorsDark.mainContrast
	},
	textColor: {
		color: globalColors.mainContrast
	},
	textColorDark: {
		color: globalColorsDark.mainContrast
	},
	buttonWrapper: {
		width: "100%",
		marginTop: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	cardButtonWrapper: {
		width: "100%",
		marginTop: 15,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row"
	},
	modalButtonWrapper: {
		width: "100%",
		height: 70,
		marginTop: 0,
		justifyContent: "center",
		alignItems: "center",
		borderBottomColor: globalColors.mainSecond,
		borderBottomWidth: 2,
		borderStyle: "solid"
	},
	modalButtonWrapperDark: {
		borderBottomColor: globalColorsDark.mainFourth,
	},
	actionButton: {
		backgroundColor: globalColors.accentDark,
		width: 80,
		height: 35,
		justifyContent: "center",
		borderRadius: globalStyles.borderRadius,
	},
	backButton: {
		position: "absolute",
		top: 20,
		left: 20,
		width: 60,
	},
	previousButton: {
		position: "absolute",
		top: 20,
		right: 120,
		width: 90
	},
	nextButton: {
		position: "absolute",
		top: 20,
		right: 20,
		width: 90
	},
	diaryWrapper: {
		width: "95%",
		marginTop: 45,
		justifyContent: "center",
		alignItems: "center"
	},
	diaryButton: {
		backgroundColor: globalColors.accentDark,
		width: "auto",
		height: 40,
		paddingLeft: 10,
		paddingRight: 10,
		justifyContent: "center",
		borderRadius: globalStyles.borderRadius,
	},
	actionText: {
		fontFamily: globalStyles.fontFamily,
		fontSize: globalStyles.mediumFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	centeredViewDark: {
		backgroundColor: globalColorsDark.mainThird
	},
	modalView: {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
		alignItems: "center",
	},
	modalViewDark: {
		backgroundColor: globalColorsDark.mainThird
	},
	button: {
		borderRadius: 20,
		padding: 10,
		marginTop: "150%",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	inputFieldMultilineDark: {
		backgroundColor: globalColorsDark.mainThird,
		color: globalColorsDark.mainContrast
	}
});