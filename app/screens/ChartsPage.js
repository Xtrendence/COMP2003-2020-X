import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles } from '../styles/global';
import Icon from 'react-native-vector-icons/Entypo';
import { TopBar } from '../components/TopBar';
import Card from '../components/Card';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const ChartsPage = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<TopBar navigation={navigation}>Charts</TopBar>
			<View>
				<View style={styles.banner}>
					<Text style={styles.bannerText}>Number Of Falls</Text>
				</View>
				<View style={styles.chartWrapper}>
					<LineChart
						data={{
							labels: ["11/01", "11/02", "11/03", "11/04", "11/05", "11/06", "11/07"],
							datasets: [
								{
									data: [2, 3, 1, 5, 8, 4, 2]
								}
							]
						}}
						width={screenWidth - 40 - 40}
						height={250}
						segments={4}
						withHorizontalLines={true}
						withVerticalLines={false}
						chartConfig={{
							backgroundColor: globalColors.mainFirst,
							backgroundGradientFrom: globalColors.mainFirst,
							backgroundGradientTo: globalColors.mainFirst,
							decimalPlaces: 0,
							color: () => "rgba(95,103,129,0.8)",
							labelColor: () => "rgba(95,103,129,1)",
							style: {
								borderRadius: 10
							},
							propsForDots: {
								r: "4",
								strokeWidth: "2",
								stroke: globalColors.mainFifth
							},
							propsForVerticalLabels: {
								fontSize: 10,
								rotation: -45,
							},
							propsForBackgroundLines: {
								strokeWidth: 2,
								stroke: "rgba(95,103,129,0.4)"
							}
						}}
						bezier
						style={{
							backgroundColor: "rgba(255,255,255,0)",
							borderRadius: globalStyles.borderRadius,
						}}
					/>
				</View>
				<View style={styles.navigationWrapper}>
					<TouchableOpacity style={styles.actionButton}>
						<Icon name="chevron-left" color={globalColors.accentContrast} size={40}/>
					</TouchableOpacity>
					<Text style={styles.actionInfo}>2020/11/01 - 2020/11/07</Text>
					<TouchableOpacity style={styles.actionButton}>
						<Icon name="chevron-right" color={globalColors.accentContrast} size={40}/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: globalColors.mainSecond,
	},
	banner: {
		backgroundColor: globalColors.accentLight,
		borderRadius: globalStyles.borderRadius,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
		marginTop: 20,
	},
	bannerText: {
		textAlign: "center",
		fontSize: globalStyles.smallFont,
		color: globalColors.accentContrast,
		fontWeight: "bold",
		paddingTop: 10,
		paddingBottom: 10,
	},
	chartWrapper: {
		paddingRight: 40,
		paddingTop: 20,
		paddingBottom: 10,
		backgroundColor: globalColors.mainFirst,
		borderRadius: globalStyles.borderRadius,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
		marginTop: 20,
		marginBottom: 20,
	},
	navigationWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		flexWrap: "wrap",
	},
	actionButton: {
		backgroundColor: globalColors.accentLight,
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
	actionInfo: {
		backgroundColor: globalColors.accentLight,
		width:screenWidth - 40 - 40 - 40 - 40,
		marginLeft: 20,
		marginRight: 20,
		lineHeight: 40,
		textAlign: "center",
		color: globalColors.accentContrast,
		fontWeight: "bold",
		fontSize: globalStyles.smallFont,
		borderRadius: globalStyles.borderRadius,
		shadowColor: globalStyles.shadowColor,
		shadowOffset: globalStyles.shadowOffset,
		shadowOpacity: globalStyles.shadowOpacity,
		shadowRadius: globalStyles.shadowRadius,
		elevation: globalStyles.shadowElevation,
	},
	actionText: {
		fontSize: globalStyles.mediumFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
});