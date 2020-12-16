import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles } from '../styles/global';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopBar } from '../components/TopBar';
import Card from '../components/Card';
import LoadingScreen from '../components/LoadingScreen';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const ChartsPage = ({ navigation }) => {
	const [loading, setLoading] = React.useState(false);
	const [timeFrom, setTimeFrom] = React.useState(previousWeek(new Date()));
	const [timeTo, setTimeTo] = React.useState(new Date());
	const [timespan, setTimespan] = React.useState("");
	const [labels, setLabels] = React.useState([""]);
	const [data, setData] = React.useState([0]);
	const [segments, setSegments] = React.useState(4);

	useEffect(() => {
		getData(previousWeek(new Date()), new Date());
	}, []);

	return (
		<View style={styles.container}>
			{ loading &&
				<LoadingScreen>Loading...</LoadingScreen>
			}
			<TopBar navigation={navigation}>Charts</TopBar>
			{ !loading &&
				<View>
					<View style={styles.banner}>
						<Text style={styles.bannerText}>Number Of Falls</Text>
					</View>
					<View style={styles.chartWrapper}>
						{ segments === 1 &&
							<Text style={styles.chartLabelFix}>1</Text>
						}
						<LineChart
							data={{
								labels: labels,
								datasets: [
									{
										data: data
									}
								]
							}}
							width={screenWidth - 40 - 40}
							height={250}
							segments={segments}
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
						<TouchableOpacity style={styles.actionButton} onPress={() => navigatePrevious()}>
							<Icon name="chevron-left" color={globalColors.accentContrast} size={40}/>
						</TouchableOpacity>
						<Text style={styles.actionInfo}>{timespan}</Text>
						<TouchableOpacity style={styles.actionButton} onPress={() => navigateNext()}>
							<Icon name="chevron-right" color={globalColors.accentContrast} size={40}/>
						</TouchableOpacity>
					</View>
				</View>
			}
		</View>
	);

	function navigatePrevious() {
		let from = previousWeek(timeFrom);
		let to = timeFrom;
		setTimeFrom(from);
		setTimeTo(to);
		getData(from, to);
	}

	function navigateNext() {
		let from = timeTo;
		let to = nextWeek(timeTo);
		if (to <= new Date()) {
			setTimeFrom(from);
			setTimeTo(to);
			getData(from, to);
		} else {
			showMessage({
				message: "Date Error",
				description: "Time travel is strictly prohibited.",
				type: "warning"
			});
		}
	}

	async function getData(from, to) {
		let token = await AsyncStorage.getItem("token");
		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/falls/read-date.php?id=" + patientID + "&from=" + formatDateTime(from) + "&to=" + formatDateTime(to) + "&key=" + token;

		setTimespan(formatDate(from, "/") + " - " + formatDate(to, "/"));
		
		setLoading(true);
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
				let labelDate = formatDate(dateTime, "/");
				let formatted = labelDate.slice(-5);
				chartLabels.push(formatted);

				let date = formatDate(dateTime, "-").toString();
				days[date] = 0;
			}

			if (!empty(json.data)) {
				let falls = json.data;
				Object.keys(falls).map(key => {
					let fall = falls[key];
					let dateTime = fall["fall_date"].toString().replace(" ", "T");
					let date = formatDate(dateTime, "-");
					days[date] = date in days ? days[date] + 1 : 1;
				});
			}

			Object.keys(days).map(key => {
				chartData.push(days[key]);
			});

			setLabels(chartLabels);
			setData(chartData);

			let chartSegments = 1;
			let max = Math.max.apply(null, chartData);
			
			if (max > 8) {
				if (isPrime(max)) {
					chartSegments = 5;
				} else {
					let divisible = findHighestDivisible(max);
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

			setSegments(chartSegments);

			setLoading(false);
		})
		.catch((error) => {
			console.log(error);
			setLoading(false);
			showMessage({
				message: "Network Error",
				type: "danger"
			});
		});
	}

	function formatDate(date, separator) {
		let d = new Date(date), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();

		if (month.length < 2) {
			month = "0" + month;
		}
		if (day.length < 2) {
			day = "0" + day;
		}
		return [year, month, day].join(separator);
	}

	function formatDateTime(date) {
		return date.getFullYear() + "-" +
			("00" + (date.getMonth() + 1)).slice(-2) + "-" +
			("00" + date.getDate()).slice(-2) + "+" +
			("00" + date.getHours()).slice(-2) + ":" +
			("00" + date.getMinutes()).slice(-2) + ":" +
			("00" + date.getSeconds()).slice(-2);
	}

	function previousWeek(date) {
		return new Date(date.getTime() - (60 * 60 * 24 * 6 * 1000));
	}

	function nextWeek(date) {
		return new Date(date.getTime() + (60 * 60 * 24 * 6 * 1000));
	}

	function isPrime(num) {
		for (let i = 2; i < num; i++) {
			if (num % i === 0) {
				return false;
			}
			return num > 1;
		}
	}

	function findLowestDivisible(num) {
		for (let i = 2; i <= num; i++) {
			if (num % i === 0) {
				return i;
			}
		}
	}

	function findHighestDivisible(num) {
		for (let i = num - 1; i >= 2; i--) {
			if (num % i === 0) {
				return i;
			}
		}
	}

	String.prototype.replaceAll = function(str1, str2, ignore) {
		return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
	}

	function empty(value) {
		if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
			return true;
		}
		return false;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: globalColors.mainSecond,
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
	},
	actionButton: {
		backgroundColor: globalColors.accentLight,
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
		fontSize: globalStyles.mediumFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
});