import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles } from '../styles/global';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopBar } from '../components/TopBar';
import Card from '../components/Card';
import LoadingScreen from '../components/LoadingScreen';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const ChartsPage = ({ navigation }) => {
	const [loading, setLoading] = React.useState(false);
	const [timespan, setTimespan] = React.useState("");
	const [labels, setLabels] = React.useState([""]);
	const [data, setData] = React.useState([""]);

	useEffect(() => {
		let today = new Date("2020-11-30T00:00:00");
		let lastWeek = previousWeek(today);
		getData(lastWeek, today);
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
							segments={4}
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
									borderRadius: 10
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
						<TouchableOpacity style={styles.actionButton}>
							<Icon name="chevron-left" color={globalColors.accentContrast} size={40}/>
						</TouchableOpacity>
						<Text style={styles.actionInfo}>{timespan}</Text>
						<TouchableOpacity style={styles.actionButton}>
							<Icon name="chevron-right" color={globalColors.accentContrast} size={40}/>
						</TouchableOpacity>
					</View>
				</View>
			}
		</View>
	);

	async function getData(from, to) {
		let token = await AsyncStorage.getItem("token");
		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/falls/read-date.php?id=" + patientID + "&from=" + formatDateTime(from) + "&to=" + formatDateTime(to) + "&key=" + token;

		console.log(endpoint);

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
			let chartLabels = [];
			let chartData = [];

			console.log(json);

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
		return new Date(date.getTime() - (60 * 60 * 24 * 7 * 1000));
	}

	function nextWeek(date) {
		return new Date(date.getTime() + (60 * 60 * 24 * 7 * 1000));
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