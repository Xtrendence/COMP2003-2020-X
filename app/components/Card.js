import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { globalStyles, globalColors, globalColorsDark } from '../styles/global';
import { ThemeContext } from '../utils/ThemeProvider';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class Card extends Component {
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
		return (
			<View style={[styles.card, styles[`card${this.state.theme}`]]}>
				<View style={styles.content}>
					{ this.props.children }
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		width: screenWidth - 40,
		padding: 10,
		borderRadius: globalStyles.borderRadius,
		backgroundColor: globalColors.mainFirst,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
		marginTop: 20,
	},
	cardDark: {
		backgroundColor: globalColorsDark.mainFirst
	}
});