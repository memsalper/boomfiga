import React from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import {Block, Text, theme, Button, Input} from 'galio-framework';
import Icon from 'react-native-vector-icons/AntDesign';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import DeviceInfo from 'react-native-device-info'; //, {getDeviceId, getAndroidId}
//import axios from 'axios';

import {Images, argonTheme} from '../../constants';
import axios from 'axios';

import messaging from '@react-native-firebase/messaging';

const {width, height} = Dimensions.get('screen');

const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile", "email", 'user_friends']).then(
        function(result) {
            if (result.isCancelled) {
                console.log("==> Login cancelled");
            } else {
                console.log(
                    "==> Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        console.log(data.accessToken.toString())
                    }
                )
            }
        },
        function(error) {
            console.log("==> Login fail with error: " + error);
        }
    );
}

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"memsalper@gmail.com",
            password:"123",
            loading:false,
            userInfo:[],
            deviceId:"",
            userId:0,
        };
    }

    /*componentDidMount = async () =>  {
       /!* axios({
            url: "https://api-v3.igdb.com/games/",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': "b29ecbf75cc392262cc798180175b2fd",
            },
            data:'fields name,cover.url; search "cs global";',
        })
            .then(response => {
                console.log(response.data[0].cover.url);
            })
            .catch(err => {
                console.error(err);
            });*!/
    }*/

    _onChangeTextEmail = text => {
        this.setState({
            email: text,
        });
    };
    _onChangeTextPassword = text => {
        this.setState({
            password: text,
        });
    };

    girisOnay = async () => {



        this.setState(prevState => ({loading: !prevState.loading}));

        await messaging().registerDeviceForRemoteMessages();
        await messaging().requestPermission();
        console.log(await messaging().getToken());
        let deviceId=await messaging().getToken();
        this.setState({
            deviceId:deviceId,
        })


        await axios.post('http://37.247.98.99:8085/Home/Login?EMail=' + this.state.email + '&Password='+ this.state.password).then(response=>{
            console.log(response);

            this.setState(prevState => ({
                loading: !prevState.loading,
                userInfo: response.data,
                userId:response.data.Id,
            }));

            //console.log(this.state.userInfo);

            if(this.state.userInfo.IsError){
                alert("hata");
            }else{
                axios.post('http://37.247.98.99:8085/Home/AddUserDevice?UserId=' + this.state.userId + '&DeviceId='+ this.state.deviceId + '&Active=true').then(response2=> {
                    console.log(response2);
                })
                this.props.navigation.navigate("Giris", {userId:this.state.userId}); //anasayfaya yönlendirilmeli
            }

        }).catch(err=>{
            this.setState(prevState => ({loading: !prevState.loading}));
            alert("hata");
        });


    };


    render() {
        let {navigation}=this.props;
        let deviceId = DeviceInfo.getAndroidId();
       // console.log(deviceId);
        if (this.state.loading) {
           return <View style={[styles.containerl, styles.horizontal]}><ActivityIndicator size="large" color="#0000ff"/></View>;
       }

        //alert(AccessToken);
        return (
            <Block flex middle>
                <StatusBar hidden/>
                <ImageBackground
                    source={Images.RegisterBackground}
                    style={{width, height, zIndex: 1}}
                >
                    <Block flex middle>
                        <Block style={styles.registerContainer}>
                            <Block flex={0.25} middle style={styles.socialConnect}>
                                <Text color={theme.COLORS.SIYAH} size={25} bold>BooMFiGa</Text>
                                <Block row style={{marginTop: theme.SIZES.BASE}}>
                                    {/*<LoginButton
                                                onLoginFinished={
                                                    (error, result) => {
                                                        if (error) {
                                                            console.log("login has error: " + result.error);
                                                        } else if (result.isCancelled) {
                                                            console.log("login is cancelled.");
                                                        } else {
                                                            AccessToken.getCurrentAccessToken().then(
                                                                (data) => {
                                                                    console.log(data.accessToken.toString())
                                                                }
                                                            )
                                                        }
                                                    }
                                                }
                                                onLogoutFinished={() => console.log("logout.")}/>*/}

                                    <Button style={styles.socialButtons} onPress={loginWithFacebook}>
                                        <Block row>
                                            <Icon
                                                name="facebook-square"
                                                size={14}
                                                color={'black'}
                                                style={{marginTop: 2, marginRight: 5}}
                                            />
                                            <Text style={styles.socialTextButtons}>Facebook ile devam et</Text>
                                        </Block>
                                    </Button>
                                </Block>
                            </Block>
                            <Block flex>
                                <Block flex={0.17} middle>
                                    <Text color="#8898AA" size={12}>
                                        Ya da
                                    </Text>
                                </Block>
                                <Block flex center>
                                    <KeyboardAvoidingView
                                        style={{flex: 1}}
                                        behavior="padding"
                                        enabled
                                    >
                                        <Block width={width * 0.8} style={{marginBottom: 15}}>
                                            <Input
                                                borderless
                                                placeholder="Email"
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={argonTheme.COLORS.ICON}
                                                        name="user"
                                                        style={styles.inputIcons}
                                                    />
                                                }
                                                onChangeText={this._onChangeTextEmail}
                                                value={this.state.email}
                                            />
                                        </Block>
                                        <Block width={width * 0.8}>
                                            <Input
                                                password
                                                borderless
                                                placeholder="Şifre"
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={argonTheme.COLORS.ICON}
                                                        name="key"
                                                        style={styles.inputIcons}
                                                    />
                                                }
                                                onChangeText={this._onChangeTextPassword}
                                                value={this.state.password}
                                            />
                                        </Block>
                                        <Block row bottom>
                                            <TouchableOpacity>
                                                <Text style={styles.kayit}>Şifremi unuttum</Text>
                                            </TouchableOpacity>
                                        </Block>
                                        <Block middle>
                                            <Button color="primary" style={styles.createButton} onPress={this.girisOnay}>
                                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                                    GİRİŞ
                                                </Text>
                                            </Button>
                                        </Block>
                                        <Block row middle>
                                            <TouchableOpacity onPress={()=>navigation.navigate('Register')}
                                                style={{marginTop: 5, flexDirection: 'row'}}>
                                                <Text style={styles.kayit}>Hesabın yok ise</Text>
                                                <Text bold> Kaydol</Text>
                                            </TouchableOpacity>
                                        </Block>
                                    </KeyboardAvoidingView>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                </ImageBackground>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    registerContainer: {
        width: width * 0.9,
        height: height * 0.60,
        backgroundColor: '#F4F5F7',
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: 'hidden',
    },
    socialConnect: {
        backgroundColor: argonTheme.COLORS.WHITE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#8898AA',
    },
    socialButtons: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
    },
    socialTextButtons: {
        color: argonTheme.COLORS.PRIMARY,
        fontWeight: '800',
        fontSize: 14,
    },
    inputIcons: {
        marginRight: 12,
    },
    passwordCheck: {
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 30,
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25,
    },
    kayit: {
        color: argonTheme.COLORS.PRIMARY,
        fontSize: 14,
    },
    containerl: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },


});


