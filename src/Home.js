import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function App() {
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [lastCurrencyInfo, setLastCurrencyInfo] = useState({});
    const [lastReqDate, setLastReqDate] = useState("");
    const [convertedToUsd, setConvertedToUsd] = useState(0);
    const [buttonCurrency, setButtonCurrency] = useState('');

    const allCurrencies = [
        "USD", "EUR", "GBP", "JPY", "TRY", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "FJD", "FKP", "FOK", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"
    ];

    useEffect(() => {
        checkAndRetrieveCurrencyInfo();
    }, []);

    const checkAndRetrieveCurrencyInfo = async () => {
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        try {
            const value = await AsyncStorage.getItem('lastCurrencyInfos');
            if (value !== null) {
                const storedData = JSON.parse(value);
                if (storedData.date === today && storedData.base_code === 'USD') {
                    setLastCurrencyInfo(storedData);
                    return;
                }
            }
            _retrieveBaseCurrency(today);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    const _retrieveBaseCurrency = async (today) => {
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/42603fd91d2546c8f024d8ae/latest/USD`);
            setLastReqDate(today);
            setBaseCurrency(response.data.base_code);

            const extendedResponse = {
                ...response.data,
                date: today
            };

            await AsyncStorage.setItem('lastCurrencyInfos', JSON.stringify(extendedResponse));
            setLastCurrencyInfo(extendedResponse);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    const convertToUsd = async () => {
        if (amount !== '') {
            const value = await AsyncStorage.getItem('lastCurrencyInfos');
            const lastCurrencyInfo = JSON.parse(value);
            const rateToUsd = lastCurrencyInfo.conversion_rates[baseCurrency];
            const amountInUsd = amount / rateToUsd;
            setConvertedToUsd(amountInUsd);
            convertCurrency(amountInUsd);
        }
    };

    const convertCurrency = async (amountInUsd) => {
        try {
            const rateToTarget = lastCurrencyInfo.conversion_rates[targetCurrency];
            const convertedAmount = (amountInUsd * rateToTarget).toFixed(2);
            setConvertedAmount(convertedAmount);
            setButtonCurrency(targetCurrency);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    const handleConvertPress = () => {
        Keyboard.dismiss();
        convertToUsd();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>By Eren Kamer</Text>
            <View style={styles.pickerContainer}>
                <View style={styles.pickerWrapper}>
                    <Text style={styles.label}>{baseCurrency}</Text>
                    <Picker
                        selectedValue={baseCurrency}
                        onValueChange={(itemValue) => setBaseCurrency(itemValue)}
                        style={styles.picker}
                    >
                        {allCurrencies.map((currency, index) => (
                            <Picker.Item label={currency} value={currency} key={index} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.pickerWrapper}>
                    <Text style={styles.label}>{targetCurrency}</Text>
                    <Picker
                        selectedValue={targetCurrency}
                        onValueChange={(itemValue) => setTargetCurrency(itemValue)}
                        style={styles.picker}
                    >
                        {allCurrencies.map((currency, index) => (
                            <Picker.Item label={currency} value={currency} key={index} />
                        ))}
                    </Picker>
                </View>
            </View>
            <TextInput
                placeholder="Enter amount"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => setAmount(text)}
                value={amount}
            />
            <View style={styles.button}>
            <TouchableOpacity style={styles.button} onPress={handleConvertPress}>
            <Text style={styles.buttonText}>Convert</Text>
</TouchableOpacity>
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Converted Amount: {convertedAmount} {buttonCurrency}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', 
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#007BFF', 
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    pickerWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    picker: {
        width: '100%',
        height: 50,
    },
    label: {
        fontSize: 23,
        marginBottom: 10,
        color: '#1E90FF', 
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#6C757D', 
        borderWidth: 1,
        marginTop: 170,
        paddingHorizontal: 8,
        fontSize: 16,
        backgroundColor: '#ffffff', 
        borderRadius: 10,
        color: '#333333', 
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#007BFF',
    },
    buttonText: {
        color: '#ffffff', 
        fontSize: 16,
        fontWeight: 'bold',
        bottom: 10,
        left: 18,
        width: 100,
        height: 20,
    },
    resultContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333', 
    },
});

