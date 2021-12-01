import React from "react";
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView, TextInput, Alert,
} from 'react-native';
import { Block, Checkbox, Text, theme, Button, Input} from "galio-framework";
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';


import { Images, argonTheme } from "../../constants";
import axios from 'axios';

const { width, height } = Dimensions.get("screen");

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.myTextInput = React.createRef();

        this.state = {
            name: '',
            surname: '',
            username: '',
            email: '',
            password: '',
        };
    }
    alert = (mesaj) => {
        Alert.alert(
            "Uyarı",
            mesaj,
            [
                {
                    text: "Kapat",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            {cancelable: false}
        );
    }

    kaydet = async () => {

        const response = await axios({
            url: 'http://37.247.98.99:8085/Home/InsertOrUpdateUser',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                UserName: this.state.username,
                Name: this.state.name,
                Surname: this.state.surname,
                Password: this.state.password,
                EMail: this.state.email,
                DeviceId:"1",
                Country:1,
            },
        }).catch(error => {
            console.warn(error);

        });

        console.log(response);

        if(response.data.IsError){
            this.alert(response.data.ErrorMessage);
        }else{
            this.alert("Başarılı");
            this.myTextInput.current.clear();
        }


    };

    _onChangeTextName = text => {
        this.setState({
            name: text,
        });
    };

    _onChangeTextSurname = text => {
        this.setState({
            surname: text,
        });
    };
    _onChangeTextUsername = text => {
        this.setState({
            username: text,
        });
    };

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

    render() {
        return (
            <Block flex middle>
                <StatusBar hidden />
                <ImageBackground
                    source={Images.RegisterBackground}
                    style={{ width, height, zIndex: 1 }}
                >
                    <Block flex middle>
                        <Block style={styles.registerContainer}>
                            <Block flex>
                                <Block flex={0.1} middle>
                                </Block>
                                <Block flex center>
                                    <KeyboardAvoidingView
                                        style={{ flex: 1 }}
                                        behavior="padding"
                                        enabled
                                    >
                                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                            <Input
                                                onChangeText={this._onChangeTextName}
                                                value={this.state.name}
                                                ref={this.myTextInput}
                                                borderless
                                                placeholder="Ad"
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={argonTheme.COLORS.ICON}
                                                        name="user"
                                                        style={styles.inputIcons}
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                            <Input
                                                onChangeText={this._onChangeTextSurname}
                                                value={this.state.surname}
                                                ref={this.myTextInput}
                                                borderless
                                                placeholder="Soyad"
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={argonTheme.COLORS.ICON}
                                                        name="user"
                                                        style={styles.inputIcons}
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                            <Input
                                                onChangeText={this._onChangeTextUsername}
                                                value={this.state.username}
                                                ref={this.myTextInput}
                                                borderless
                                                placeholder="Kullanıcı Adı"
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={argonTheme.COLORS.ICON}
                                                        name="user"
                                                        style={styles.inputIcons}
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                            <Input
                                                onChangeText={this._onChangeTextEmail}
                                                value={this.state.email}
                                                ref={this.myTextInput}
                                                borderless
                                                placeholder="Eposta"
                                                iconContent={
                                                    <Iconm
                                                        size={16}
                                                        color={argonTheme.COLORS.ICON}
                                                        name="email-outline"
                                                        style={styles.inputIcons}
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block width={width * 0.8}>
                                            <Input
                                                onChangeText={this._onChangeTextPassword}
                                                value={this.state.password}
                                                ref={this.myTextInput}
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
                                            />
                                            <Block row style={styles.passwordCheck}>
                                                <Text size={12} color={argonTheme.COLORS.MUTED}>
                                                    şifre gücü:
                                                </Text>
                                                <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                                                    {" "}
                                                    zayıf
                                                </Text>
                                            </Block>
                                        </Block>
                                        <Block row width={width * 0.75}>
                                            <Checkbox
                                                checkboxStyle={{
                                                    borderWidth: 3
                                                }}
                                                color={argonTheme.COLORS.PRIMARY}
                                            />
                                            <Button
                                                style={{ width: 260, marginLeft: 5 }}
                                                color="transparent"
                                                textStyle={{
                                                    color: argonTheme.COLORS.PRIMARY,
                                                    fontSize: 14
                                                }}
                                            >
                                                  Şartlar ve Gizlilik Politikasını okudum. Onaylıyorum.
                                            </Button>
                                        </Block>
                                        <Block middle>
                                            <Button color="primary" style={styles.createButton} onPress={this.kaydet}>
                                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                                    HESAP OLUŞTUR
                                                </Text>
                                            </Button>
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
        height: height * 0.78,
        backgroundColor: "#F4F5F7",
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden"
    },
    socialConnect: {
        backgroundColor: argonTheme.COLORS.WHITE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#8898AA"
    },
    socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: "#fff",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1
    },
    socialTextButtons: {
        color: argonTheme.COLORS.PRIMARY,
        fontWeight: "800",
        fontSize: 14
    },
    inputIcons: {
        marginRight: 12
    },
    passwordCheck: {
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 30
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25
    }
});


