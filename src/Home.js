import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import SecondPage from './SecondPage';
import axios from 'axios';

export default function App({navigation}) {

    const [baseCurrency, setBaseCurrency] = useState('')
    const [targetCurrency, setTargetCurrency] = useState('')

    useEffect(() => {
        _retrieveBaseCurrency();
    }, []);

    const _retrieveBaseCurrency = async () => {
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/42603fd91d2546c8f024d8ae/latest/${baseCurrency}`);
            console.log(response.data)
            console.log(`base currency ==>>>`, response.data.base_code)
            setBaseCurrency(response.data.base_code)
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };


    const gotoSecondPage = () => {
        navigation.navigate('SecondPage', {baseCurrency});
    }

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Picker
                selectedValue={baseCurrency}
                onValueChange={(itemValue, itemIndex) => setBaseCurrency(itemValue)}
            >
                <Picker.Item label="DOLLAR $" value="DOLLAR $" />
            </Picker>
            <Picker
                selectedValue={targetCurrency}
                onValueChange={(itemValue, itemIndex) => setTargetCurrency(itemValue)}
            >
                <Picker.Item label="DOLLAR $" value="DOLLAR $" />
            </Picker>
            <Button
                onPress={gotoSecondPage}
                title="Go to Second Page"
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
