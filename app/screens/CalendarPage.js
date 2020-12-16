import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalColors, globalStyles } from '../styles/global';
import { TopBar } from '../components/TopBar';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';


LocaleConfig.locales['fr'] = {
	monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
	monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
	dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
	dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
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
				current={'2012-03-01'}
				// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
				minDate={'2012-05-10'}
				// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
				maxDate={'2012-05-30'}
				// Handler which gets executed on day press. Default = undefined
				onDayPress={(day) => {console.log('selected day', day)}}
				// Handler which gets executed on day long press. Default = undefined
				onDayLongPress={(day) => {console.log('selected day', day)}}
				// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
				monthFormat={'yyyy MM'}
				// Handler which gets executed when visible month changes in calendar. Default = undefined
				onMonthChange={(month) => {console.log('month changed', month)}}
				// Hide month navigation arrows. Default = false
				hideArrows={true}
				// Replace default arrows with custom ones (direction can be 'left' or 'right')
				renderArrow={(direction) => (<Arrow/>)}
				// Do not show days of other months in month page. Default = false
				hideExtraDays={true}
				// If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
				// day from another month that is visible in calendar page. Default = false
				disableMonthChange={true}
				// If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
				firstDay={1}
				// Hide day names. Default = false
				hideDayNames={true}
				// Show week numbers to the left. Default = false
				showWeekNumbers={true}
				// Handler which gets executed when press arrow icon left. It receive a callback can go back month
				onPressArrowLeft={subtractMonth => subtractMonth()}
				// Handler which gets executed when press arrow icon right. It receive a callback can go next month
				onPressArrowRight={addMonth => addMonth()}
				// Disable left arrow. Default = false
				disableArrowLeft={true}
				// Disable right arrow. Default = false
				disableArrowRight={true}
				// Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
				disableAllTouchEventsForDisabledDays={true}
				// Replace default month and year title with custom one. the function receive a date as parameter.
				renderHeader={(date) => {/*Return JSX*/}}
				// Enable the option to swipe between months. Default = false
				enableSwipeMonths={true}
				// Collection of dates that have to be marked. Default = {}
				markedDates={{
					'2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
					'2012-05-17': {marked: true},
					'2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
					'2012-05-19': {disabled: true, disableTouchEvent: true}
				}}
				
				
			/>
			</View>
		</View>
		



	);
	


}