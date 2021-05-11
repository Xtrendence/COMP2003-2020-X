import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { globalColors, globalColorsDark, globalStyles, globalComponentStyles } from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopBar } from '../components/TopBar';
import { SettingsPopup } from '../components/SettingsPopup';
import Card from '../components/Card';
import { ThemeContext } from '../utils/ThemeProvider';

export class HelpPage extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			settings: false
		};
	}

	setSettings(page, value){
		page.setState({settings:value})
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

	render() {
		return (
			<View style={[styles.container, styles[`container${this.state.theme}`]]}>
				<TopBar navigation={this.navigation} settings={this.state.settings} setSettings={this.setSettings} page={this}>Help</TopBar>
				{ this.state.settings &&
                    <SettingsPopup></SettingsPopup> 
				}
				<ScrollView style={styles.cardContainer} contentContainerStyle={{paddingBottom: 70, paddingLeft: 20}}>
					<View style={styles.imageWrapper}>
						<Image style={styles.image} source={require("../assets/Logo.png")}/>
						<Text style={[globalComponentStyles.cardTitle, styles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>BRIMS SMS</Text>
					</View>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, styles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>How do I change the notification time?</Text>
						<Text style={[globalComponentStyles.textColour, styles.textColour, styles[`textColour${this.state.theme}`]]}>Tap on the cogwheel icon on the top left, and choose the time of day you'd rather get a notifcation at.</Text>
					</Card>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, styles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>How do I record a fall?</Text>
						<Text style={[globalComponentStyles.textColour, styles.textColour, styles[`textColour${this.state.theme}`]]}>Go to the "Falls" page, and fill out the box that asks you to enter the number of times you've fallen today.</Text>
					</Card>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, styles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>What's the "Questions" page for?</Text>
						<Text style={[globalComponentStyles.textColour, styles.textColour, styles[`textColour${this.state.theme}`]]}>Your researchers might have questions for you that you can answer. If you go to the "Questions" page, you can fill out those questions.</Text>
					</Card>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, styles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>How does the "Charts" page work?</Text>
						<Text style={[globalComponentStyles.textColour, styles.textColour, styles[`textColour${this.state.theme}`]]}>It allows you to see a clear graph for trends by displaying the progression of your falls.</Text>
					</Card>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, styles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>What's the "Calendar" page for?</Text>
						<Text style={[globalComponentStyles.textColour, styles.textColour, styles[`textColour${this.state.theme}`]]}>The "Calendar" page highlights the days in a month on which you had at least one fall.</Text>
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
	helpText: {
		lineHeight: 25,
	},
	textColour: {
		color: globalColors.mainContrast
	},
	textColourDark: {
		color: globalColorsDark.mainContrast
	},
	image: {
		width: 120,
		height: 120,
	},
	imageWrapper: {
		alignItems: "center",
		justifyContent: "center",
		marginLeft: -20,
		paddingTop: 20,
	},
	imageText: {
		fontFamily: globalStyles.fontFamily,
		fontWeight: "bold",
		fontSize: globalStyles.bigFont, 
		color: globalColors.mainContrast,
		paddingTop: 10,
	}
});



