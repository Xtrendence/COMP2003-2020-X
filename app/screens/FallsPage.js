import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { globalColors, globalColorsDark, globalStyles, globalComponentStyles,  } from '../styles/global';
import { TopBar } from '../components/TopBar';
import Card from '../components/Card';
import LoadingScreen from '../components/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { SettingsPopup } from '../components/SettingsPopup';
import { ThemeContext } from '../utils/ThemeProvider';

export class FallsPage extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);
		this.state = {
			falls: 0,
			diary: null,
			loading: false,
			settings: false,
		};
		this.navigation = props.navigation;
		
	}

	setSettings(page, value){
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

	async saveDiary() {
		
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
						<TextInput style={[globalComponentStyles.inputField,  styles[`textColour${this.state.theme}`]]} placeholder="Number..." multiline={false} keyboardType="numeric" onChangeText={(value) => this.setState({falls:value})} value={this.state.falls.toString()}></TextInput>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity style={styles.actionButton} onPress={() => this.saveFalls()}>
								<Text style={styles.actionText}>Confirm</Text>
							</TouchableOpacity>
						</View>
					</Card>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, styles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>Diary Entry</Text>
						<TextInput style={[[globalComponentStyles.inputFieldMultiline,{height: 120}], styles[`textColour${this.state.theme}`]]} placeholder="..." multiline={true} onChangeText={(value) => this.setState({diary:value})} value={this.state.diary}></TextInput>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity style={styles.actionButton} onPress={() => this.saveDiary()}>
								<Text style={styles.actionText}>Save</Text>
							</TouchableOpacity>
						</View>
					</Card>
				</ScrollView>
			</View>
		);
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
	textColour: {
		color: globalColors.mainContrast
	},
	textColourDark: {
		color: globalColorsDark.mainContrast
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
		fontFamily: globalStyles.fontFamily,
		fontSize: globalStyles.mediumFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
});
