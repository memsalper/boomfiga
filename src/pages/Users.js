import React, {Component, useState} from 'react';
import {DiziListesi} from '../components/DiziListesi';
import {FilmListesi} from '../components/FilmListesi';
import {CustomHeader2} from '../header/CustomHeader2';
import SearchBar from 'react-native-search-bar';
import {connect} from 'react-redux';
import {addFriendsInActivity} from '../../reducer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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
import KisiListesi from '../components/KisiListesi';


const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const {width: WIDTH} = Dimensions.get('window');

const profileMe = require('../images/pp.jpg');
const aytac = require('../images/aytc1048.jpg');
const aytug = require('../images/aytu.jpg');


class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userid:"",
            tur:"",
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
                    id: 3,
                    username: 'aytug',
                    image: aytug,
                    tur: 2,
                },
            ],
            aranan: '',
            ekle: false,
            loading: false,

        };
        this.props.navigation.addListener('focus', () => {
            const {userid, tur} = this.props.route.params;
            this.ara(userid, tur);
        })


    }


    ara = async (userid, tur) => {
        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios.post('http://37.247.98.99:8085/Home/GetUserFriendList?UserId=' + userid + '&CategoryType=' + tur);
        //const response2 = await axios.post('http://37.247.98.99:8085/Home/UserFriendReply?UserFriendsId=2&StatuType=3');
       // console.log(response);

        this.setState({
            users: response.data,
            userid:userid,
            tur:tur,
        });
        this.setState(prevState => ({loading: !prevState.loading}));
       // debugger;
    };

    componentDidMount = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios.post('http://37.247.98.99:8085/Home/GetUserFriendList?UserId=' + this.state.userid + '&CategoryType=' + this.state.tur);
        //const response2 = await axios.post('http://37.247.98.99:8085/Home/UserFriendReply?UserFriendsId=2&StatuType=3');
        //console.log(response);

        this.setState({
            users: response.data,
        });
        this.setState(prevState => ({loading: !prevState.loading}));
    };

    renderSwitch(param) {
        switch (param) {
            case 0:
                return <Block col middle>
                    <Button color={theme.COLORS.ERROR} style={{width: 105, height: 30}}
                            onPress={this.git}><Text color={'#fff'} size={12} bold>Kaldır</Text></Button>
                </Block>;
            case 1:
                return <Block col middle>
                    <Block row>
                        <Button color={theme.COLORS.ERROR} style={{width: 50, height: 30, marginRight: 5}}
                                onPress={this.git}><Text color={'#fff'} size={12} bold>Kaldır</Text></Button>
                        <Button color={'#11CDEF'} style={{width: 50, height: 30}}
                                onPress={this.git}><Text color={'#fff'} size={12} bold>Ekle</Text></Button>
                    </Block>
                </Block>;
            case 2:
                return <Block middle>
                    <Button color={theme.COLORS.ERROR} style={{width: 50, height: 30}}
                            onPress={this.git}><Text color={'#fff'} size={12} bold>Kaldır</Text></Button>
                </Block>;
            default:
                return <Block>
                    <Button color={'#11CDEF'} style={{width: 105, height: 30}}
                            onPress={this.git}><Text color={'#fff'} size={12} bold>Ekle</Text></Button>
                </Block>;
        }
    }

    ekle = () => {
        this.setState({
            ekle: !this.state.ekle,
        });
    };


    render() {
        const {navigation} = this.props;
        const {title, tur, tercih, processId} = this.props.route.params;
        const users = this.state.users;

        //console.log(users);
        return (

            <View style={styles.containerIn}>
                <ImageBackground
                    // source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeader2 title={title} navigation={navigation}/>
                    {/* <Button onPress={this.ara}> bas </Button>*/}
                    <ScrollView style={{width: '100%', marginTop: '5%', paddingBottom: HeaderHeight * 2}}>
                        <KisiListesi title={title} veri={users} tercih={tercih} processId={processId}
                                     navigation={navigation}/>
                    </ScrollView>
                </ImageBackground>
            </View>
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
const mapStateToProps = ({friendsInActivity}) => ({
    friendsInActivity,
});

const mapDispatchToProps = {
    addFriendsInActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);


