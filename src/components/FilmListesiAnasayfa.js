import React, {Component, useState} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Alert,
    Button,
    KeyboardAvoidingView, ScrollView, RefreshControl, ImageBackground,SafeAreaView
} from 'react-native';
import {Block, theme, Text} from 'galio-framework';
import {argonTheme} from '../../constants';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CustomAlertComponent from '../components/CustomAlertComponent';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconm from 'react-native-vector-icons/FontAwesome';
import Iconma from 'react-native-vector-icons/MaterialIcons';


const {width: WIDTH} = Dimensions.get('window');


function Item({title, poster, navigation, sinif, id, tur, userId, username, image, period, secenek, description, NowProcessCount}) {
    const [count, setCount] = useState(0);
    const [durum, setDurum] = useState(false);
    const like = () => {
        durum ? setCount(count - 1) : setCount(count + 1);
        durum ? setDurum(false) : setDurum(true);
    };
    let iconName;
    let iconColor;
    let header;
    let sec = false;
    let userTur = 1;
    switch (tur) {
        case 1:
            iconName = 'movie';
            header = 'İzleyiciler';
            iconColor = '#676767';
            sec = false;
            break;
        case 2:
            iconName = 'movie';
            header = 'İzleyiciler';
            iconColor = "#676767";
            sec = false;
            break;
        case 3:
            iconName = 'book';
            header = 'Okurlar';
            iconColor = '#FAE997';
            sec = true;
            break;
        case 4:
            iconName = 'gamepad';
            header = 'Oyuncular';
            iconColor = '#FF6666';
            sec = true;
            break;
        case 5:
            iconName = 'music';
            header = 'Dinleyiciler';
            iconColor = theme.COLORS.ERROR;
            sec = true;
            break;
        default:
            iconName = 'file-movie-o';
            header = '?';
    }




    if (secenek == 0 || secenek == tur) {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Audience', {header: header, title: title, tur: tur})}>
                <Block middle row style={{width: '100%'}}>
                    <Block flex row space="between" style={{paddingLeft: 5}}>
                        <Block style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ProfilDiger', {
                                    userid: userId,
                                    tur: userTur,
                                    username: username,
                                })}>
                                <Block style={{marginRight: 5, marginTop: 8}}>
                                    <Image
                                        source={{uri: 'data:image/jpeg;base64,' + image}}
                                        style={styles.avatar}
                                    />
                                </Block>
                            </TouchableOpacity>
                            <Block>
                                <Text color={'#dee2e6'}>{username}</Text>
                                <Block row left style={{flexWrap: 'wrap'}}>
                                    <Text color={theme.COLORS.WHITE} size={12} bold> {title} </Text>
                                </Block>
                                {description != null ?
                                    <Block row left style={{flexWrap: 'wrap'}}>
                                        <Text color={theme.COLORS.WHITE} size={12}>{description}</Text>
                                    </Block> : null}
                                <TouchableOpacity onPress={() => navigation.navigate('Begenenler', {
                                    userid: userId,
                                    tur: userTur,
                                    username: username,
                                })}>
                                    <Block row style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                                        <Icon name={'ios-heart'} size={12} color="tomato"
                                              style={{marginLeft: 5, marginRight: 5}}/>
                                        <Text color={theme.COLORS.WHITE} size={10} bold>{count}</Text>
                                        {sec ? <Iconm name={iconName} size={15} color={iconColor}
                                                      style={{marginLeft: 5, marginRight: 5, marginTop: 2}}/> :
                                            <Iconma name={iconName} size={15} color={iconColor}
                                                    style={{marginLeft: 5, marginRight: 5, marginTop: 2}}/>}
                                    </Block>
                                </TouchableOpacity>
                                <Text color={theme.COLORS.GREY} size={12}>{period}</Text>
                                {NowProcessCount != 0 ? <Text color={theme.COLORS.WHITE} size={10}
                                                              bold>{NowProcessCount} Diğerleri</Text> : null}
                            </Block>
                        </Block>
                    </Block>
                    <Block row style={{justifyContent: 'center', alignItems: 'center', paddingRight: 5}}>
                        <TouchableOpacity onPress={like}>
                            <Block middle style={{padding: 12}}>
                                {/*<Icon name={'ios-heart-empty'} size={30} color="red" /><Text size={12}>2</Text>*/}
                                {durum ? <Icon name={'ios-heart'} size={25} color="tomato"/> :
                                    <Icon name={'ios-heart-empty'} size={25} color="tomato"/>}
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Detay', {id: id, tur: tur, ProcessName: title})}>
                            <Image style={styles.image}
                                   source={{uri: poster }}/>
                        </TouchableOpacity>
                    </Block>
                </Block>
                <Block middle style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 5,
                }}>
                    <Block style={styles.divider}/>
                </Block>
            </TouchableOpacity>
        );
    } else {
        return null;
    }


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

function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
}


function arttir() {
    return (
        <Rating
            type={'custom'}
            startingValue={0}
            ratingCount={5}
            imageSize={30}
            onFinishRating={ratingCompleted}
            style={{paddingVertical: 10}}
        />
    );
}


export class FilmListesiAnasayfa extends Component {
    constructor(props) {
        super(props);
        this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);
        this.onPressAlertNegativeButton = this.onPressAlertNegativeButton.bind(this);
        this.state = {
            isAlertVisible: false,
            ad: '',
            rate: 0,
            loading:false,
        };
    }

    onPressAlertPositiveButton = async () => {

        let InsertProcess = [{
            Description: 'safsafas',
            Path: 'safsafas',
            ProcessId: 5,
            ProcessName: 'safsa',
            ProcessType: 1,
            Rate: 3,
            UserId: 1,
        }];

        /* let url = 'http://37.247.98.99:8085/Home/InsertProcess?UserId=1';

         const response = await axios.post( url);
         console.log(response);*/
        const response = await axios.post('http://37.247.98.99:8085/Home/InsertProcess?UserId=1&Description=safsafas&Path=safsas&ProcessId=5&ProcessName=safas&ProcessType=1&Rate=3');
        //console.log(response);

        /*const fakeData = [ { fake: 'data' } ];
        const url = 'http://192.168.90.251:8764/common/dotLogController/sendLog';
        axios.post(url, {
            topic: 'topic',
            logs: fakeData, // look ma, no JSON.stringify()!
        });*/

        this.setState({
            isAlertVisible: false,
        });
    };


    /*onPressAlertPositiveButton = () => {
        //alert('Positive Button Clicked');
        this.setState({
            isAlertVisible: false,
        })
    };*/

    onPressAlertNegativeButton = () => {
        // alert('Negative Button Clicked');
        this.setState({
            isAlertVisible: false,
        });
    };



    render() {
        let {title, veri, navigation, tercih, zaman, secenek} = this.props;
        // console.log(veri);
        return (
            <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                {tercih ?
                    <View style={{
                        width: '97%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#18224D',
                        borderRadius: 5,
                    }}>
                        <Text style={{fontSize: 16, color: theme.COLORS.WHITE}}>{title}</Text>
                    </View>
                    : null}
                <FlatList style={{width: '100%'}}
                          data={veri}
                          renderItem={({item}) => <Item title={item.ProcessName} poster={item.Path}
                                                        navigation={navigation} sinif={this} id={item.ProcessId}
                                                        tur={item.ProcessType}
                                                        userId={item.UserId}
                                                        username={item.UserName}
                                                        image={item.UserProfilePhoto}
                                                        period={item.Period}
                                                        description={item.Description}
                                                        NowProcessCount={item.NowProcessCount}
                                                        secenek={secenek}
                          />}
                          keyExtractor={item => item.Id.toString()}

                />


                <CustomAlertComponent
                    displayAlert={this.state.isAlertVisible}
                    displayRateAndComment={zaman}
                    rate={zaman ? 0 : this.state.rate}
                    displayAlertIcon={true}
                    alertTitleText={zaman ? 'Puanla ve Kaydet' : 'Şuan İzliyorum'}
                    alertMessageText={this.state.ad}
                    displayPositiveButton={true}
                    positiveButtonText={zaman ? 'İZLEDİM' : 'İZLİYORUM'}
                    displayNegativeButton={true}
                    negativeButtonText={zaman ? 'VAZGEÇ' : 'VAZGEÇ'}
                    onPressPositiveButton={this.onPressAlertPositiveButton}
                    onPressNegativeButton={this.onPressAlertNegativeButton}
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
        width: 60,
        height: 60,
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
    },
    divider: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#182227', //"#2f1b1f", //"#101b1f", //'#0e1014', //'#E9ECEF',
    },

});



