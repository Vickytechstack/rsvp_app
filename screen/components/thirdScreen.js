import React from "react";
import Localities from "../graphs/Localities";
import GuestCount from "../graphs/Guest_count";
import Students from "../graphs/Students";


import { View, StyleSheet } from 'react-native';


const ThirdScreen = () => {

    return (
        <View style={styles.Container}>
            <View style={styles.localities}>
                <Localities />
            </View>
            <View style={styles.guest}>
                <GuestCount />
            </View>
            <View style={styles.students}>
                <Students />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    localities: {
        flex: 2
    },
    guest: {
        flex: 2
    },
    students: {
        flex: 2
    }

});

export default ThirdScreen;