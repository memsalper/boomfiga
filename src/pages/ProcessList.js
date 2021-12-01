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
    KeyboardAvoidingView,
} from 'react-native';
import {Block, theme, Text} from 'galio-framework';
import {Rating} from 'react-native-ratings';
import CustomAlertComponent from '../components/CustomAlertComponent';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconm from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import Iconma from 'react-native-vector-icons/MaterialIcons';


const {width: WIDTH} = Dimensions.get('window');

 const deleteNote=async(id, navigation)=> {
    const response = await axios({
        url: 'http://37.247.98.99:8085/Home/DeleteProcess',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        data: {
            ProcessObjId: id,
        },
    }).then(response => {
        console.log(response);
        if (response.data.IsError) {
            alert(response.data.ErrorMessage);
        } else {
            alert('Başarılı!');
            navigation.goBack();
        }
    });

}

function Item({title, ProcessId, poster, navigation, id, tur, userId, username, image, period, description, NowProcessCount}) {

    let swipeBtns = [{
        text: 'Sil',
        backgroundColor: theme.COLORS.ERROR,
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => {
            deleteNote(id, navigation);
        },
    }];
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
            iconColor = '#676767';
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

    //debugger;

        return (
            <Swipeout right={swipeBtns}
                      autoClose='true'
                      backgroundColor='transparent'>
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
                                <Block row>
                                    <Text color={theme.COLORS.WHITE} size={12} bold> {title} </Text>
                                </Block>
                                {description != null ?
                                    <Text color={theme.COLORS.WHITE} size={12}>{description}</Text> : null}
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
                                {durum ? <Iconm name={'trash-o'} size={25} color="tomato"/> :
                                    <Iconm name={'trash'} size={25} color="tomato"/>}
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Detay', {id: id, tur: tur})}>
                            <Image style={styles.image} source={{uri: poster}}/>
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
            </Swipeout>
        );


}


const alert = (mesaj) => {
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


export class ProcessList extends Component {
    constructor(props) {
        super(props);
        this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);
        this.onPressAlertNegativeButton = this.onPressAlertNegativeButton.bind(this);
        this.state = {
            isAlertVisible: false,
            ad: '',
            rate: 0,
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
        console.log(response);

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
        let {title, veri, navigation, tercih, zaman} = this.props;
        //console.log(ProcessId);
        //console.log(veri);
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
                          renderItem={({item}) =>
                              <Item
                              title={item.ProcessName}
                              ProcessId={item.ProcessId}
                              poster={item.Path}
                              navigation={navigation}
                              id={item.Id}
                              tur={item.ProcessType}
                              userId={item.UserId}
                              username={item.UserName}
                              image={item.UserProfilePhoto}
                              period={item.Period}
                              description={item.Description}
                              NowProcessCount={item.NowProcessCount}
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



