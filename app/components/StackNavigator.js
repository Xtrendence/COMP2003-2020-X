import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from '../screens/LoginPage';
import BottomBar from '../components/BottomBar';
import { ThemeContext } from '../utils/ThemeProvider';

// The StackNavigator's NavigationContainer contains 2 screens: LoginPage and BottomBar. The BottomBar is another NavigationContainer that contains the app's 5 main screens.
let Stack = createStackNavigator();

export class StackNavigator extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);
		this.state = {};
		this.toggleTheme;
	}

	componentDidMount() {
		const { theme, toggleTheme } = this.context;
		
		this.setState({theme:theme});
		this.toggleTheme = toggleTheme;
	}

	render() {
		// The BottomBar NavigationContainer is nested within the StackNavigator, which allows the LoginPage to redirect the user to the rest of the pages.
		return (
			<NavigationContainer independent={true}>
				<Stack.Navigator initialRouteName="LoginPage">
					<Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown:false}}/>
					<Stack.Screen name="BottomBar" component={BottomBar} options={{headerShown:false}}/>
				</Stack.Navigator>
				<StatusBar translucent={true} style={(this.state.theme === "Dark") ? "dark" : "light"}></StatusBar>
				<FlashMessage position="top" />
			</NavigationContainer>
		);
	}
}