import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles } from '../styles/global';
import { TopBar } from '../components/TopBar';
import { SettingsPopup} from '../components/SettingsPopup';
import Card from '../components/Card';

export class HelpPage extends Component {
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
	}

	render() {
		return (
			<View>
				<TopBar navigation={this.navigation}>Help</TopBar>
				<ScrollView style={styles.cardContainer} contentContainerStyle={{paddingBottom: 70, paddingLeft: 20}}>
					<View style={styles.imageWrapper}>
						<Image style={styles.image} source={require("../assets/Logo.png")}/>
						<Text style={styles.imageText}>BRIMS SMS</Text>
					</View>
					<Card>
						<Text style={globalComponentStyles.cardTitle}>How do I change the notification time?</Text>
						<Text style={styles.helpText}>Tap on the cogwheel icon on the top left, and choose the time of day you'd rather get a notifcation at.</Text>
					</Card>
					<Card>
						<Text style={globalComponentStyles.cardTitle}>How do I record a fall?</Text>
						<Text style={styles.helpText}>Go to the "Falls" page, and fill out the box that asks you to enter the number of times you've fallen today.</Text>
					</Card>
					<Card>
						<Text style={globalComponentStyles.cardTitle}>What's the "Questions" page for?</Text>
						<Text style={styles.helpText}>Your researchers might have questions for you that you can answer if you go to the "Questions" page you can fill out those questions.</Text>
					</Card>
					<Card>
						<Text style={globalComponentStyles.cardTitle}>How does the "Charts" page work?</Text>
						<Text style={styles.helpText}>Allows the user to see a clear graph for trends displaying the progression of their falls.</Text>
					</Card>
					<Card>
						<Text style={globalComponentStyles.cardTitle}>What's the Calendar page for?</Text>
						<Text style={styles.helpText}>Calendar page highlights the days in a month recorded by the falls page that the user has fallen.</Text>
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
	cardContainer: {
		width: "100%",
		height: "100%"
	},
	helpText: {
		lineHeight: 25,
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



