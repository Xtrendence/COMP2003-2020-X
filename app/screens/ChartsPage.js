import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles } from '../styles/global';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopBar } from '../components/TopBar';
import Card from '../components/Card';
import LoadingScreen from '../components/LoadingScreen';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export class ChartsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			timeFrom: this.previousWeek(new Date()),
			timeTo: new Date(),
			timespan: "",
			labels: [""],
			data: [0],
			segments: 4
		};
		this.navigation = props.navigation;
	}

	// Navigates to today's date on the chart.
	navigateToday() {
		let from = this.previousWeek(new Date());
		let to = new Date();
		this.setState({timeFrom:from});
		this.setState({timeTo:to});
		this.getData(from, to);
	}

	// Navigates to the previous week.
	navigatePrevious() {
		let from = this.previousWeek(this.state.timeFrom);
		let to = this.state.timeFrom;
		this.setState({timeFrom:from});
		this.setState({timeTo:to});
		this.getData(from, to);
	}

	// Navigates to the next week.
	navigateNext() {
		let from = this.state.timeTo;
		let to = this.nextWeek(this.state.timeTo);
		if (to <= new Date()) {
			this.setState({timeFrom:from});
			this.setState({timeTo:to});
			this.getData(from, to);
		} else {
			showMessage({
				message: "Date Error",
				description: "Time travel is strictly prohibited.",
				type: "warning"
			});
		}
	}

	// Format a date to YYYY-MM-DD where the hyphen can be any character.
	formatDate(date, separator) {
		let d = new Date(date), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();

		if (month.length < 2) {
			month = "0" + month;
		}
		if (day.length < 2) {
			day = "0" + day;
		}
		return [year, month, day].join(separator);
	}

	// Format a date to YYYY-MM-DD HH:MM:SS.
	formatDateTime(date) {
		return date.getFullYear() + "-" +
			("00" + (date.getMonth() + 1)).slice(-2) + "-" +
			("00" + date.getDate()).slice(-2) + "+" +
			("00" + date.getHours()).slice(-2) + ":" +
			("00" + date.getMinutes()).slice(-2) + ":" +
			("00" + date.getSeconds()).slice(-2);
	}

	// Get the previous week's date.
	previousWeek(date) {
		return new Date(date.getTime() - (60 * 60 * 24 * 6 * 1000));
	}

	// Get next week's date.
	nextWeek(date) {
		return new Date(date.getTime() + (60 * 60 * 24 * 6 * 1000));
	}

	// Determines if a number is prime.
	isPrime(num) {
		for (let i = 2; i < num; i++) {
			if (num % i === 0) {
				return false;
			}
			return num > 1;
		}
	}

	// Finds the lowest number divisble by a given number.
	findLowestDivisible(num) {
		for (let i = 2; i <= num; i++) {
			if (num % i === 0) {
				return i;
			}
		}
	}

	// Finds the highest number divisible by a given number.
	findHighestDivisible(num) {
		for (let i = num - 1; i >= 2; i--) {
			if (num % i === 0) {
				return i;
			}
		}
	}

	// Fetch the user's fall data from the API.
	async getData(from, to) {
		let token = await AsyncStorage.getItem("token");
		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/falls/read-date.php?id=" + patientID + "&from=" + this.formatDateTime(from) + "&to=" + this.formatDateTime(to) + "&key=" + token;

		this.setState({timespan:this.formatDate(from, "/") + " - " + this.formatDate(to, "/")});
		
		this.setState({loading:true});

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
			let days = {};
			let chartLabels = [];
			let chartData = [];

			for (let i = 0; i < 7; i++) {
				let dateTime = new Date(from.getTime() + (60 * 60 * 24 * i * 1000));
				let labelDate = this.formatDate(dateTime, "/");
				let formatted = labelDate.slice(-5);
				chartLabels.push(formatted);

				let date = this.formatDate(dateTime, "-").toString();
				days[date] = 0;
			}

			if (!empty(json.data)) {
				let falls = json.data;
				Object.keys(falls).map(key => {
					let fall = falls[key];
					let dateTime = fall["fall_date"].toString().replace(" ", "T");
					let date = this.formatDate(dateTime, "-");
					days[date] = date in days ? days[date] + 1 : 1;
				});
			}

			Object.keys(days).map(key => {
				chartData.push(days[key]);
			});

			this.setState({labels:chartLabels});
			this.setState({data:chartData});

			let chartSegments = 1;
			let max = Math.max.apply(null, chartData);
			
			if (max > 8) {
				if (this.isPrime(max)) {
					chartSegments = 5;
				} else {
					let divisible = this.findHighestDivisible(max);
					chartSegments = divisible;
				}
			} else if (max <= 8 && max > 1) {
				chartSegments = max;
			} else {
				chartSegments = 1;
			}

			if (chartSegments > 10) {
				chartSegments = 10;
			}

			this.setState({segments:chartSegments});

			this.setState({loading:false});
		})
		.catch((error) => {
			console.log(error);
			this.setState({loading:false});
			showMessage({
				message: "Network Error",
				type: "danger"
			});
		});
	}

	componentDidMount() {
		this.getData(this.previousWeek(new Date()), new Date());
		this.setState({loading:true});
		this.navigation.addListener("focus", () => {
			let history = this.navigation.dangerouslyGetState().history;
			if (history.length > 0) {
				let previous = history[history.length - 2];
				if (!empty(previous) && "key" in previous && previous.key.includes("Falls-")) {
					this.setState({loading:true});
					setTimeout(() => {
						this.getData(this.previousWeek(new Date()), new Date());
					}, 2500);
				} else {
					this.getData(this.previousWeek(new Date()), new Date());
				}
			} else {
				this.getData(this.previousWeek(new Date()), new Date());
			}
		});
	}
	
	render() {
		return (
			<View style={styles.container}>
				{ this.state.loading &&
					<LoadingScreen>Loading...</LoadingScreen>
				}
				<TopBar navigation={this.navigation}>Charts</TopBar>
				<ScrollView style={styles.scrollView} contentContainerStyle={{paddingBottom: 20, paddingLeft: 20}}>
					{ !this.state.loading &&
						<View style={styles.pageWrapper}>
							<View style={styles.banner}>
								<Text style={styles.bannerText}>Number Of Falls</Text>
							</View>
							<View style={styles.chartWrapper}>
								{ this.state.segments === 1 &&
									<Text style={styles.chartLabelFix}>1</Text>
								}
								<LineChart
									data={{
										labels: this.state.labels,
										datasets: [
											{
												data: this.state.data
											}
										]
									}}
									width={screenWidth - 40 - 40}
									height={250}
									segments={this.state.segments}
									withHorizontalLines={true}
									withVerticalLines={false}
									chartConfig={{
										backgroundColor: globalColors.mainFirst,
										backgroundGradientFrom: globalColors.mainFirst,
										backgroundGradientTo: globalColors.mainFirst,
										decimalPlaces: 0,
										color: () => "rgba(95,103,129,0.8)",
										labelColor: () => "rgba(95,103,129,1)",
										style: {
											borderRadius: 0
										},
										propsForDots: {
											r: "4",
											strokeWidth: "2",
											stroke: globalColors.mainFifth
										},
										propsForVerticalLabels: {
											fontFamily: globalStyles.fontFamily,
											fontSize: 10,
											rotation: -45,
										},
										propsForBackgroundLines: {
											strokeWidth: 2,
											stroke: "rgba(95,103,129,0.4)"
										}
									}}
									bezier
									style={{
										backgroundColor: "rgba(255,255,255,0)",
										borderRadius: globalStyles.borderRadius,
									}}
								/>
							</View>
							<View style={styles.navigationWrapper}>
								<TouchableOpacity style={styles.actionButton} onPress={() => this.navigatePrevious()}>
									<Icon name="chevron-left" color={globalColors.accentContrast} size={40}/>
								</TouchableOpacity>
								<Text style={styles.actionInfo}>{this.state.timespan}</Text>
								<TouchableOpacity style={styles.actionButton} onPress={() => this.navigateNext()}>
									<Icon name="chevron-right" color={globalColors.accentContrast} size={40}/>
								</TouchableOpacity>
							</View>
							{ this.nextWeek(this.state.timeTo) <= new Date() &&
								<View style={styles.todayWrapper}>
									<TouchableOpacity style={styles.todayButton} onPress={() => this.navigateToday()}>
										<Text style={styles.actionText}>This Week</Text>
									</TouchableOpacity>
								</View>
							}
						</View>
					}
				</ScrollView>
			</View>
		);
	}
}

function empty(value) {
	if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
		return true;
	}
	return false;
}

String.prototype.replaceAll = function(str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: globalColors.mainSecond,
	},
	scrollView: {
		width: "100%",
		height: "100%"
	},
	pageWrapper: {
		width: screenWidth - 40
	},
	banner: {
		backgroundColor: globalColors.accentLight,
		borderRadius: globalStyles.borderRadius,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
		marginTop: 20,
	},
	bannerText: {
		textAlign: "center",
		fontSize: globalStyles.smallFont,
		color: globalColors.accentContrast,
		fontFamily: globalStyles.fontFamily,
		fontWeight: "bold",
		paddingTop: 10,
		paddingBottom: 10,
	},
	chartWrapper: {
		paddingRight: 40,
		paddingTop: 20,
		paddingBottom: 10,
		backgroundColor: globalColors.mainFirst,
		borderRadius: globalStyles.borderRadius,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
		marginTop: 20,
		marginBottom: 20,
	},
	chartLabelFix: {
		fontSize: 12,
		fontFamily: globalStyles.fontFamily,
		position: "absolute",
		top: 24,
		left: 45,
		zIndex: 2,
		color: globalColors.accentLightest,
		opacity: 0.8
	},
	navigationWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		flexWrap: "wrap",
		maxHeight: 40,
	},
	actionButton: {
		backgroundColor: globalColors.accentDark,
		width: 40,
		height: 40,
		justifyContent: "center",
		borderRadius: globalStyles.borderRadius,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
	},
	actionInfo: {
		backgroundColor: globalColors.accentLight,
		width:screenWidth - 40 - 40 - 40 - 40,
		marginLeft: 20,
		marginRight: 20,
		lineHeight: 40,
		textAlign: "center",
		color: globalColors.accentContrast,
		fontFamily: globalStyles.fontFamily,
		fontWeight: "bold",
		fontSize: globalStyles.smallFont,
		borderRadius: globalStyles.borderRadius,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
	},
	actionText: {
		fontFamily: globalStyles.fontFamily,
		fontSize: globalStyles.mediumFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
	todayWrapper: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 20
	},
	todayButton: {
		backgroundColor: globalColors.accentDark,
		width: screenWidth - 40,
		height: 40,
		justifyContent: "center",
		borderRadius: globalStyles.borderRadius,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
	}
});