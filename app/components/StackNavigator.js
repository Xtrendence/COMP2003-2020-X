import React, { Component } from 'react';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from '../screens/LoginPage';
import BottomBar from '../components/BottomBar';

let Stack = createStackNavigator();

export class StackNavigator extends Component {
	render() {
		// The BottomBar NavigationContainer is nested within the StackNavigator, which allows the LoginPage to redirect the user to the rest of the pages.
		return (
			<NavigationContainer independent={true}>
				<Stack.Navigator initialRouteName="LoginPage">
					<Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown:false}}/>
					<Stack.Screen name="BottomBar" component={BottomBar} options={{headerShown:false}}/>
				</Stack.Navigator>
				<FlashMessage position="top" />
			</NavigationContainer>
		);
	}
}