import React, {Component, useState} from 'react';
import {DiziListesi} from '../components/DiziListesi';
import {FilmListesi} from '../components/FilmListesi';
import {CustomHeader} from '../header/CustomHeader';
import SearchBar from 'react-native-search-bar';
//import { SearchBar } from 'react-native-elements';
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
    TouchableWithoutFeedback,
    RefreshControl,

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
const aytac = require("../images/aytc1048.jpg");
const aytug = require("../images/aytu.jpg");
const profile = require("../images/profile.png");


export class Search extends Component {
    constructor(props) {
        super(props);
        this.search1 = React.createRef();
        this.search2 = React.createRef();
        this.state = {
            users:[],
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
            search: '',
            loading:false,

        };
    }


    ara = async () => {

        this.setState(prevState => ({loading: !prevState.loading}));

        const response = await axios.post('http://37.247.98.99:8085/Home/SearchUser?UserId=2&SearchParameter='+this.state.aranan);
        console.log(response);

        this.setState({
            users:response.data,
        })
        this.setState(prevState => ({
            loading: !prevState.loading,
        }));


    };

    _onChangeTextTitle = text => {
        this.setState({
            aranan: text,
        });
    };

    updateSearch = search => {
        this.setState({ search });
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
        const {users, aranan} = this.state;
        const { search } = this.state;


        //console.log(users);
        return (

            <View style={styles.containerIn}>
                <ImageBackground
                    //source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeader title={'Kullanıcı Arama'} navigation={navigation}/>
                    {/* <Button onPress={this.ara}> bas </Button>*/}
                    <Block middle width={width}>
                       {/* <SearchBar
                            placeholder="Type Here..."
                            onChangeText={this.updateSearch}
                            value={search}
                            containerStyle={{width:"100%"}}

                        />*/}
                        <Input
                            ref={this.search1}
                            right
                               paddingHorizontal={0}
                               color={'#18224D'}
                               style={{borderColor: theme.COLORS.THEME,width: "98%"}}
                               value={aranan}
                               onChangeText={this._onChangeTextTitle}
                               placeholder={'Kullanıcı adı giriniz...'}
                               placeholderTextColor={'#8898AA'}
                               onSubmitEditing={this.ara}
                               returnKeyType={'search'}
                               iconContent={<TouchableOpacity onPress={this.ara}><Image
                                   style={{width: 20, height: 20}}
                                   source={require('../images/search.png')}/></TouchableOpacity>}
                               autoFocus={true}
                        />
                    </Block>
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
        marginLeft:5,
    },
    inset: {
        flex: 1,
    },
    header: {
        textAlign: 'center',
        margin: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
    listItem: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 18,
        backgroundColor: '#fff',
    },

});


