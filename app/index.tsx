import { Text, View, TextInput, Button, Keyboard } from 'react-native';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import { useState } from 'react';

export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    const getToken = async () => {
        const token = await messaging().getToken();
        console.log('there is the token:', token);
    };

    useEffect(() => {
        requestUserPermission();
        getToken();
    }, []);

    const handleLogin = () => {
        Keyboard.dismiss();
        if (email === 'panda@gmail.com' && password === 'test') {
            setIsLoggedIn(true); // Cache les champs et affiche le message
        }
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
            }}>
            {!isLoggedIn ? (
                <>
                    <TextInput
                        testID="emailInput"
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{
                            width: '80%',
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            marginBottom: 12,
                            paddingHorizontal: 10,
                        }}
                    />
                    <TextInput
                        testID="passwordInput"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={{
                            width: '80%',
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            marginBottom: 12,
                            paddingHorizontal: 10,
                        }}
                    />
                    <Button
                        testID="signInButton"
                        title="Sign In"
                        onPress={handleLogin}
                    />
                </>
            ) : (
                <Text
                    testID="messageText"
                    style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Salut petit Panda!
                </Text>
            )}
        </View>
    );
}
