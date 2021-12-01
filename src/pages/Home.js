import React, {Component, useRef, useState} from 'react';

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
    FlatList, TouchableWithoutFeedback, ActivityIndicator,
    RefreshControl, Alert,

} from 'react-native';

import {Picker} from '@react-native-community/picker';
import axios from 'axios';

import {CustomHeader} from '../header/CustomHeader';
import {FilmListesi} from '../components/FilmListesi';
import {DiziListesi} from '../components/DiziListesi';
import {Images, argonTheme} from '../../constants';
import {HeaderHeight} from '../../constants/utils';
import {Block, Text, theme, Button} from 'galio-framework';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import {KitapListesi} from '../components/KitapListesi';
import {FilmListesiAnasayfa} from '../components/FilmListesiAnasayfa';
//import RemotePushController from '../services/RemotePushController';
//import {LocalNotification} from '../services/LocalPushController';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconma from 'react-native-vector-icons/MaterialIcons';


const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const thumbMeasureWidth = (width - 48 - 32) / 6;
const thumbMeasureHeight = thumbMeasureWidth * 1.5;

const {width: WIDTH} = Dimensions.get('window');

function Item({title, poster, navigation, sinif, id, processType, processId, tur, userId, username, image, period, secenek, description, NowProcessCount, likeCount, meLike}) {
    const [count, setCount] = useState(likeCount);

    meLike==0 ? meLike=false : meLike=true;
    const [durum, setDurum] = useState(meLike);
    const like = async() => {
        //console.log(durum);
        durum ? setCount(count - 1) : setCount(count + 1);
        durum ? setDurum(false) : setDurum(true); // bura çalışmıyor.
        //console.log(durum);

        const response = await axios.post('http://37.247.98.99:8085/Home/InsertOrUpdateLike?ProcessId='+processId+'&ProcessType='+processType+'&ProcessObjId='+id+'&UserId='+userId+'&Active='+!meLike);
        console.log(response);

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
                                    userId: userId,
                                    processId: processId,
                                    processObjId: id,
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
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Detay', {id: processId, tur: tur, ProcessName: title})}>
                            <Image style={styles.image}
                                   source={{uri: poster}}/>
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


function Yazdir({img, navigation}) {
    let path = img.Path;
    // debugger;
    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Detay', {
                id: img.ProcessId,
                rate: img.RateAvarage,
                tur: img.ProcessType,
                ProcessName: img.ProcessName,
            })}>
            <Image
                source={{uri: path}}
                key={`viewed-${img.id}`}
                resizeMode="cover"
                style={styles.thumb}
            />
        </TouchableWithoutFeedback>
    );

}

const profileMe = require('../images/pp.jpg');
const aytac = require('../images/aytc1048.jpg');

/*function Bildiri() {
    const notifierRef = useRef();
    return (
        <>
            <Button
                title="Show Notification"
                onPress={() => notifierRef.current?.showNotification({ title: 'Using refs' })}
            />
            <NotifierRoot ref={notifierRef} />
        </>
    );
}*/

export class Home extends Component {
    constructor(props) {
        super(props);
        this.notifierRef = React.createRef();

        this.state = {
            response: [],
            responseGundem: [],
            responseFilm: [],
            responseDizi: [],
            responseKitap: [],
            responseOyun: [],
            responseMuzik: [],
            resizedImageUri: '',
            isVisibleM: true,
            isVisibleS: false,
            selectedValue1: '',
            selectedValue2: 5,
            selectedValue3: '',
            loading: false,
            films: [
                {
                    id: '75780',
                    key: 1,
                    ProcessId: '75780', //jack render
                    Path: '7baSUtFKi8PQ9SLo6ECYBfAW2K8.jpg',
                    ProcessName: 'Jack Reacher: Never Go Back',
                    rate: 2,
                    tur: 1,
                },
                {
                    id: 77862,
                    key: 2,
                    ProcessId: '77862', //anadolu kartalları
                    Path: 'gl0ZSahVEXzXIuMSuIW8DUc1Vz0.jpg',
                    ProcessName: 'anadolu kartalları',
                    rate: 3,
                    tur: 1,
                },
                {
                    id: 57892,
                    key: 3,
                    ProcessId: '57892',
                    Path: 'xml0YlrH8rTUXk5KlBrmvVd7Pdu.jpg',
                    ProcessName: 'Vizontele',
                    rate: 2,
                    tur: 1,
                },
                {
                    id: 92834,
                    key: 4,
                    ProcessId: '92834',
                    Path: 'tVz9z8dXKGr1uebNVFEacpoVpmS.jpg',
                    ProcessName: 'Vizontele Tuuba',
                    rate: 3,
                    tur: 1,
                },
                {
                    id: 27275,
                    key: 5,
                    ProcessId: '27275',
                    Path: 'hXLKHzlybVWloEbfWKZ43APdGUX.jpg',
                    ProcessName: 'G.O.R.A.',
                    rate: 3,
                    tur: 1,
                },
                {
                    id: 24426,
                    key: 6,
                    ProcessId: '24426',
                    Path: 'aSnCAHby29Ij7jJFpkDiWHUVNL4.jpg',
                    ProcessName: 'A.R.O.G',
                    rate: 3,
                    tur: 1,
                },
                {
                    id: 278,
                    key: 7,
                    ProcessId: '278',
                    Path: 'eOZrLKszfq8VOqPUxOVlSLwpY5W.jpg',
                    ProcessName: 'Esaretin Bedeli',
                    rate: 2,
                    tur: 1,
                },
                {
                    id: 629500,
                    key: 8,
                    ProcessId: '629500',
                    Path: 'eGzn3s1vK6eB794xw3RB1tSAuvw.jpg',
                    ProcessName: 'Cinayet Süsü',
                    rate: 3,
                    tur: 1,
                },
                {
                    id: 499461,
                    key: 9,
                    ProcessId: '499461', //anadolu kartalları
                    Path: 'gEEOwKV5laj0O7UEalNdvsY04y0.jpg',
                    ProcessName: 'Ölümlü Dünya',
                    rate: 3,
                    tur: 1,
                },
            ],
            series: [],
            books: [
                {
                    key: 1,
                    ProcessId: '375802', //best_book id dekini id yi al
                    Path: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408303130l/375802._SY160_.jpg',
                    ProcessName: 'Ender’s Game (Ender’s Saga, #1)',
                    rate: 4,
                },
                {
                    key: 2,
                    ProcessId: '44687',
                    Path: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1217735909l/44687._SX98_.jpg',
                    ProcessName: 'Enchanters\' End Game (The Belgariad, #5)',
                    rate: 2,
                },
                {
                    key: 3,
                    ProcessId: '6234357',
                    Path: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1333278270l/6234357._SX98_.jpg',
                    ProcessName: 'Son Ada',
                    rate: 4,
                },
                {
                    key: 4,
                    ProcessId: '6393082',
                    Path: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png',
                    ProcessName: 'Ender\'s Game, Volume 1: Battle School (Ender\'s Saga)',
                    rate: 5,
                },
                {
                    key: 5,
                    ProcessId: '11085413',
                    Path: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1359229737l/11085413._SX98_.jpg',
                    ProcessName: 'Serenad',
                    rate: 5,
                },
            ],
            games: [
                {
                    key: 1,
                    ProcessId: '1372',
                    Path: '//images.igdb.com/igdb/image/upload/t_thumb/co1vce.jpg',
                    ProcessName: 'Counter-Strike: Global Offensive',
                },
            ],

        };

       /* const unsubscribe = this.props.navigation.addListener('focus', () => {
            this._onRefresh();
        });*/
    }


    componentDidMount = async () => {
        /* await messaging().registerDeviceForRemoteMessages();
         await messaging().requestPermission();
         console.log(await messaging().getToken())
         */
        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios.post('http://37.247.98.99:8085/Home/GetUserAndFriendsProcessList?UserId=2&ProcessType=0').catch(err => {
            //console.error(err);
            // alert(err);
            this.setState(prevState => ({
                loading: !prevState.loading,
            }));
        });
        console.log(response);
        this.setState({
            response: response.data,
        });
        //debugger;
        this.setState(prevState => ({
            loading: !prevState.loading,
        }));


        const responseFilm = await axios.post('http://37.247.98.99:8085/Home/GetAgendaList?ProcessType=1');
        //console.log(responseFilm);
        this.setState({
            responseFilm: responseFilm.data,
        });
        const responseDizi = await axios.post('http://37.247.98.99:8085/Home/GetAgendaList?ProcessType=2');
        // console.log(responseFilm);
        this.setState({
            responseDizi: responseDizi.data,
        });
        const responseKitap = await axios.post('http://37.247.98.99:8085/Home/GetAgendaList?ProcessType=3');
        console.log(responseKitap);
        this.setState({
            responseKitap: responseKitap.data,
        });
        const responseOyun = await axios.post('http://37.247.98.99:8085/Home/GetAgendaList?ProcessType=4');
        // console.log(responseFilm);
        this.setState({
            responseOyun: responseOyun.data,
        });
        const responseMuzik = await axios.post('http://37.247.98.99:8085/Home/GetAgendaList?ProcessType=5');
        // console.log(responseFilm);
        this.setState({
            responseMuzik: responseMuzik.data,
        });

        this.setState({
            responseGundem: [...responseFilm.data, ...responseDizi.data, ...responseKitap.data, ...responseOyun.data, ...responseMuzik.data],
        });
        //debugger;

        /* this.setState(prevState => ({
             loading: !prevState.loading,
         }));*/
    };


    handleButtonPress = () => {
        /*PushNotification.localNotification({
            title: "My Notification Title", // (optional)
            message: "My Notification Message", // (required)
            });*/
        LocalNotification();
    };

    secenek = async (itemValue) => {
        // alert(itemValue);
        this.setState(prevState => ({loading: !prevState.loading}));
        /* const response = await axios.post('http://37.247.98.99:8085/Home/GetUserAndFriendsProcessList?UserId=2&ProcessType='+itemValue);
         console.log(response);*/
        this.setState(prevState => ({
            loading: !prevState.loading,
            selectedValue1: itemValue,
            // response:response.data,
        }));
    };


    _onRefresh = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios.post('http://37.247.98.99:8085/Home/GetUserAndFriendsProcessList?UserId=2&ProcessType=0').catch(err => {
            //console.error(err);
            alert(err);
            this.setState(prevState => ({
                loading: !prevState.loading,
            }));
        });
        //console.log(response);
        this.setState({
            response: response.data,
        });
        //debugger;
        this.setState(prevState => ({
            loading: !prevState.loading,
        }));


        const responseFilm = await axios.post('http://37.247.98.99:8085/Home/GetAgendaList?ProcessType=1');
        this.setState({
            responseFilm: responseFilm.data,
        });
        //console.log(responseFilm);
        const responseDizi = await axios.post('http://37.247.98.99:8085/Home/GetAgendaList?ProcessType=2');
        // console.log(responseFilm);
        this.setState({
            responseDizi: responseDizi.data,
        });
        const responseKitap = await axios.post('http://37.247.98.99:8085/Home/GetAgendaList?ProcessType=3');
        // console.log(responseFilm);
        this.setState({
            responseKitap: responseKitap.data,
        });
        const responseOyun = await axios.post('http://37.247.98.99:8085/Home/GetAgendaList?ProcessType=4');
        // console.log(responseFilm);
        this.setState({
            responseOyun: responseOyun.data,
        });
        const responseMuzik = await axios.post('http://37.247.98.99:8085/Home/GetAgendaList?ProcessType=5');
        // console.log(responseFilm);
        this.setState({
            responseMuzik: responseMuzik.data,
        });

        this.setState({
            responseGundem: [...responseFilm.data, ...responseDizi.data, ...responseKitap.data, ...responseOyun.data, ...responseMuzik.data],
        });
    };


    render() {
        let {navigation} = this.props;
        const isVisibleM = this.state.isVisibleM;
        const isVisibleS = this.state.isVisibleS;
        const films = this.state.responseFilm;
        const series = this.state.series;
        const books = this.state.books;
        const {selectedValue1, selectedValue2, selectedValue3, response, responseFilm, responseGundem} = this.state;


       // const {userId} = this.props.route.params;

        //alert(userId);


        /*if (this.state.loading) {
            return <View style={[styles.containerl, styles.horizontal]}><ActivityIndicator size="large" color="#0000ff"/></View>;
        }*/

        // console.log(films);
        return (
            <View style={styles.containerIn}>
                <ImageBackground
                    //source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeader title={'BooMFiGa'} navigation={navigation}/>
                    <View style={{flexDirection: 'column', marginTop: 5, height: thumbMeasureHeight * 1.4}}>
                        <Text size={18} color={theme.COLORS.WHITE} bold>Gündemdeki Film, Dizi, Kitap, Oyun ve
                            Müzikler</Text>
                        {/*<Image
                            style={styles.avatar}
                            source={{uri: this.state.resizedImageUri}}
                        />*/}
                        <SafeAreaView horizontal={true} style={{marginTop: 5}}>
                            <FlatList
                                horizontal={true}
                                data={responseGundem}
                                renderItem={({item}) => <Yazdir img={item} navigation={navigation}/>}
                                keyExtractor={item => item.ProcessId.toString()}
                                // ListHeaderComponent={getHeader}
                                //ListFooterComponent={getFooter}
                            />
                        </SafeAreaView>
                    </View>

                    <Picker
                        style={{width: '100%', color: 'white', marginTop: 5}}
                        selectedValue={this.state.selectedValue1}
                        onValueChange={this.secenek}
                    >

                        <Picker.Item label={'Tümü'} value={0} key={0}></Picker.Item>
                        <Picker.Item label={'Film'} value={1} key={1}></Picker.Item>
                        <Picker.Item label={'Dizi'} value={2} key={2}></Picker.Item>
                        <Picker.Item label={'Kitap'} value={3} key={3}></Picker.Item>
                        <Picker.Item label={'Oyun'} value={4} key={4}></Picker.Item>
                        <Picker.Item label={'Müzik'} value={5} key={5}></Picker.Item>
                    </Picker>


                    <SafeAreaView style={{flex: 1, width: '100%', paddingBottom: HeaderHeight}}>
                        {/* <FilmListesiAnasayfa title={'Filmler'} veri={response} secenek={this.state.selectedValue1} navigation={navigation} tercih={false}
                                                 zaman={true}/>*/}
                        <FlatList style={{width: '100%'}}
                                  data={response}
                                  renderItem={({item}) => <Item title={item.ProcessName} poster={item.Path}
                                                                navigation={navigation} sinif={this}
                                                                id={item.Id}
                                                                processType={item.ProcessType}
                                                                processId={item.ProcessId}
                                                                tur={item.ProcessType}
                                                                userId={item.UserId}
                                                                username={item.UserName}
                                                                image={item.UserProfilePhoto}
                                                                period={item.Period}
                                                                description={item.Description}
                                                                NowProcessCount={item.NowProcessCount}
                                                                likeCount={item.LikeCount}
                                                                meLike={item.MeLike}
                                                                secenek={this.state.selectedValue1}
                                  />}
                                  keyExtractor={item => item.Id.toString()}
                                  refreshControl={<RefreshControl refreshing={this.state.loading}
                                                                  onRefresh={this._onRefresh}/>}

                        />
                    </SafeAreaView>
                </ImageBackground>
            </View>
        );

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 2,
        marginTop: 5,
    },
    containerIn: {
        backgroundColor: 'white',
        flex: 1,
    },
    txtIn: {
        width: WIDTH - 140,
        borderWidth: 2,
        borderRadius: 5,
        height: 50,
    },
    buton: {
        width: WIDTH - 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'red',
        marginTop: 10,

    },
    item: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)', // '#28C6DB', // '#f9c2ff',
        justifyContent: 'flex-start',
        flex: 1,
        margin: 5,
        flexDirection: 'row',
    },
    image: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    ProcessName: {
        width: '70%',
        textAlignVertical: 'center',
        padding: 10,
        color: '#000',
    },
    profileContainer: {
        width: width,
        height: height,
        alignItems: 'center',
    },
    profileBackground: {
        width: width,
        height: height,
        backgroundColor: '#101b1f',//"#0e1014", //theme.COLORS.BLACK,
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        marginLeft: 4,
        alignSelf: 'center',
        width: thumbMeasureWidth,
        height: thumbMeasureHeight,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 62,
        borderWidth: 0,
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
