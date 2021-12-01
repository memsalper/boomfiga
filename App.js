import React from 'react';

import {
    Alert
} from 'react-native';

import Main from './src/Main';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import messaging from '@react-native-firebase/messaging'; //App.js'e messaging'i import ediyoruz.
//import { NotifierWrapper } from 'react-native-notifier';


import reducer from './reducer';

//http://api.themoviedb.org/3/search/movie?api_key=d6dfda7af1f3d311993806acc155757d&query=breaking%20bad
//https://api.github.com
const client = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    responseType: 'json',
});


const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));


export default class App extends React.Component {
    componentDidMount = async () => {

        await messaging().registerDeviceForRemoteMessages();
        await messaging().requestPermission();
        console.log(await messaging().getToken());
        messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.title));
            console.log(remoteMessage.notification.title);
        });
    };

    render() {
        return (
            <Provider store={store}>
                    <Main/>
            </Provider>
        );
    }
};

