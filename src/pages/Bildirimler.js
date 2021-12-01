import React, {Component, useState} from 'react';
import {DiziListesi} from '../components/DiziListesi';
import {FilmListesi} from '../components/FilmListesi';
import {CustomHeader2} from '../header/CustomHeader2';
import SearchBar from 'react-native-search-bar';
import {connect} from 'react-redux';
import {getMovie, getSeries} from '../../reducer';
import Icon from 'react-native-vector-icons/AntDesign';


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
    ActivityIndicator, RefreshControl,

} from 'react-native';

import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {parseString} from 'react-native-xml2js';
import {KitapListesi} from '../components/KitapListesi';

import {Block, theme, Input, Button, Text} from 'galio-framework';

import {Images, argonTheme} from '../../constants';
import {HeaderHeight} from '../../constants/utils';
import COLORS from 'galio-framework/src/theme/colors';


const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const {width: WIDTH} = Dimensions.get('window');

const profileMe = require('../images/pp.jpg');
const aytac = require('../images/aytc1048.jpg');


export class Bildirimler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersOrnek: [
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
            ],
            aranan: '',
            isChoosen: false,
            loading: false,

        };
    }

    onPressEvent = () => {
        this.setState({
            isChoosen: !this.state.isChoosen,
        });
    };

    onay = async (islemTipi, UserFriendsId) => {

        if (islemTipi === 0) {
            const response = await axios.post('http://37.247.98.99:8085/Home/UserFriendReply?UserFriendsId=' + UserFriendsId + '&StatuType=2'); //takip isteğini onayla
            console.log(response);
        } else {
            const response = await axios.post('http://37.247.98.99:8085/Home/UserFriendReply?UserFriendsId=' + UserFriendsId + '&StatuType=3'); //takip isteğini reddet
            console.log(response);
        }


    };

    componentDidMount = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        await axios.post('http://37.247.98.99:8085/Home/GetUserFriendList?UserId=2&CategoryType=4').then(response=>{
            console.log(response);

            this.setState(prevState => ({
                loading: !prevState.loading,
                users: response.data,
            }));

        }).catch(err=>{
            this.setState(prevState => ({loading: !prevState.loading}));
        });

    };

    _onRefresh = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios.post('http://37.247.98.99:8085/Home/GetUserFriendList?UserId=2&CategoryType=4').then(response=>{
            console.log(response);

            this.setState(prevState => ({
                loading: !prevState.loading,
                users: response.data,
            }));

        }).catch(err=>{
            this.setState(prevState => ({loading: !prevState.loading}));
        });
    };

    ekle = async (UserFriendsId) => {
        this.setState(prevState => ({loading: !prevState.loading}));
        await axios({
            url: 'http://37.247.98.99:8085/Home/AddFriend',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                AddUserId: 2,
                AddedUserId: UserFriendsId,
                StatuType: 0,
            },
        }).then(response => {
                console.log(response);
            },
        );
        this.setState(prevState => ({
            loading: !prevState.loading,
            usertur: 0,
        }));
    };
    kaldir = async (UserFriendsId) => {
        this.setState(prevState => ({loading: !prevState.loading}));
        await axios({
            url: 'http://37.247.98.99:8085/Home/DeleteFriends',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                UserId: 2,
                FriendsId: UserFriendsId,
            },
        }).then(response => {
                console.log(response);
            },
        );
        this.setState(prevState => ({
            loading: !prevState.loading,
            usertur: 4,
        }));
    };


    renderSwitch(param, UserFriendsId) {
        switch (param) {
            case 0:
                return <Block col middle>
                    <Button color={theme.COLORS.ERROR} style={{width: 150, height: 30}}
                            onPress={this.kaldir(UserFriendsId)}><Text color={theme.COLORS.WHITE} size={12} bold>Takip İsteğini
                        Kaldır</Text>
                    </Button>
                </Block>;
            case 1:
                return <Block col middle>
                    <Block row>
                        <Button color={theme.COLORS.ERROR} style={{width: 50, height: 30, marginRight: 5}}
                                onPress={() => this.onay(1, UserFriendsId)}><Text color={'#fff'} size={12}
                                                                                  bold>Reddet</Text></Button>
                        <Button color={'#11CDEF'} style={{width: 50, height: 30}}
                                onPress={() => this.onay(0, UserFriendsId)}><Text color={'#fff'} size={12}
                                                                                  bold>Onayla</Text></Button>
                    </Block>
                </Block>;
            case 2:
                return <Block middle>
                    <Text style={{marginBottom: 5}} bold>Diğer</Text>
                    <Button color={'#11CDEF'} style={{width: 50, height: 30}}
                            onPress={this.ekle(UserFriendsId)}><Text color={theme.COLORS.WHITE} size={12} bold>Takip Et</Text></Button>
                </Block>;
            default:
                return <Block>
                    <Button color={'#11CDEF'} style={{width: 105, height: 30}}
                            onPress={this.git}><Text color={'#fff'} size={12} bold>Sen de Takip Et</Text></Button>
                </Block>;
        }
    }


    render() {
        const {navigation} = this.props;
        const users = this.state.users;
        const usersOrnek = this.state.usersOrnek;


        //console.log(films);
        return (

            <View style={styles.containerIn}>
                <ImageBackground
                    //source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeader2 title="Bildirimler" navigation={navigation}/>
                    {/*<Button onPress={this.ara}> bas </Button>*/}
                    <TouchableOpacity style={{
                        width: '100%',
                    }} onPress={this.onPressEvent}>
                        <Block middle row space={'between'} style={{
                            width: '100%',
                            backgroundColor: theme.COLORS.SIYAH,
                            marginBottom: 10,
                            padding: 5,
                            marginTop: '5%',
                        }}>
                            <Text color={theme.COLORS.WHITE} bold>Kullanıcı Takip İstekleri ({users.length})</Text>
                            <Icon name={!this.state.isChoosen ? 'right' : 'down'} size={20} color={theme.COLORS.WHITE}/>
                        </Block>
                    </TouchableOpacity>
                    {this.state.isChoosen ?
                        <View style={{ flex:1, width: '100%', alignItems: 'center'}}>
                            <ScrollView style={{width: '100%'}}
                                             refreshControl={
                                                 <RefreshControl
                                                     refreshing={this.state.loading}
                                                     onRefresh={this._onRefresh}
                                                 />
                                             }>
                                <Block style={{
                                    flexWrap: 'wrap',
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {
                                        users.map((user, key) => (
                                            <Block style={{
                                                width: '90%',
                                                flexDirection: 'row',
                                                marginTop: 5,
                                                padding: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 5,
                                            }}>
                                                <TouchableOpacity
                                                    style={{width: '65%', flexDirection: 'row', alignItems: 'center'}}
                                                    onPress={() => navigation.navigate('ProfilDiger', {
                                                        userid: user.UserId,
                                                        tur: user.StatuType,
                                                        username: user.UserName,
                                                    })}>
                                                    <Block style={{marginRight: 5}}>
                                                        <Image
                                                            source={{uri: 'data:image/jpeg;base64,' + user.UserProfilePhoto}}
                                                            style={styles.avatarDiger}
                                                        />
                                                    </Block>
                                                    <Block>
                                                        <Text color={theme.COLORS.WHITE} bold>{user.UserName}</Text>
                                                    </Block>
                                                </TouchableOpacity>
                                                <Block middle style={{width: '35%'}}>
                                                    {
                                                        this.renderSwitch(user.StatuType, user.UserFriendsId)

                                                    }
                                                </Block>
                                            </Block>

                                        ))
                                    }
                                    <Text>---</Text>
                                </Block>
                            </ScrollView>
                        </View>
                        : null}
                    <View style={{flex: 2, width: '100%', marginTop: '5%', alignItems: 'center'}}>
                        <ScrollView style={{width: '100%'}}>
                            {
                                usersOrnek.map((user, key) => (
                                    <Block style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        backgroundColor: '#101b1f',
                                        marginTop: 5,
                                        padding: 5,
                                        alignItems: 'center',
                                    }}>
                                        <Block style={{marginRight: 5}}>
                                            <Image
                                                source={user.image}
                                                style={styles.avatarDiger}
                                            />
                                        </Block>
                                        <Block>
                                            <Text color={theme.COLORS.WHITE} bold>{user.username}</Text>
                                        </Block>
                                        <Block>
                                            <Text color={theme.COLORS.WHITE} size={12}> ile aynı filmi izliyorsun</Text>
                                        </Block>
                                    </Block>
                                ))}
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
                },

                    avatarDiger: {
                    width: 30,
                    height: 30,
                    borderRadius: 62,
                    borderWidth: 0,
                },

                });


