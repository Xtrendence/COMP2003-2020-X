import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalColors, globalStyles } from '../styles/global';
import { TopBar } from '../components/TopBar';
import { SettingsPopup} from '../components/SettingsPopup';

export const FallsPage = ({ navigation }) => {

	const [settings, setSettings] = React.useState(false);

	return (
		<View>
			<TopBar navigation={navigation} state={settings} setState={setSettings}>Recording Falls</TopBar>
			{ settings &&
                    <SettingsPopup></SettingsPopup>
            }
		</View>
	);
}