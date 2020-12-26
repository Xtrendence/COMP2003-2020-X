import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { globalColors, globalStyles } from '../styles/global';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export function TopBar(props) {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.cogView}>
                <Icon name="cog" color={globalColors.accentContrast} size={globalStyles.topBarIconSize}  />
            </TouchableOpacity>
            <View style={styles.textView}>
                <Text style={styles.headerText}>{ props.children }</Text>
            </View>
            <TouchableOpacity style={styles.logoutView} onPress={() => logout()}>
                <Icon name="log-out" color={globalColors.accentContrast} size={globalStyles.topBarIconSize}  />
            </TouchableOpacity>
        </View>
    );

    function logout() {
        props.navigation.dangerouslyGetParent().navigate("LoginPage");
    }
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 50,
        backgroundColor: globalColors.accentLight,       
    },
    headerText: {
        fontWeight: "bold",
        fontSize: globalStyles.bigFont,
        color: globalColors.accentContrast,
        letterSpacing: 1,
    },
    cogView: {
        width: 50,
        height: 50,
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    },
    logoutView: {
        width:  50,
        height: 50,
        top: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    },
    textView: {
        width: screenWidth - 50 - 50,
        height: 50,
        top: 0,
        left: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    }
});