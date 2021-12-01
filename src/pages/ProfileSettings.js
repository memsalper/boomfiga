import React from 'react';
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform,
    View,
    TouchableOpacity,
    ListItem,
    TouchableWithoutFeedback,
    FlatList,
    TextInput,
    Switch,
    ActivityIndicator, Alert,
} from 'react-native';
import {Block, Text, theme, Button, Input} from 'galio-framework';

import {Images, argonTheme} from '../../constants';
import {HeaderHeight} from '../../constants/utils';
import {CustomHeader2} from '../header/CustomHeader2';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
//import {Tab, TabView} from 'react-native-easy-tabs';
//import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
//import SwiperFlatList from 'react-native-swiper-flatlist';
//import {ScrollableTabView} from 'react-native-scrollable-tab-view';

//import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

//import CustomAlertComponent from '../components/CustomAlertComponent';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-fetch-blob';
import {Picker} from '@react-native-community/picker';


/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */


const {width, height} = Dimensions.get('screen');

//const thumbMeasure = (width - 48 - 32) / 3;
const thumbMeasureWidth = (width - 48 - 32) / 3;
const thumbMeasureHeight = thumbMeasureWidth * 1.5;

const profileMe = require('../images/pp.jpg');
const addPhoto = require('../images/addPhoto4.png');

const options = {
    title: 'Profil Fotoğrafı',
    takePhotoButtonTitle: 'Fotoğraf Çek',
    chooseFromLibraryButtonTitle: 'Kütüphaneden Seç',
    cancelButtonTitle: 'Vazgeç',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export class ProfileSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarSource: null,
            isAlertVisible: false,
            tercih: false,
            name: 'Alper MEMİŞ',
            username: 'mmsalper',
            location: 'Ankara',
            birthYear: '1992',
            birthYearS: true,
            profile: false,
            account: true,
            ProfilePhotoBase64: '',
            instagramUsername: 'mmsalper',
            twitterUsername: 'alpermms',
            biyografi: 'Bilgisayar Mühendisi',
            resizedImageUri: '',
            ProfilePhotoPath: '',
            ProfilePhotoUri: '',
            loading: false,
            steamArkadasKodu: '1049096690',
            selectedCity: 0,
            password:"",
        };
    }

    alert = (mesaj) => {
        Alert.alert(
            'Uyarı',
            mesaj,
            [
                {
                    text: 'Kapat',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    };
    kaydet = async () => {

    };

    kaydetFoto = async (ProfilePhotoUri) => {
        this.setState(prevState => ({loading: !prevState.loading}));
        ImageResizer.createResizedImage(ProfilePhotoUri, 500, 500, 'JPEG', 100)
            .then(response => {
                RNFetchBlob.fs.readFile(response.path, 'base64')
                    .then(data => {
                        this.setState({resizedImageUri: response.uri, ProfilePhotoBase64: data});

                        //const photoBase64=this.state.ProfilePhotoBase64;
                        // alert(photoBase64);
                        /* const b64toBlob = (data, type = 'application/octet-stream') =>
                             fetch(`data:${type};base64,${base64}`).then(res => res.blob())
                         console.log(b64toBlob);*/
                        const responseDiger = axios({
                            url: 'http://37.247.98.99:8085/Home/InsertProfilePhoto',
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                            },
                            data: {
                                UserId: 2,
                                ProfilePhoteBase64: data, //'data:image/jpeg;base64,' +
                            },
                        }).then(response2 => {
                            //console.log(response2.data);
                            if (response2.data.IsError) {
                                this.alert('Başarısız!');
                            } else {
                                this.alert('Başarılı!');
                            }
                            this.setState(prevState => ({
                                loading: !prevState.loading,
                            }));
                        }).catch(error => {
                            console.warn(error);
                            this.alert('Başarısız!');
                            this.setState(prevState => ({
                                loading: !prevState.loading,
                            }));

                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });


    };


    fotoSec = () => {

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response.data); //base64 format
            //console.log('orjinal : ' + response.data);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};

                // You can also display the image using data:
                //const source = { uri: 'data:image/jpeg;base64,' + response.data };


                //debugger;

                this.kaydetFoto(response.uri);


                this.setState({
                    avatarSource: source,
                    ProfilePhotoUri: response.uri,
                    ProfilePhotoPath: response.path,
                });
            }
        });


    };

    _onChangeTextInstagramUsername = text => {
        this.setState({
            instagramUsername: text,
        });
    };
    _onChangeTextTwitterUsername = text => {
        this.setState({
            twitterUsername: text,
        });
    };
    _onChangeTextSteamArkadasKodu = text => {
        this.setState({
            steamArkadasKodu: text,
        });
    };

    _onChangeTextName = text => {
        this.setState({
            name: text,
        });
    };
    _onChangeTextUsername = text => {
        this.setState({
            username: text,
        });
    };

    _onChangeTextPassword= text => {
        this.setState({
            password: text,
        });
    };

    _onChangeTextLocation = text => {
        this.setState({
            location: text,
        });
    };
    _onChangeTextBiyografi = text => {
        this.setState({
            biyografi: text,
        });
    };
    _onChangeTextBirthyear = text => {
        this.setState({
            birthYear: text,
        });
    };
    _onChangeSwitchBirthyearS = boolean => {
        this.setState({
            birthYearS: boolean,
        });
    };
    _onChangeSwitchProfile = boolean => {
        this.setState({
            profile: boolean,
        });
    };
    _onChangeSwitchAccount = boolean => {
        this.setState({
            account: boolean,
        });
    };


    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
        };
        let {navigation} = this.props;
        const {name, username, location, birthYear, birthYearS, profile, account, instagramUsername, twitterUsername, biyografi, steamArkadasKodu, password} = this.state;

        if (this.state.loading) {
            return <View style={[styles.containera, styles.horizontal]}><ActivityIndicator size="large"
                                                                                           color="#0000ff"/></View>;
        }

        return (

            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        //  source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}
                    >
                        <CustomHeader2 title="mmsalper" navigation={navigation}/>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{width, marginTop: '5%'}}
                        >
                            <Block flex style={styles.profileCard}>
                                <Block middle style={styles.avatarContainer}>

                                    <Image
                                        source={this.state.avatarSource ? this.state.avatarSource : addPhoto}
                                        style={styles.avatar}
                                    />
                                    <Button onPress={this.fotoSec} style={{marginTop: 5, width: 120, height: 30}}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#FFF',
                                        }}>Fotoğrafı Değiştir</Text>
                                    </Button>
                                </Block>
                                <Block style={styles.info}>
                                    <Block
                                        middle
                                        row
                                        space="evenly"
                                        style={{marginTop: 5, paddingBottom: 5}}
                                    >
                                        {/*{this.state.resizedImageUri ? (
                                            <Image
                                                style={styles.avatar}
                                                source={{uri: this.state.resizedImageUri}}
                                            />
                                        ) : null}*/}
                                        <TouchableOpacity style={{
                                            paddingVertical: 15,
                                            paddingHorizontal: 10,
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Iconm name={'exit-to-app'} size={25} color="#900"/>
                                            <Text style={{
                                                fontSize: 12,
                                                color: '#900',
                                            }}>Çıkış</Text>


                                        </TouchableOpacity>

                                    </Block>
                                    <Block row middle space="between">
                                        <Text>Ad :</Text><TextInput onChangeText={this._onChangeTextName} value={name}/>
                                    </Block>
                                    <Block middle style={{marginTop: 2, marginBottom: 2}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block row middle space="between">
                                        <Text>Kullanıcı Adı :</Text><TextInput onChangeText={this._onChangeTextUsername}
                                                                               value={username}/>
                                    </Block>
                                    <Block middle style={{marginTop: 2, marginBottom: 2}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block row middle space="between">
                                        <Text>Şifre :</Text><TextInput
                                        placeholder={"Şifre"} secureTextEntry={true} onChangeText={this._onChangeTextPassword}
                                                                               value={password}/>
                                    </Block>
                                    <Block middle style={{marginTop: 2, marginBottom: 2}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block row middle space="between">
                                        <Text>Konum :</Text>
                                        <Picker
                                            style={{width: '50%'}}
                                            selectedValue={this.state.selectedCity}
                                            onValueChange={(itemValue) => {
                                                this.setState({
                                                    selectedCity: itemValue,
                                                });
                                            }}>

                                            <Picker.Item label={'Ankara'} value={0} key={0}></Picker.Item>
                                            <Picker.Item label={'İstanbul'} value={1} key={1}></Picker.Item>
                                            <Picker.Item label={'İzmir'} value={2} key={2}></Picker.Item>
                                        </Picker>
                                    </Block>
                                    <Block middle style={{marginTop: 2, marginBottom: 2}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block row middle space="between">
                                        <Text>Biyografi :</Text><TextInput onChangeText={this._onChangeTextBiyografi}
                                                                           value={biyografi}/>
                                    </Block>
                                    <Block middle style={{marginTop: 2, marginBottom: 2}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block row middle space="between">
                                        <Iconm name={'instagram'} size={20} color="#900"/><TextInput
                                        onChangeText={this._onChangeTextInstagramUsername}
                                        value={instagramUsername} placeholder={'kullacını adı'}/>
                                    </Block>
                                    <Block middle style={{marginTop: 2, marginBottom: 2}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block row middle space="between">
                                        <Iconm name={'twitter'} size={20} color="#900"/><TextInput
                                        onChangeText={this._onChangeTextTwitterUsername}
                                        value={twitterUsername} placeholder={'kullacını adı'}/>
                                    </Block>
                                    <Block middle style={{marginTop: 2, marginBottom: 2}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block row middle space="between">
                                        <Iconm name={'steam-box'} size={20} color="#900"/><TextInput
                                        onChangeText={this._onChangeTextSteamArkadasKodu}
                                        value={steamArkadasKodu} placeholder={'arkadaş kodu'}/>
                                    </Block>
                                    <Block middle style={{marginTop: 2, marginBottom: 2}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block row middle space="between">
                                        <Text>Doğum Yılı :</Text><TextInput onChangeText={this._onChangeTextBirthyear}
                                                                            value={birthYear}/>
                                        {birthYearS ? <Text>Yaş Açık</Text> : <Text> Yaş Gizli</Text>}
                                        <Switch
                                            style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                                            value={birthYearS}
                                            onValueChange={this._onChangeSwitchBirthyearS}/>
                                    </Block>
                                    <Block middle style={{marginTop: 2, marginBottom: 2}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block row middle space="between">
                                        <Text>Profil :</Text>
                                        <Block row middle space="between">
                                            {profile ? <Text>Profil Açık </Text> : <Text>Profil Gizli </Text>}
                                            <Switch
                                                style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                                                value={profile}
                                                onValueChange={this._onChangeSwitchProfile}/>
                                        </Block>
                                    </Block>
                                    <Block middle style={{marginTop: 2, marginBottom: 2}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block row middle space="between">
                                        <Text>Hesap :</Text>
                                        <Block row middle space="between">
                                            {account ? <Text>Hesap Açık </Text> : <Text>Hesap Kapalı </Text>}
                                            <Switch
                                                style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                                                value={account}
                                                onValueChange={this._onChangeSwitchAccount}/>
                                        </Block>
                                    </Block>
                                    <Block row middle style={{marginTop: 20, paddingBottom: HeaderHeight * 2}}>
                                        <Button onPress={this.kaydet} style={{marginTop: 5, width: 120, height: 40}}>
                                            <Text style={{
                                                fontSize: 15,
                                                color: '#FFF',
                                            }}>Kaydet</Text>
                                        </Button>
                                    </Block>
                                </Block>
                            </Block>
                        </ScrollView>
                    </ImageBackground>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        //marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
        // marginBottom: -HeaderHeight * 2,
        flex: 1,
    },
    profileContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1,
    },
    profileBackground: {
        width: width,
        height: height, //height / 2,
        backgroundColor: '#101b1f',
    },
    profileCard: {
        // position: "relative",
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    },
    info: {
        paddingHorizontal: 40,
    },
    avatarContainer: {
        position: 'relative',
        marginTop: -80,
    },
    avatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0,
        backgroundColor: 'tomato',
    },
    nameInfo: {
        marginTop: 35,
    },
    divider: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        marginLeft: 4,
        alignSelf: 'center',
        width: thumbMeasureWidth,
        height: thumbMeasureHeight,
    },
    fill: {
        flex: 1,
    },
    padding: {
        flexDirection: 'row',
        paddingTop: 5,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: theme.COLORS.white,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    notify: {
        position: 'absolute',
        top: 0,
        right: 2,
    },
    containery: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: width * 0.5,
        textAlign: 'center',
    },
    scene: {
        flex: 1,
    },
    containera: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});


