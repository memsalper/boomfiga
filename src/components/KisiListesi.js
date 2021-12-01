import React, {Component, useEffect, useState} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Alert,
    KeyboardAvoidingView,
} from 'react-native';
import {Block, theme, Button, Text} from 'galio-framework';
import {argonTheme} from '../../constants';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CustomAlertComponent from '../components/CustomAlertComponent';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Users} from '../pages/Users';


const {width: WIDTH} = Dimensions.get('window');

let kisiler = [];



const ekle = async ( userme,  userid) => {
    this.setState(prevState => ({loading: !prevState.loading}));
    await axios({
        url: 'http://37.247.98.99:8085/Home/AddFriend',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        data: {
            AddUserId: userme,
            AddedUserId: userid,
            StatuType: 0,
        },
    }).then(response => {
            console.log(response);
        },
    );
    this.setState(prevState => ({loading: !prevState.loading}));
};
 const kaldir = async ( userme,  userid) => {
    this.setState(prevState => ({loading: !prevState.loading}));
    await axios({
        url: 'http://37.247.98.99:8085/Home/DeleteFriends',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        data: {
            UserId: userme,
            FriendsId : userid,
        },
    }).then(response => {
            console.log(response);
        },
    );
    this.setState(prevState => ({loading: !prevState.loading}));
};


function Item({navigation, sinif, userId, username, image, tur, tercih, processId, kisiSayisi}) {
    const [count, setCount] = useState(0);
    const [durum, setDurum] = useState(false);
    useEffect(() => {
        // setDurum(false);

        /*kisiler.map((process, key) => {
            if(process.username.toString()==="mmsalper")
                alert("alper");
        })*/
        //console.log('itemliste');
        //console.log(kisiler);
        if (tercih) {
            if (kisiler.length != 0) {
                for (let i = 0; i < kisiSayisi; i++) {
                    if (kisiler[i] != null) {
                        if (kisiler[i].username == username && kisiler[i].processId == processId) {
                            setDurum(true);
                            console.log('eşleşti');
                        }
                    }

                }
            }
        }
        //debugger;
    }, []);


    const choose = () => {
        durum ? setDurum(false) : setDurum(true);
        durum ? setCount(count - 1) : setCount(count + 1);
        if (count == 0) {
            kisiler.push({userId: userId, username: username, processId: processId, durum: true});
        }
        if (count != 0 && !durum) {
            for (let i = 0; i < kisiSayisi; i++) {
                if (kisiler[i].username != username && kisiler[i].processId != processId) {
                    kisiler.push({userId: userId, username: username, processId: processId, durum: true});
                }
            }
        } else if (durum) {
            /*let index = kisiler.findIndex((item) => item.username === username);
            if (index !== -1) kisiler.splice(index, 1);*/
            kisiler = kisiler.filter(kisi => username != kisi.username);
            //debugger;
        }
        // durum ? kisiler = kisiler.array.splice(index, 1): null;
        //durum ? kisiler = kisiler.filter(kisi => username != kisi.username && processId != kisi.processId) : null;

    };

    const git = () => {
        alert('alper');
    };

    const renderSwitch = (param) => {
        switch (param) {
            case 0:
                return <Block col middle>
                    <Button color={theme.COLORS.ERROR} style={{width: 105, height: 30}}
                            onPress={kaldir(2,userId)}><Text color={'#fff'} size={12} bold>Kaldır</Text></Button>
                </Block>;
            case 1:
                return <Block col middle>
                    <Block row>
                        <Button color={theme.COLORS.ERROR} style={{width: 50, height: 30, marginRight: 5}}
                                onPress={kaldir(2,userId)}><Text color={'#fff'} size={12} bold>Kaldır</Text></Button>
                        <Button color={'#11CDEF'} style={{width: 50, height: 30}}
                                onPress={ekle(2,userId)}><Text color={'#fff'} size={12} bold>Ekle</Text></Button>
                    </Block>
                </Block>;
            case 2:
                return <Block middle>
                    <Button color={theme.COLORS.ERROR} style={{width: 105, height: 30}}
                            onPress={kaldir(2,userId)}><Text color={'#fff'} size={12} bold>Kaldır</Text></Button>
                </Block>;
            default:
                return <Block>
                    <Button color={'#11CDEF'} style={{width: 105, height: 30}}
                            onPress={ekle(2,userId)}><Text color={'#fff'} size={12} bold>Ekle</Text></Button>
                </Block>;
        }
    };


    return (
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
                    userme: 2,
                    userid: userId,
                    tur: tur,
                    username: username,
                })}>
                <Block style={{marginRight: 5}}>
                    <Image
                        source={{uri: 'data:image/jpeg;base64,' + image}}
                        style={styles.avatar}
                    />
                </Block>
                <Block>
                    <Text color={theme.COLORS.WHITE} bold>{username}</Text>
                </Block>
            </TouchableOpacity>
            <Block right style={{width: '35%'}}>
                {tercih ?
                    <TouchableOpacity
                        onPress={choose}>
                        <Icon name={durum ? 'checkbox-marked-circle' : 'checkbox-marked-circle-outline'} size={30}
                              color={durum ? 'green' : theme.COLORS.WHITE}/>
                    </TouchableOpacity>
                    :
                    renderSwitch(tur)

                }
            </Block>
        </Block>
    );

}


const alert = () => {
    Alert.alert(
        'Alert Title',
        'message',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
    );
};


export default class KisiListesi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlertVisible: false,
            ad: '',
            rate: 0,
        };
    }


    onayla = () => {
        //this.props.navigation.goBack({kisiler:kisiler});//navigation.goBack(kisiler);
        //alert(kisiler);
        console.log('kisilistesi');
        console.log(kisiler);
        this.props.navigation.navigate('AddProcess', {kisiler: kisiler});
        // debugger;
        //this.props.navigation.goBack();
        //this.props.navigation.route.params.secilenler({ kisiler: kisiler });
        //console.log(this.props.friendsInActivity);
    };

    /*goBack() {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onSelect({ selected: true });
    }*/


    render() {
        let {title, veri, navigation, tercih, processId} = this.props;
        //console.log(veri);
        return (
            <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>

                {tercih ?
                    <Block middle style={{width: '100%'}}>
                        <Button color={'#11CDEF'} style={{width: 105, height: 30}}
                                onPress={this.onayla}><Text color={'#fff'} size={12} bold>Dahil Et</Text></Button>
                    </Block>
                    : null
                }
                <FlatList style={{width: '100%'}}
                          data={veri}
                          renderItem={({item}) => <Item navigation={navigation}
                                                        sinif={this}
                                                        userId={item.UserId}
                                                        userFriendsId={item.UserFriendsId}
                                                        username={item.UserName}
                                                        image={item.UserProfilePhoto}
                                                        tur={item.StatuType}
                                                        tercih={tercih}
                                                        processId={processId}
                                                        kisiSayisi={veri.length}
                          />}
                          keyExtractor={item => item.UserFriendsId.toString()}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    item: {
        width: '94%',
        marginLeft: '3%',
        backgroundColor: '#101b1f',//"#0e1014",//'#000000',//'rgba(66,76,88,0.7)', //'#15BDD8', // '#28C6DB', // '#f9c2ff', //rgba(52, 52, 52, 0.7) //rgba(24,34,77,0.8)
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: 10,
        flexDirection: 'column',
        //shadowColor: theme.COLORS.BLACK,
        //shadowOffset: {width: 0, height: 2},
        //shadowRadius: 4,
        //shadowOpacity: 0.1,
        //elevation: 2,
        //borderRadius: 5,
    },
    image: {
        resizeMode: 'contain',
        width: 40,
        height: 65,
        borderRadius: 5,
    },
    title: {
        width: '70%',
        textAlignVertical: 'center',
        color: '#000',
    },
    cardDescription: {
        padding: theme.SIZES.BASE / 2,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 62,
        borderWidth: 0,
        marginLeft: 5,
    },
    divider: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#182227', //"#2f1b1f", //"#101b1f", //'#0e1014', //'#E9ECEF',
    },

});




