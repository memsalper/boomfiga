import * as React from 'react';
import {Button, View, Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//import Push from "./pages/Push";
//import {Push2} from "./pages/Push2";

import {Home} from './pages/Home';
import {Audience} from './pages/Audience';
import {Begenenler} from './pages/Begenenler';
import Add from './pages/Add';
import AddProcess from './pages/AddProcess';
import {DeleteProcess} from './pages/DeleteProcess';
import Detay from './pages/Detay';

import {Login} from './pages/Login';
import {Register} from './pages/Register';

import {ProfilDiger} from './pages/ProfilDiger';
import {Search} from './pages/Search';
import Users from './pages/Users';
import {Bildirimler} from './pages/Bildirimler';
import {Top} from './pages/Top';
import {Films} from './pages/Films';
import {Books} from './pages/Books';
import {Profil} from './pages/Profil';
import {ProfileSettings} from './pages/ProfileSettings';


import CustomHeader from './header/CustomHeader';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';


import {IMAGE} from './constants/image';
import {theme} from 'galio-framework';

/*function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}*/
const navigationOptionHandler = () => ({
    headerShown: false,
});



function DetaySearch(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={navigationOptionHandler}
                          name="Search"
                          component={Search}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Detay"
                          component={Detay}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Bildirimler"
                          component={Bildirimler}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Users"
                          component={Users}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="ProfilDiger"
                          component={ProfilDiger}
            />
        </Stack.Navigator>
    );
}

function DetayEkle(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={navigationOptionHandler}
                          name="Ekle"
                          component={Add}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="AddProcess"
                          component={AddProcess}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Profil"
                          component={Profil}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Detay"
                          component={Detay}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Bildirimler"
                          component={Bildirimler}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Users"
                          component={Users}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Search"
                          component={Search}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="ProfilDiger"
                          component={ProfilDiger}
            />
        </Stack.Navigator>
    );
}


function DetayKitaplar(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={navigationOptionHandler}
                          name="Home"
                          component={Books}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Detay"
                          component={Detay}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Bildirimler"
                          component={Bildirimler}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Users"
                          component={Users}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Search"
                          component={Search}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="ProfilDiger"
                          component={ProfilDiger}
            />
        </Stack.Navigator>
    );
}

function DetayProfil(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={navigationOptionHandler}
                          name="Profil"
                          component={Profil}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Detay"
                          component={Detay}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="DeleteProcess"
                          component={DeleteProcess}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Bildirimler"
                          component={Bildirimler}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Users"
                          component={Users}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Search"
                          component={Search}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="ProfilDiger"
                          component={ProfilDiger}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="ProfileSettings"
                          component={ProfileSettings}
            />
        </Stack.Navigator>
    );
}

function DetayAnasayfa(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={navigationOptionHandler}
                          name="Home"
                          component={Home}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Audience"
                          component={Audience}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Begenenler"
                          component={Begenenler}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Detay"
                          component={Detay}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Bildirimler"
                          component={Bildirimler}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Users"
                          component={Users}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Search"
                          component={Search}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="ProfilDiger"
                          component={ProfilDiger}
            />
        </Stack.Navigator>
    );
}

function DetayTop(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen options={navigationOptionHandler}
                          name="Top"
                          component={Top}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Detay"
                          component={Detay}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Bildirimler"
                          component={Bildirimler}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Search"
                          component={Search}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="ProfilDiger"
                          component={ProfilDiger}
            />
        </Stack.Navigator>
    );
}


function Giris(props) {
    return (
        <Tab.Navigator



            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let colorName;
                    if (route.name === 'Anasayfa') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Profil') {
                        iconName = focused
                            ? 'person'
                            : 'person-outline';
                        return <Icon name={iconName} size={25} color='rgba(255,255,255,0.9)'/>;
                    } else if (route.name === 'Ekle') {
                        iconName = focused
                            ? 'add-circle'
                            : 'add-circle-outline';
                        return <Icon name={iconName} size={25} color='rgba(255,255,255,0.9)'/>;
                    } else if (route.name === 'Kullanıcı Ara') {
                        iconName = focused
                            ? 'account-search'
                            : 'account-search-outline';

                    } else if (route.name === 'Top') {
                        colorName = focused
                            ? 'tomato'
                            : 'rgba(255,255,255,0.9)';
                        return <Iconm name={'format-list-numbered'} size={25} color={colorName}/>;
                    }
                    return <Iconm name={iconName} size={25} color='rgba(255,255,255,0.9)'/>;
                },


            })}

            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'black',
                keyboardHidesTabBar: true,
                showLabel: false,
                style: {
                    position: 'absolute',
                    backgroundColor: "#182227",//"#101b1f",//"#0e1014",// 'rgb(0,0,0)',//theme.COLORS.BLACK, // "rgb(24,34,77)", // 'rgba(255,255,255,0.9)',
                    borderTopWidth: 0,
                    height:40,
                },
            }}



       >
            <Tab.Screen name="Anasayfa" component={DetayAnasayfa} />
            <Tab.Screen name="Kullanıcı Ara" component={DetaySearch}/>
            <Tab.Screen name="Ekle" component={DetayEkle}/>
            <Tab.Screen name="Profil" component={DetayProfil}/>
            <Tab.Screen name="Top" component={DetayTop}/>
        </Tab.Navigator>

    );
}

function DetayLogin(props) {
    return (
        <Stack.Navigator initialRouteName={"Login"}>
            <Stack.Screen options={navigationOptionHandler}
                          name="Login"
                          component={Login}
            />
            <Stack.Screen options={navigationOptionHandler}
                          name="Register"
                          component={Register}
            />
        </Stack.Navigator>
    );

}

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={navigationOptionHandler}
                              name="DetayLogin"
                              component={DetayLogin}
                />
                <Stack.Screen options={navigationOptionHandler}
                              name="Giris"
                              component={Giris}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
