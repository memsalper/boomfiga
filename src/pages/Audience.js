import React, {Component, useState} from 'react';
import {DiziListesi} from '../components/DiziListesi';
import {FilmListesi} from '../components/FilmListesi';
import {CustomHeader2} from '../header/CustomHeader2';
import SearchBar from 'react-native-search-bar';
import {connect} from 'react-redux';
import {getMovie, getSeries} from '../../reducer';
import Icon from 'react-native-vector-icons/FontAwesome';


import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ImageBackground,
    Dimensions,
    FlatList,
    Switch,
    ActivityIndicator,

} from 'react-native';

import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {parseString} from 'react-native-xml2js';
import {KitapListesi} from '../components/KitapListesi';

import {Block, theme, Input, Button, Text} from 'galio-framework';

import {Images, argonTheme} from '../../constants';
import {HeaderHeight} from '../../constants/utils';


const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const {width: WIDTH} = Dimensions.get('window');

const profileMe = require('../images/pp.jpg');
const aytac = require('../images/aytc1048.jpg');


export class Audience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    id: 1,
                    username: 'mmsalper',
                    image: profileMe,
                    tur: 0,
                },
                {
                    id: 2,
                    username: 'aytc1048',
                    image: aytac,
                    tur: 1,
                },
                {
                    id: 1,
                    username: 'mmsalper',
                    image: profileMe,
                    tur: 0,
                },
                {
                    id: 2,
                    username: 'aytc1048',
                    image: aytac,
                    tur: 1,
                },
                {
                    id: 1,
                    username: 'mmsalper',
                    image: profileMe,
                    tur: 0,
                },
                {
                    id: 2,
                    username: 'aytc1048',
                    image: aytac,
                    tur: 1,
                },
                {
                    id: 2,
                    username: 'aytc1048',
                    image: aytac,
                    tur: 1,
                },
                {
                    id: 1,
                    username: 'mmsalper',
                    image: profileMe,
                    tur: 0,
                },
                {
                    id: 2,
                    username: 'aytc1048',
                    image: aytac,
                    tur: 1,
                },
            ],
            aranan: '',

        };
    }

    ara = async () => {


        const response = await axios.post('http://37.247.98.99:8085/Home/Login?EMail=aytugkonuralp@gmail.com&Password=1212');
        console.log(response);


    };

    componentDidMount = async () => {
        /* await messaging().registerDeviceForRemoteMessages();
         await messaging().requestPermission();
         console.log(await messaging().getToken())
         */
        const response = await axios.post('http://37.247.98.99:8085/Home/AddFriend?AddUserId=2&AddedUserId=4');
        console.log(response)
        //debugger;
    };

    renderSwitch(param) {
        switch (param) {
            case 0:
                return <Block row middle>
                    <Text color={'#fff'} size={12}>Arkadaşın</Text>
                    {/*<Button color={theme.COLORS.ERROR} style={{width: 50, height: 30}}
                            onPress={this.git} ><Text color={"#fff"} size={12} bold>Kaldır</Text></Button>*/}
                </Block>;
            case 1:
                return <Block col middle>
                    <Block middle row>
                        <Text color={'#fff'} size={12}>Takipçin</Text>
                        {/* <Button color={theme.COLORS.ERROR} style={{width: 50, height: 30, marginRight: 5}}
                                onPress={this.git}><Text color={"#fff"} size={12} bold>Kaldır</Text></Button>
                        <Button color={'#11CDEF'} style={{width: 50, height: 30}}
                                onPress={this.git}><Text color={"#fff"} size={12} bold>Ekle</Text></Button>*/}
                    </Block>
                </Block>;
            case 2:
                return <Block middle>
                    <Text bold>Takip Etiiğin</Text>
                    {/*<Button color={theme.COLORS.ERROR} style={{width: 50, height: 30}}
                            onPress={this.git}><Text color={"#fff"} size={12} bold>Kaldır</Text></Button>*/}
                </Block>;
            default:
                return <Block>
                    {/* <Button color={'#11CDEF'} style={{width: 50, height: 30}}
                            onPress={this.git}><Text color={"#fff"} size={12} bold>Ekle</Text></Button>*/}
                </Block>;
        }
    }


    render() {
        const {navigation} = this.props;
        const {title, tur, header} = this.props.route.params;
        const users = this.state.users;

        //console.log(users);
        return (

            <View style={styles.containerIn}>
                <ImageBackground
                    // source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeader2 title={header} navigation={navigation}/>
                    {/* <Button onPress={this.ara}> bas </Button>*/}
                    <Block middle style={{width: '100%', padding:12}}>
                        <Text color={'tomato'} size={20} bold>{title}</Text>
                    </Block>
                    <View style={{flex: 1, width: '100%', paddingLeft: 5, alignItems: 'center'}}>
                        <Block middle style={{width: '100%', backgroundColor: theme.COLORS.SIYAH, marginBottom:10}}>
                            <Text color={theme.COLORS.WHITE} bold>Arkadaşlar ve Takip Ettikleri (9)</Text>
                        </Block>
                        <ScrollView>
                            <Block style={{flexWrap: 'wrap', flex: 1}}>
                                {
                                    users.map((user, key) => (
                                        <Block style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            backgroundColor: '#101b1f',
                                            marginTop: 5,
                                            padding: 3,
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity
                                                style={{width: '65%', flexDirection: 'row', alignItems: 'center'}}
                                                onPress={() => navigation.navigate('ProfilDiger', {
                                                    userid: user.id,
                                                    tur: user.tur,
                                                    username: user.username,
                                                })}>
                                                <Block style={{marginRight: 5}}>
                                                    <Image
                                                        source={user.image}
                                                        style={styles.avatar}
                                                    />
                                                </Block>
                                                <Block>
                                                    <Text color={theme.COLORS.WHITE} bold>{user.username}</Text>
                                                </Block>
                                            </TouchableOpacity>
                                            <Block middle style={{width: '35%'}}>
                                                {
                                                    this.renderSwitch(user.tur)

                                                }
                                            </Block>
                                        </Block>

                                    ))
                                }
                            </Block>
                        </ScrollView>
                    </View>
                    <View style={{
                        flex: 1,
                        width: '100%',
                        marginTop: 10,
                        paddingLeft: 5,
                        paddingBottom: HeaderHeight * 1.2,
                        alignItems:"center",
                    }}>
                        <Block middle style={{width: '100%', backgroundColor: theme.COLORS.SIYAH, marginBottom:10}}>
                            <Text color={theme.COLORS.WHITE} bold>Diğer Kullanıcılar (30)</Text>
                        </Block>
                        <ScrollView style={{width: '100%'}}>
                            <Block style={{flexWrap: 'wrap', flex: 1}}>
                                {
                                    users.map((user, key) => (
                                        <Block style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            backgroundColor: '#101b1f',
                                            marginTop: 5,
                                            padding: 3,
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity
                                                style={{width: '65%', flexDirection: 'row', alignItems: 'center'}}
                                                onPress={() => navigation.navigate('ProfilDiger', {
                                                    userid: user.id,
                                                    tur: user.tur,
                                                    username: user.username,
                                                })}>
                                                <Block style={{marginRight: 5}}>
                                                    <Image
                                                        source={user.image}
                                                        style={styles.avatar}
                                                    />
                                                </Block>
                                                <Block>
                                                    <Text color={theme.COLORS.WHITE} bold>{user.username}</Text>
                                                </Block>
                                            </TouchableOpacity>
                                            <Block middle style={{width: '35%'}}>
                                                {
                                                    this.renderSwitch(user.tur)

                                                }
                                            </Block>
                                        </Block>

                                    ))
                                }
                            </Block>
                        </ScrollView>
                    </View>
                </ImageBackground>
                < /View>
                    );

                    }

                    }


                    const styles = StyleSheet.create({
                    containerIn: {
                    flex: 1,
                },
                    txtIn: {
                    width: WIDTH - 140,
                    borderWidth: 2,
                    borderRadius: 5,
                    height: 50,
                },
                    profileContainer: {
                    width: width,
                    height: height,
                    alignItems: 'center',
                },
                    profileBackground: {
                    width: width,
                    height: height,
                    backgroundColor: '#101b1f',
                },
                    container: {
                    flex: 1,
                    justifyContent: 'center',
                },
                    horizontal: {
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                },
                    avatar: {
                    width: 40,
                    height: 40,
                    borderRadius: 62,
                    borderWidth: 0,
                    marginLeft: 5,
                },

                });


