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


export class Begenenler extends Component {
    constructor(props) {
        super(props);
        const {userId,processId, processObjId} = this.props.route.params;
        //alert(processObjId);
        this.state = {
            userId:userId,
            processId:processId,
            processObjId:processObjId,
            aranan: '',
            users:[],

        };
    }



    componentDidMount = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        //alert(this.state.processObjId);
        const response = await axios.post('http://37.247.98.99:8085/Home/GetProcessLikeUserList?UserId='+this.state.userId+'&ProcessObjId='+this.state.processObjId);
        console.log(response);

        this.setState({
            users:response.data,
        })
        this.setState(prevState => ({
            loading: !prevState.loading,
        }));
    };

    renderSwitch(param) {
        switch (param) {
            case 1:
                return <Block row middle >
                    <Text color={theme.COLORS.WHITE} size={12}>Arkadaşın</Text>
                    {/*<Button color={theme.COLORS.ERROR} style={{width: 50, height: 30}}
                            onPress={this.git} ><Text color={theme.COLORS.WHITE} size={12} bold>Kaldır</Text></Button>*/}
                </Block>;
            case 2:
                return <Block col middle>
                    <Block middle row >
                        <Text color={theme.COLORS.WHITE} size={12}>Takipçin</Text>
                        {/* <Button color={theme.COLORS.ERROR} style={{width: 50, height: 30, marginRight: 5}}
                                onPress={this.git}><Text color={theme.COLORS.WHITE} size={12} bold>Kaldır</Text></Button>
                        <Button color={'#11CDEF'} style={{width: 50, height: 30}}
                                onPress={this.git}><Text color={theme.COLORS.WHITE} size={12} bold>Ekle</Text></Button>*/}
                    </Block>
                </Block>;
            case 3:
                return <Block middle>
                    <Text color={theme.COLORS.WHITE}  size={12}>Takip Etiiğin</Text>
                    {/*<Button color={theme.COLORS.ERROR} style={{width: 50, height: 30}}
                            onPress={this.git}><Text color={theme.COLORS.WHITE} size={12} bold>Kaldır</Text></Button>*/}
                </Block>;
            default:
                return <Block>
                    <Text color={theme.COLORS.WHITE}  size={12}>Diğer</Text>
                    {/* <Button color={'#11CDEF'} style={{width: 50, height: 30}}
                            onPress={this.git}><Text color={theme.COLORS.WHITE} size={12} bold>Ekle</Text></Button>*/}
                </Block>;
        }
    }



    render() {
        const {navigation} = this.props;
        const {title, tur} = this.props.route.params;
        const users = this.state.users;

        console.log(users);
        return (

            <View style={styles.containerIn}>
                <ImageBackground
                    // source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeader2 title={ "Beğenenler" } navigation={navigation}/>
                    {/* <Button onPress={this.ara}> bas </Button>*/}
                    <View style={{flex: 1, width: '100%', marginTop: 10 , paddingLeft:5, paddingBottom: HeaderHeight * 1.2}}>
                        <ScrollView style={{width: '100%', paddingBottom: HeaderHeight * 1.2}}>
                            <Block style={{flexWrap: 'wrap', flex: 1}}>
                                {
                                    users.map((user, key) => (
                                        <Block style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            backgroundColor: '#101b1f',
                                            marginTop: 5,
                                            padding: 5,
                                            alignItems: 'center',
                                        }}
                                               key={key} >
                                            <TouchableOpacity  style={{width: '65%', flexDirection:"row", alignItems:"center"}}
                                                               onPress={() => navigation.navigate('ProfilDiger', {userme:2, userid: user.Id, username: user.UserName, tur: user.FriendStatu, name: user.Name, surname: user.Surname, userphoto: user.UserProfilePhoto})}>
                                                <Block style={{marginRight:5}}>
                                                    <Image
                                                        source={user.UserProfilePhoto!=null ?{uri: 'data:image/jpeg;base64,' + user.UserProfilePhoto}: profile}
                                                        style={styles.avatar}
                                                    />
                                                </Block>
                                                <Block>
                                                    <Text color={theme.COLORS.WHITE} bold>{user.UserName}</Text>
                                                </Block>
                                            </TouchableOpacity>
                                            <Block middle style={{width: '35%'}}>
                                                {
                                                    this.renderSwitch(user.FriendStatu)

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


