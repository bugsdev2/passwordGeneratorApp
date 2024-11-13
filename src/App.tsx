import { StyleSheet, Text, View, StatusBar, useColorScheme, TextInput, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import CheckBox from 'react-native-bouncy-checkbox';

import { Colors } from '../constants/Colors';

const App = () => {
    const upperCaseChars = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    const lowerCaseChars = 'qwertyuiopasdfghjklzxcvbnm';
    const numberChars = '1234567890';
    const symbolChars = '!@#$%^&*()';

    const [darkMode, setDarkMode] = useState(useColorScheme() === 'dark');

    const regex = {
        lowercase: /[a-z]/g,
        upperCase: /[A-Z]/g,
        number: /\d/g,
        symbols: /[!@#$%^&*()]/g,
    };

    const [length, setLength] = useState('');

    const [upperCase, setUpperCase] = useState(true);
    const [lowerCase, setLowerCase] = useState(true);
    const [num, setNum] = useState(true);
    const [symbols, setSymbols] = useState(false);

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const textColor = {
        color: darkMode ? Colors.darkMode.text : Colors.lightMode.text,
    };
    const backgroundColor = {
        backgroundColor: darkMode ? Colors.darkMode.background : Colors.lightMode.background,
    };

    function getPasswordString(length: string) {
        if (+length < 4 || +length > 20) {
            setError('Password length should be between 4 and 20');
            return;
        }
        let passwordString = '';
        lowerCase && (passwordString += lowerCaseChars);
        upperCase && (passwordString += upperCaseChars);
        num && (passwordString += numberChars);
        symbols && (passwordString += symbolChars);
        setError('');
        getPassword(passwordString, length);
    }

    function generateRandom(finalPassword: string, passwordString: string) {
        finalPassword = '';
        for (let i = 0; i < Number(length); i++) {
            finalPassword += passwordString[Math.floor(Math.random() * passwordString.length)];
        }
        return finalPassword;
    }

    function getPassword(passwordString: string, length: string) {
        let finalPassword = '';
        while ((lowerCase && !regex.lowercase.test(finalPassword)) || (upperCase && !regex.upperCase.test(finalPassword)) || (num && !regex.number.test(finalPassword)) || (symbols && !regex.symbols.test(finalPassword))) {
            finalPassword = generateRandom(finalPassword, passwordString);
        }
        setPassword(finalPassword);
    }

    function resetForms() {
        setLength('');
        setLowerCase(true);
        setUpperCase(true);
        setNum(true);
        setSymbols(false);
        setPassword('');
        setError('');
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.container, backgroundColor]}
        >
            <StatusBar
                backgroundColor={darkMode ? Colors.darkMode.background : Colors.lightMode.background}
                barStyle={darkMode ? 'light-content' : 'dark-content'}
            />

            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={[textColor, styles.title]}>
                        Secure <Text style={[{ color: Colors.darkMode.accent }]}>PassGen</Text>
                    </Text>
                    <Pressable
                        style={[styles.darkModeImageContainer]}
                        onPress={() => setDarkMode(!darkMode)}
                    >
                        <Image
                            source={require('./assets/images/toggle.png')}
                            style={styles.darkModeImage}
                        />
                    </Pressable>
                </View>
                <Text style={[textColor, styles.subtitle]}>A Simple Secure Password Generator</Text>
            </View>
            <View style={[styles.bodyContainer, { borderColor: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }]}>
                <View style={[styles.lengthContainer]}>
                    <Text style={[textColor, styles.lengthText]}>Password Length: </Text>
                    <TextInput
                        value={length.toString()}
                        placeholder="Eg. 10"
                        placeholderTextColor={darkMode ? Colors.darkMode.text : Colors.lightMode.text}
                        style={[styles.textInput, textColor, { borderColor: Colors.darkMode.accent, fontSize: 17 }]}
                        inputMode="numeric"
                        keyboardType="numeric"
                        onChangeText={(value) => setLength(value)}
                    />
                </View>
                <View style={[styles.checkBoxContainer]}>
                    <Text style={[textColor, styles.lengthText]}>Use UpperCase Characters </Text>
                    <View>
                        <CheckBox
                            fillColor={Colors.darkMode.accent}
                            isChecked={upperCase}
                            onPress={() => {
                                setUpperCase(!upperCase);
                            }}
                        />
                    </View>
                </View>
                <View style={[styles.checkBoxContainer]}>
                    <Text style={[textColor, styles.lengthText]}>Use LowerCase Characters </Text>
                    <View>
                        <CheckBox
                            fillColor={Colors.darkMode.accent}
                            isChecked={lowerCase}
                            onPress={() => {
                                setLowerCase(!lowerCase);
                            }}
                        />
                    </View>
                </View>
                <View style={[styles.checkBoxContainer]}>
                    <Text style={[textColor, styles.lengthText]}>Use Numbers </Text>
                    <View>
                        <CheckBox
                            fillColor={Colors.darkMode.accent}
                            isChecked={num}
                            onPress={() => {
                                setNum(!num);
                            }}
                        />
                    </View>
                </View>
                <View style={[styles.checkBoxContainer]}>
                    <Text style={[textColor, styles.lengthText]}>Use Symbols </Text>
                    <View>
                        <CheckBox
                            fillColor={Colors.darkMode.accent}
                            isChecked={symbols}
                            onPress={() => {
                                setSymbols(!symbols);
                            }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', marginTop: 10 }}>
                    <View>
                        <TouchableOpacity
                            style={[styles.btn]}
                            onPress={() => resetForms()}
                        >
                            <Text style={{ color: 'white' }}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[styles.btn]}
                            onPress={() => getPasswordString(length)}
                        >
                            <Text style={{ color: 'white' }}>Generate</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {password && !error && (
                <View>
                    <View style={[styles.pwdContainer, { borderColor: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }]}>
                        <Text style={[textColor, { opacity: 0.5 }]}>Long Press to Copy</Text>
                        <Text
                            selectable
                            style={[textColor, styles.pwdText, styles.font]}
                        >
                            {password}
                        </Text>
                    </View>
                </View>
            )}
            {error && (
                <View>
                    <Text style={{ color: 'red', fontSize: 20, textAlign: 'center' }}>{error}</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    darkModeImageContainer: {
        position: 'absolute',
        right: 15,
        top: 4,
    },

    font: {
        fontFamily: 'PoppinsRegular',
    },

    darkModeImage: {
        width: 25,
        height: 25,
    },

    header: {
        padding: 5,
    },

    bodyContainer: {
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 20,
        margin: 5,
        justifyContent: 'center',
    },

    title: {
        fontSize: 25,
        textAlign: 'center',
        // fontWeight: 'bold',
        fontFamily: 'RussoOne',
    },

    subtitle: {
        fontSize: 15,
        textAlign: 'center',
    },

    textInput: {
        borderWidth: 1,
        borderRadius: 20,
        width: 100,
        paddingHorizontal: 20,
    },

    lengthText: {
        fontSize: 17,
    },

    lengthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
    },

    checkBoxContainer: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: Colors.darkMode.accent,
    },

    generateBtn: {},

    resetBtn: {},

    pwdContainer: {
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        margin: 25,
    },

    pwdText: {
        fontSize: 35,
    },
});
