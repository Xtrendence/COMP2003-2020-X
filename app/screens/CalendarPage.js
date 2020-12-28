import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalColors, globalStyles } from '../styles/global';
import { TopBar } from '../components/TopBar';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';


LocaleConfig.locales['fr'] = {
	monthNames: ['Janurary','Feburary','March','April','May','June','July','August','September','October','November','Decemeber'],
	monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul.','Aug','Sept.','Oct.','Nov','Dec'],
	dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	dayNamesShort: ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'],
	today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';

  

export const CalendarPage = ({ navigation }) => {
	return (
		<View>
			<TopBar navigation={navigation}>Calendar</TopBar>
			<View>
			<Calendar
				// Initially visible month. Default = Date()
				current={'2020-01-01'}
				// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
				minDate={'2020-01-01'}
				// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
				maxDate={'2020-12-31'}
				// Handler which gets executed on day press. Default = undefined
				onDayPress={(day) => {console.log('selected day', day)}}
				// Handler which gets executed on day long press. Default = undefined
				onDayLongPress={(day) => {console.log('selected day', day)}}
				// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
				monthFormat={'yyyy MM'}
				// Handler which gets executed when visible month changes in calendar. Default = undefined
				onMonthChange={(month) => {console.log('month changed', month)}}
				// Hide month navigation arrows. Default = false
				hideArrows={false}
				// Replace default arrows with custom ones (direction can be 'left' or 'right')
				// renderArrow={(direction) => (<Arrow/>)}
				// Do not show days of other months in month page. Default = false
				hideExtraDays={false}
				// If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
				// day from another month that is visible in calendar page. Default = false
				disableMonthChange={false}
				// If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
				firstDay={1}
				// Hide day names. Default = false
				hideDayNames={false}
				// Show week numbers to the left. Default = false
				showWeekNumbers={false}
				// Handler which gets executed when press arrow icon left. It receive a callback can go back month
				onPressArrowLeft={subtractMonth => subtractMonth()}
				// Handler which gets executed when press arrow icon right. It receive a callback can go next month
				onPressArrowRight={addMonth => addMonth()}
				// Disable left arrow. Default = false
				disableArrowLeft={false}
				// Disable right arrow. Default = false
				disableArrowRight={false}
				// Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
				disableAllTouchEventsForDisabledDays={false}
				// Replace default month and year title with custom one. the function receive a date as parameter.
				renderHeader={(date) => {/*Return JSX*/}}
				// Enable the option to swipe between months. Default = false
				enableSwipeMonths={false}
				// Collection of dates that have to be marked. Default = {}
			/>
			</View>
		</View>
		



	);
	


}