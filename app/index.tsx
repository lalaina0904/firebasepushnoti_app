import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';

export default function Index() {
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

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text>Edit app/index.tsx to edit this screen test.</Text>
        </View>
    );
}
