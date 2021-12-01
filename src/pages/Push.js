/*import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
    View,
    Text,
    Alert,

} from 'react-native';
import {Block, theme, Button} from 'galio-framework';

const Stack = createStackNavigator();

async function saveTokenToDatabase(token) {
    // Assume user is already signed in
    console.log(token);
    /!* const userId = auth().currentUser.uid;

     // Add the token to the users datastore
     await firestore()
         .collection('users')
         .doc(userId)
         .update({
             tokens: firestore.FieldValue.arrayUnion(token),
         });*!/
}*/
/*

export default function Push() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState('Home');


    useEffect(() => {
        // Assume a message-notification contains a "type" property in the data payload of the screen to open
        messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });

        messaging().requestPermission().then(permission => {
               // alert(permission);
            },
        );

        messaging().hasPermission().then(enabled => {
            //alert(enabled);
        });


        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            //navigation.navigate(remoteMessage.data.type);
            alert('alper');
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                    alert('alper');

                }
                setLoading(false);
            });


        messaging()
            .getToken()
            .then(token => {
                return saveTokenToDatabase(token);
            });

        // Listen to whether the token changes
        return messaging().onTokenRefresh(token => {
            saveTokenToDatabase(token);
        });
    }, []);


    if (loading) {
        return null;
    }

    return (
        <View style={{flex: 1}}>
            <Text>Welcome to React Native!</Text>
        </View>
    );
}

*/

/*
import React, {Component} from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import firebase from 'react-native-firebase';
*/
/*
export default class Push extends Component {

    async componentDidMount() {
        this.checkPermission();
    }

    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>Welcome to React Native!</Text>
            </View>
        );
    }
}
*/
