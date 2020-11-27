import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { globalStyles, globalColors } from '../styles/global';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Card(props) {
	return (
		<View style={styles.card}>
			<View style={styles.content}>
				{ props.children }
			</View>
		</View>
	);
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
});