import React, {Component, useState} from 'react';
import {DiziListesi} from '../components/DiziListesi';
import {FilmListesi} from '../components/FilmListesi';
import {CustomHeaderAddProcess} from '../header/CustomHeaderAddProcess';
import SearchBar from 'react-native-search-bar';
import {connect} from 'react-redux';
import {addFriendsInActivity} from '../../reducer';
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
    ActivityIndicator,
    KeyboardAvoidingView,
    BackHandler,
    Alert,

} from 'react-native';

import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {parseString} from 'react-native-xml2js';
import {KitapListesi} from '../components/KitapListesi';

import {Block, theme, Input, Button, Text, Checkbox} from 'galio-framework';

import {Images, argonTheme} from '../../constants';
import {HeaderHeight} from '../../constants/utils';
import Iconi from 'react-native-vector-icons/Ionicons';
import COLORS from 'galio-framework/src/theme/colors';
import {Rating} from 'react-native-ratings';


const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const {width: WIDTH} = Dimensions.get('window');

const profileMe = require('../images/pp.jpg');
const aytac = require('../images/aytc1048.jpg');

const ListItem = (props) => {
    return (
        <TouchableOpacity>
            <View style={styles.listItem}>
                <Text>{props.username}</Text>
            </View>
        </TouchableOpacity>
    );
};

let kisiler;


class AddProcess extends Component {
    constructor(props) {
        super(props);
        // this.textInputField = React.createRef();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            description: '',
            aranan: '',
            isChecked: true,
            comment: '',
            rate: 0,
            kisiler: [],

        };
        /*this.props.navigation.addListener('focus', () => {
            const {kisiler} = this.props.route.params ? this.props.route.params : [];

            this.setState({
                kisiler:kisiler,
            })
        });*/
    }

    ara = async () => {


        const response = await axios.post('http://37.247.98.99:8085/Home/Login?EMail=aytugkonuralp@gmail.com&Password=1212');
        // console.log(response);


    };

    componentDidMount = async () => {
        //this.textInputField.focus();

    };


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    /*  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
          this.textInputField.focus();
      }*/


    back = () => {
        const parent = this.props.navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: true,
        });
        this.props.navigation.goBack();
    };

    _onChangeTextDescription = text => {
        this.setState({
            description: text,
        });
    };

    _onChangeTextComment = text => {
        this.setState({
            comment: text,
        });
    };
    ratingCompleted = (rating) => {
        this.setState({
            rate: rating,
        });
    };

    handleBackButtonClick() {
        const parent = this.props.navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: true,
        });
    }

    kaydet = async () => {
        const {id, title, tur, poster, tense} = this.props.route.params;
        let description = '';

        kisiler.map((process, key) => (
                this.props.route.params.id == process.processId ?
                    kisiler += process.username + ', '
                    : null
            ),
        );

        let ek = kisiler.length != 0 ? 'ile birlikte' : '';

        description = this.state.description + ' ' + kisiler + ek;

        //debugger;

        this.setState({
            description: description,
        });

        // debugger;
        const response = await axios({
            url: 'http://37.247.98.99:8085/Home/InsertProcess',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                UserId: 2,
                Description: description,
                //Comment: !this.state.isChecked ? this.state.comment : null,
                Path: poster,
                ProcessId: id,
                ProcessName: title,
                ProcessType: tur,
                Rate: this.state.isChecked ? this.state.rate : 0,
                Tense: tense,
                Comment: this.state.isChecked ? this.state.comment : '',
            },
        });
        console.log(response);

        if (response.data.IsError) {
            this.alert(response.data.ErrorMessage);
        } else {
            this.alert('Başarılı!');
            this.handleBackButtonClick();
            this.props.navigation.goBack();
            this.props.navigation.navigate('Profil',{add:true});
        }
    };

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

    /*secilenler = data => {
        this.setState({
            kisiler: data,
        });
        // console.log(kisiler);
    };
*/
    friendsInActivityOutput = () => {
        return (
            <Block row width={width} style={{paddingLeft: 5}}>
                <Text style={{flex: 1, flexWrap: 'wrap'}} color={theme.COLORS.WHITE}>
                    {kisiler.map((process, key) => (
                            this.props.route.params.id == process.processId ?
                                process.username + ', '
                                : null
                        ),
                    )}
                </Text>
            </Block>
        );
    };


    render() {
        const {navigation} = this.props;
        const {id, title, poster, tur, buttonText} = this.props.route.params;
        const users = this.state.users;
        kisiler = this.props.route.params.kisiler ? this.props.route.params.kisiler : [];
        //alert(kisiler);
        console.log("AddProcess");
        console.log(kisiler);

      // alert(kisiler.length);



        //console.log(this.state.kisiler);
        //alert(this.props.friendsInActivity.value);
        return (

            <SafeAreaView style={styles.containerIn}>
                <ImageBackground
                    // source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeaderAddProcess title={title} poster={poster} tur={tur} navigation={navigation}/>
                    <KeyboardAvoidingView style={{flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center'}}
                                          behavior={'height'}>
                        {/* <Button onPress={this.ara}> bas </Button>*/}
                        <Block space={'between'} top={'flex-start'} flex width={width}>
                            <Block flex={0.7} left style={{width: '100%', flexWrap: 'wrap', paddingLeft: 5}}>
                                <TextInput style={styles.commentStyle}
                                           onChangeText={this._onChangeTextDescription}
                                           value={this.state.description}
                                           placeholder={'Ne yazmak istersin?'}
                                           placeholderTextColor={theme.COLORS.MUTED}
                                           multiline={true}
                                           autoFocus={true}

                                />
                                    {kisiler.length!=0 ? this.friendsInActivityOutput() : null}

                            </Block>
                            <Block flex row right style={{width: '100%', padding: 2, paddingLeft: 10}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Users', {
                                    title: 'Arkadaşlarını Dahil Et!',
                                    tur: 0,
                                    tercih: true,
                                    processId: id,
                                })}>
                                    <Icon name="adduser" size={30} color={theme.COLORS.WHITE}/>
                                </TouchableOpacity>
                                <Checkbox onChange={() => {
                                    this.setState({
                                        isChecked: !this.state.isChecked,
                                    });
                                }}
                                          initialValue={!this.state.isChecked}
                                          color="error" label="Puan Ver" iconSize={30}
                                          checkboxStyle={{width: 30, height: 30, marginLeft: 10}}
                                          labelStyle={{color: theme.COLORS.WHITE}} iconFamily="font-awesome"
                                          iconName="star"/>
                            </Block>
                            {this.state.isChecked ?
                                <Block flex={0.5} middle style={{width: '100%', padding: 10}}>
                                    <Rating
                                        type='custom'
                                        ratingColor={theme.COLORS.ERROR}
                                        ratingCount={5}
                                        imageSize={30}
                                        startingValue={this.props.rate}
                                        onFinishRating={this.ratingCompleted}
                                        ozelArkaPlan={'#101b1f'}
                                    />
                                    <TextInput style={styles.commentStyle}
                                               onChangeText={this._onChangeTextComment}
                                               value={this.state.comment}
                                               placeholder={'Var ise yorumunuzu yazınız..'}
                                               placeholderTextColor={theme.COLORS.MUTED}
                                               multiline={true}

                                    />
                                </Block>
                                : null}
                            <Block flex={0.3} row top space={'evenly'} style={{
                                width: '100%',
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: '#182227',
                            }}>
                                <TouchableOpacity style={styles.alertMessageButtonStylen} onPress={this.back}><Text
                                    color={theme.COLORS.SIYAH} bold>Vazgeç</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.alertMessageButtonStyle} onPress={this.kaydet}><Text
                                    color={theme.COLORS.SIYAH} bold>{buttonText}</Text></TouchableOpacity>
                            </Block>
                        </Block>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </SafeAreaView>
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

    commentStyle: {
        color: '#fff',
        fontSize: 20,
        //borderWidth:1,
        //borderColor:"#fff",
        //width:"100%",
    },

    alertMessageButtonStyle: {
        width: '45%',
        height: 30,
        borderRadius: 5,
        backgroundColor: argonTheme.COLORS.ACTIVE, //"rgba(24,34,77,0.8)",//'#B23AFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertMessageButtonStylen: {
        width: '45%',
        height: 30,
        borderRadius: 5,
        backgroundColor: argonTheme.COLORS.ERROR, //"rgba(24,34,77,0.8)",//'#B23AFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        // width: '100%'
    },

    listItem: {
        //width: '100%',
    },

});


const mapStateToProps = ({friendsInActivity}) => ({
    friendsInActivity,
});

const mapDispatchToProps = {
    addFriendsInActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProcess);


