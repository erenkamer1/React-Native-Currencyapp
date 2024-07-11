import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function App({navigation, route}) {
    const [currency, setCurrency] = useState('EURO €')

    const gotoHome = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Text>SecondPage</Text>
            <Picker
                selectedValue={currency}
                onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
            >
                <Picker.Item label="DOLLAR $" value="DOLLAR $" />
                <Picker.Item label="EURO €" value="EURO €" />
                <Picker.Item label="YEN ¥" value="YEN ¥" />
            </Picker>
            <Button
                onPress={gotoHome}
                title="Go to Home"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})