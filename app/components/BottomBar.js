import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import Notifier from '../utils/Notifier';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { globalColors, globalStyles } from '../styles/global';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FallsPage } from '../screens/FallsPage';
import { ChartsPage } from '../screens/ChartsPage';
import { QuestionsPage } from '../screens/QuestionsPage';
import { CalendarPage } from '../screens/CalendarPage';
import { HelpPage } from '../screens/HelpPage';

// The BottomBar NavigationContainer contains 5 screens: Falls, Charts, Questions, Calendar, and Help. Its parent is the StackNavigator.
let BottomTab = createMaterialBottomTabNavigator();

export default class BottomBar extends Component {
	render() {
		let notifier = new Notifier(
			onRegister.bind(this),
			onNotification.bind(this)
		);

		return (
			<NavigationContainer independent={true}>
				<BottomTab.Navigator 
					initialRouteName="Questions" 
					activeColor={globalColors.accentContrast}
					labeled={true}
					shifting={false}
					barStyle={styles.bar}
				>
					<BottomTab.Screen 
						name="Falls" 
						component={FallsPage}
						options={{
							tabBarLabel: "Falls",
							tabBarIcon: () => {
								return <Icon name="warning" color={globalColors.accentContrast} size={globalStyles.bottomBarIconSize} />
							},
						}}
					/>
					<BottomTab.Screen 
						name="Charts" 
						component={ChartsPage}
						options={{
							tabBarLabel: "Charts",
							tabBarIcon: ({ color }) => {
								return <Icon name="bar-graph" color={globalColors.accentContrast} size={globalStyles.bottomBarIconSize} />
							},
						}}
					/>
					<BottomTab.Screen 
						name="Questions" 
						component={QuestionsPage}
						options={{
							tabBarLabel: "Questions",
							tabBarIcon: ({ color }) => {
								return <Icon name="pencil" color={globalColors.accentContrast} size={globalStyles.bottomBarIconSize} />
							},
						}}
					/>
					<BottomTab.Screen 
						name="Calendar" 
						component={CalendarPage}
						options={{
							tabBarLabel: "Calendar",
							tabBarIcon: ({ color }) => {
								return <Icon name="calendar" color={globalColors.accentContrast} size={globalStyles.bottomBarIconSize} />
							},
						}}
					/>
					<BottomTab.Screen 
						name="Help" 
						component={HelpPage}
						options={{
							tabBarLabel: "Help",
							tabBarIcon: ({ color }) => {
								return <Icon name="help" color={globalColors.accentContrast} size={globalStyles.bottomBarIconSize} />
							},
						}}
					/>
				</BottomTab.Navigator>
				<StatusBar translucent={false} backgroundColor={globalColors.accentMedium} style="light"></StatusBar>
			</NavigationContainer>
		);

		function onRegister(token) {
			let fcm = token.token;
		}

		function onNotification(notification) {
			notifier.localNotification(notification.title, notification.message);
		}
	}
}

const styles = StyleSheet.create({
	bar: {
		backgroundColor: globalColors.accentLight
	},
});