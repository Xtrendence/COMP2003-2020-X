import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { globalColors, globalColorsDark, globalStyles, globalComponentStyles } from '../styles/global';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { TopBar } from '../components/TopBar';
import LoadingScreen from '../components/LoadingScreen';
import { ThemeContext } from '../utils/ThemeProvider';
import { SettingsPopup} from '../components/SettingsPopup';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales["en"] = {
	monthNames: ["Janurary","Feburary","March","April","May","June","July","August","September","October","November","Decemeber"],
	monthNamesShort: ["Jan","Feb","Mar","Apr","May","Jun","Jul.","Aug","Sept.","Oct.","Nov","Dec"],
	dayNames: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
	dayNamesShort: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
	today: "Today"
};
LocaleConfig.defaultLocale = "en";

const calendarTheme = {
	backgroundColor: "rgba(0,0,0,0)",
	calendarBackground: "rgba(0,0,0,0)",
	textSectionTitleColor: "#b6c1cd",
	textSectionTitleDisabledColor: "#d9e1e8",
	selectedDayBackgroundColor: globalColors.accentLight,
	selectedDayTextColor: globalColors.accentContrast,
	todayTextColor: globalColors.accentLight,
	dayTextColor: globalColors.mainPlaceholder,
	textDisabledColor: "#d9e1e8",
	dotColor: "#00adf5",
	selectedDotColor: "#ffffff",
	arrowColor: "orange",
	disabledArrowColor: "#d9e1e8",
	monthTextColor: "blue",
	indicatorColor: "blue",
	textDayFontFamily: "roboto",
	textMonthFontFamily: "roboto",
	textDayHeaderFontFamily: "roboto",
	textDayFontWeight: "500",
	textMonthFontWeight: "bold",
	textDayHeaderFontWeight: "500",
	textDayFontSize: 16,
	textMonthFontSize: 16,
	textDayHeaderFontSize: 16
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export class CalendarPage extends Component {
	static contextType = ThemeContext;
	
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			settings: false,
			date: new Date(),
			data: {},
			loading: false,
		};
		this._mounted;
		this.toggleTheme;
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
		this.getData(new Date());

		this.navigation.addListener("focus", () => {
			this.getData(this.state.date);
		});
	}

	setSettings(page, value) {
		page.setState({settings:value})
	}

	render() {
		return (
			<View style={[styles.container, styles[`container${this.state.theme}`]]}>
				{ this.state.loading &&
					<LoadingScreen>Loading...</LoadingScreen>
				}
				<TopBar navigation={this.navigation} settings={this.state.settings} setSettings={this.setSettings} page={this}>Calendar</TopBar>
				{ this.state.settings &&
					<SettingsPopup></SettingsPopup> 
				}
				<View style={[styles.calendarWrapper, styles[`calendarWrapper${this.state.theme}`]]}>
					<Calendar
						key={this.formatDate(this.state.date)}
						markedDates={this.state.data}
						current={this.formatDate(this.state.date, "-")}
						minDate={"2020-01-01"}
						maxDate={"2025-12-31"}
						onDayPress={(day) => { this.showDay(this.state.data, day.dateString) }}
						monthFormat={"yyyy MM"}
						hideArrows={true}
						hideExtraDays={true}
						disableMonthChange={false}
						firstDay={1}
						hideDayNames={false}
						showWeekNumbers={false}
						disableAllTouchEventsForDisabledDays={false}
						renderHeader={() => {
							return <Text style={[styles.headerText, styles[`headerText${this.state.theme}`]]}>{LocaleConfig.locales["en"]["monthNames"][this.state.date.getMonth()] + " " + this.state.date.getFullYear()}</Text>
						}}
						enableSwipeMonths={false}
						theme={calendarTheme}
					/>
				</View>
				<View style={styles.navigationWrapper}>
					<TouchableOpacity style={styles.actionButton} onPress={() => this.navigatePrevious()}>
						<Icon name="chevron-left" color={globalColors.accentContrast} size={40}/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.todayButton} onPress={() => this.navigateToday()}>
						<Text style={styles.actionText}>This Month</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.actionButton} onPress={() => this.navigateNext()}>
						<Icon name="chevron-right" color={globalColors.accentContrast} size={40}/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	showDay(data, day) {
		if (day in data) {
			let falls = data[day].falls;

			let text = (falls === 1) ? " fall" : " falls.";

			showMessage({
				message: day,
				description: "You had " + falls + text,
				type: "info",
				backgroundColor: globalColors.accentMedium,
				duration: 4000
			});
		}
	}

	async getData(date) {
		let from = new Date(date.getFullYear(), date.getMonth(), 1);
		let to = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		let token = await AsyncStorage.getItem("token");
		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/falls/read-date.php?id=" + patientID + "&from=" + this.formatDateTime(from) + "&to=" + this.formatDateTime(to) + "&key=" + token;

		this.setState({modal:false});
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

			if (!empty(json.data)) {
				let falls = json.data;
				Object.keys(falls).map(key => {
					let fall = falls[key];
					let dateTime = fall["fall_date"].toString().replace(" ", "T");
					let date = this.formatDate(dateTime, "-");
					if (date in days) {
						days[date].falls += 1;
					} else {
						days[date] = { falls:1, selected:true };
					}
				});
			}

			this.setState({data:days});
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

	navigateToday() {
		let date = new Date();
		this.setState({date:date});
		this.getData(date);
	}

	navigatePrevious() {
		let date = this.previousMonth(this.state.date);
		this.setState({date:date});
		this.getData(date);
	}

	navigateNext() {
		let date = this.nextMonth(this.state.date);
		this.setState({date:date});
		this.getData(date);
	}

	previousMonth(date) {
		return new Date(date.setMonth(date.getMonth() - 1));
	}

	nextMonth(date) {
		return new Date(date.setMonth(date.getMonth() + 1));
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
}

function empty(value) {
	if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
		return true;
	}
	return false;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		backgroundColor: globalColors.mainSecond,
	},
	containerDark: {
		backgroundColor: globalColorsDark.mainThird
	},
	modalTextWrapper: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		marginTop: 20,
	},
	modalText: {
		fontWeight: "bold",
		fontSize: 18,
		fontFamily: globalStyles.fontFamily,
		width: 160,
		lineHeight: 40,
		color: globalColors.accentContrast,
		borderRadius: globalStyles.borderRadius,
		textAlign: "center",
		backgroundColor: globalColors.accentDark,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
	},
	calendarWrapper: {
		width: screenWidth - 40,
		marginLeft: 20,
		marginTop: 20,
		borderRadius: globalStyles.borderRadius,
		overflow: "hidden",
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
	},
	calendarWrapperDark: {
		backgroundColor: globalColorsDark.mainFirst
	},
	headerText: {
		fontWeight: "bold",
		color: globalColors.mainContrast,
		paddingTop: 10,
		paddingBottom: 10
	},
	headerTextDark: {
		color: globalColorsDark.mainContrast
	},
	navigationWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		flexWrap: "wrap",
		maxHeight: 40,
		marginTop: 20,
		paddingLeft: 20,
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
	actionText: {
		fontFamily: globalStyles.fontFamily,
		fontSize: globalStyles.mediumFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
	todayButton: {
		backgroundColor: globalColors.accentDark,
		width: screenWidth - 160,
		marginLeft: 20,
		marginRight: 20,
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