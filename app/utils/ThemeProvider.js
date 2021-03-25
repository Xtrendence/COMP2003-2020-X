import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, createContext, useEffect, useState } from 'react';
import { rgbToHex } from './Utils';
import { globalColors, globalColorsDark } from '../styles/global';

changeNavigationBarColor(rgbToHex(globalColors.mainThird), true);

export const ThemeContext = createContext();

export class ThemeProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: "Light"
		};
	}

	componentDidMount() {
		AsyncStorage.getItem("theme").then(result => {
			if(result === "Dark") {
				this.setState({theme:"Dark"});
				changeNavigationBarColor(rgbToHex(globalColorsDark.mainThird), false);
			} else {
				this.setState({theme:"Light"});
				changeNavigationBarColor(rgbToHex(globalColors.mainThird), true);
			}
		}).catch(error => {
			this.setState({theme:"Light"});
			changeNavigationBarColor(rgbToHex(globalColors.mainThird), true);
			AsyncStorage.setItem("theme", "Light");
			console.log(error);
		});
	}

	async toggleTheme() {
		if(this.state.theme === "Dark") {
			this.setState({theme:"Light"});
			changeNavigationBarColor(rgbToHex(globalColors.mainThird), true);
			await AsyncStorage.setItem("theme", "Light");
		} else {
			this.setState({theme:"Dark"});
			changeNavigationBarColor(rgbToHex(globalColorsDark.mainThird), false);
			await AsyncStorage.setItem("theme", "Dark");
		}
	}

	render() {
		return (
			<ThemeContext.Provider value={{theme:this.state.theme, toggleTheme:this.toggleTheme}}>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}