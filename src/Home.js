import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import SecondPage from './SecondPage';
import axios from 'axios';

export default function App({navigation}) {

    const [baseCurrency, setBaseCurrency] = useState('USD')
    const [targetCurrency, setTargetCurrency] = useState('EUR')
    const [amount, setAmount] = useState(0)
    const [convertedAmount, setConvertedAmount] = useState(0)
    const [lastCurrencyInfo , setLastCurrencyInfo] = useState({})
    const [lastReqDate, setLastReqDate] = useState("")
    


   
  /*   useEffect(() => {
        _retrieveBaseCurrency();
    }, []); */

    const allCurrencies = [
        "USD",
        "EUR",
        "GBP",
        "JPY",
        "TRY",
        "AED",
        "AFN",
        "ALL",
        "AMD",
        "ANG",
        "AOA",
        "ARS",
        "AUD",
        "AWG",
        "AZN",
        "BAM",
        "BBD",
        "BDT",
        "BGN",
        "BHD",
        "BIF",
        "BMD",
        "BND",
        "BOB",
        "BRL",
        "BSD",
        "BTN",
        "BWP",
        "BYN",
        "BZD",
        "CAD",
        "CDF",
        "CHF",
        "CLP",
        "CNY",
        "COP",
        "CRC",
        "CUP",
        "CVE",
        "CZK",
        "DJF",
        "DKK",
        "DOP",
        "DZD",
        "EGP",
        "ERN",
        "ETB",
        "FJD",
        "FKP",
        "FOK",
        "GEL",
        "GGP",
        "GHS",
        "GIP",
        "GMD",
        "GNF",
        "GTQ",
        "GYD",
        "HKD",
        "HNL",
        "HRK",
        "HTG",
        "HUF",
        "IDR",
        "ILS",
        "IMP",
        "INR",
        "IQD",
        "IRR",
        "ISK",
        "JEP",
        "JMD",
        "JOD",
        "KES",
        "KGS",
        "KHR",
        "KID",
        "KMF",
        "KRW",
        "KWD",
        "KYD",
        "KZT",
        "LAK",
        "LBP",
        "LKR",
        "LRD",
        "LSL",
        "LYD",
        "MAD",
        "MDL",
        "MGA",
        "MKD",
        "MMK",
        "MNT",
        "MOP",
        "MRU",
        "MUR",
        "MVR",
        "MWK",
        "MXN",
        "MYR",
        "MZN",
        "NAD",
        "NGN",
        "NIO",
        "NOK",
        "NPR",
        "NZD",
        "OMR",
        "PAB",
        "PEN",
        "PGK",
        "PHP",
        "PKR",
        "PLN",
        "PYG",
        "QAR",
        "RON",
        "RSD",
        "RUB",
        "RWF",
        "SAR",
        "SBD",
        "SCR",
        "SDG",
        "SEK",
        "SGD",
        "SHP",
        "SLE",
        "SLL",
        "SOS",
        "SRD",
        "SSP",
        "STN",
        "SYP",
        "SZL",
        "THB",
        "TJS",
        "TMT",
        "TND",
        "TOP",
        "TTD",
        "TVD",
        "TWD",
        "TZS",
        "UAH",
        "UGX",
        "UYU",
        "UZS",
        "VES",
        "VND",
        "VUV",
        "WST",
        "XAF",
        "XCD",
        "XDR",
        "XOF",
        "XPF",
        "YER",
        "ZAR",
        "ZMW",
        "ZWL"
    ]

    const _retrieveBaseCurrency = async () => {
       
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/42603fd91d2546c8f024d8ae/latest/${baseCurrency}`);
            console.log(response.data)
            console.log(`base currency ==>>>`, response.data.base_code)
            setLastReqDate(new Date())
            console.log(new Date())
            console.log(`lastReqDate ==>>>`, lastReqDate)
            setBaseCurrency(response.data.base_code)
            
            
            await AsyncStorage.setItem('lastCurrencyInfos', JSON.stringify(response.data)); 
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    const getCurrenciesFromStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('lastCurrencyInfos');
            if (value !== null) {
                setLastCurrencyInfo(JSON.parse(value));
                console.log(`lastCurrencyInfos ==>>>`, JSON.parse(value))
            } else {
                setLastCurrencyInfo([]);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    useEffect(() => {
        getCurrenciesFromStorage();
        console.log(`LastCurrencyInfo from STORAGE ==>>>`, lastCurrencyInfo)
    }, []);

   /*  const listCurrencies = () => {
        return allCurrencies.map((currency, index) => {
            return (
            <Picker   selectedValue={currency} key={index}
            onValueChange={ (itemValue, itemIndex) => setBaseCurrency(itemValue)}>
            <Picker.Item label={currency} value={currency} />
            </Picker>
            )    
        })  
    } */

  

        /*  const convertCurrency = async () => {
            try {
                const response = await axios.get(`https://v6.exchangerate-api.com/v6/42603fd91d2546c8f024d8ae/latest/${baseCurrency}`);
                setAllCurrencies(response.data.conversion_rates)
                console.log(`allCurrencies ==>>>`, allCurrencies)
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }; */

        return (
            <View >
                <Text>Home</Text>
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWrapper}>
                        <Text>Base Currency: {baseCurrency}</Text>
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
                        <Text>Target Currency: {targetCurrency}</Text>
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
                <View >
                <TextInput placeholder="Enter amount"  style={styles.input} onChangeText={(text) => setAmount(text)} value={amount} />
                <Text style={styles.amount}>amount: {amount}</Text>
                {/* <Button title="Convert" onPress={convertCurrency} /> */}
                {/* <Text>Result: {result}</Text> */}
                </View>
            </View>
        );
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
        },
        pickerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 20,
            padding: 30,
        },
        pickerWrapper: {
            flex: 1,
            alignItems: 'center',
        },
        picker: {
            width: '100%',
            height: 50,
        },
        input: {
            height: 40,
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
            top: 150,
            margin: "auto",
            fontSize: 16,
            backgroundColor: 'white',
            borderRadius: 10,
        },
        amount : {
            fontSize: 20,
            color: 'green',
            width: '80%',
            top: 200
        }
    });
