import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { globalColors, globalStyles } from '../styles/global';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FallsPage } from '../screens/FallsPage';
import { ChartsPage } from '../screens/ChartsPage';
import { QuestionsPage } from '../screens/QuestionsPage';
import { CalendarPage } from '../screens/CalendarPage';
import { HelpPage } from '../screens/HelpPage';

const BottomTab = createMaterialBottomTabNavigator();

export function BottomBar() {
	return (
		<NavigationContainer>
			<BottomTab.Navigator 
				initialRouteName="Questions" 
				activeColor={globalColors.accentDark} 
				backgroundColor={"#000000"}
				tabBarOptions={{
					activeTintColor: globalColors.accentDark,
					showLabel: true,
					labelStyle: styles.label,
					labelPosition: "beside-icon"
				}}
			>
				<BottomTab.Screen 
					name="Falls" 
					component={FallsPage}
					options={{
						tabBarLabel: "Falls",
						tabBarIcon: () => {
							return <Icon name="warning" color={globalColors.accentContrast} size={26} />
						},
					}}
				/>
				<BottomTab.Screen 
					name="Charts" 
					component={ChartsPage}
					options={{
						tabBarLabel: "Charts",
						tabBarIcon: ({ color }) => {
							return <Icon name="bar-graph" color={globalColors.accentContrast} size={26} />
						},
					}}
				/>
				<BottomTab.Screen 
					name="Questions" 
					component={QuestionsPage}
					options={{
						tabBarLabel: "Questions",
						tabBarIcon: ({ color }) => {
							return <Icon name="pencil" color={globalColors.accentContrast} size={26} />
						},
					}}
				/>
				<BottomTab.Screen 
					name="Calendar" 
					component={CalendarPage}
					options={{
						tabBarLabel: "Calendar",
						tabBarIcon: ({ color }) => {
							return <Icon name="calendar" color={globalColors.accentContrast} size={26} />
						},
					}}
				/>
				<BottomTab.Screen 
					name="Help" 
					component={HelpPage}
					options={{
						tabBarLabel: "Help",
						tabBarIcon: ({ color }) => {
							return <Icon name="help" color={globalColors.accentContrast} size={26} />
						},
					}}
				/>
			</BottomTab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	navbar: {
		backgroundColor: globalColors.accentLight
	},
	label: {
		color: globalColors.accentContrast
	}
});