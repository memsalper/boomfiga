import React, {Component} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Button,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ImageBackground,
    Dimensions,
    Text,
    FlatList,
    RefreshControl,

} from 'react-native';

import {Picker} from '@react-native-community/picker';
import axios from 'axios';

import {CustomHeader} from '../header/CustomHeader';
import {FilmListesi} from '../components/FilmListesi';
import {DiziListesi} from '../components/DiziListesi';
import {Images, argonTheme} from '../../constants';
import {HeaderHeight} from '../../constants/utils';
import {Block, theme} from 'galio-framework';
import {KitapListesi} from '../components/KitapListesi';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import {OyunListesi} from '../components/OyunListesi';
import CustomAlertComponent from '../components/CustomAlertComponent';
import {MuzikListesi} from '../components/MuzikListesi';


const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const {width: WIDTH} = Dimensions.get('window');

export class Top extends Component {
    constructor(props) {
        super(props);
        this.onPressFilmButton = this.onPressFilmButton.bind(this);
        this.state = {
            films: [
                {
                    id: 75780,
                    key: 1,
                    filmId: '75780', //jack render
                    poster_path: '7baSUtFKi8PQ9SLo6ECYBfAW2K8.jpg',
                    title: 'Jack Reacher: Never Go Back',
                    rate: 2,
                    tur: 1,
                },
                {
                    id: 77862,
                    key: 2,
                    filmId: '77862', //anadolu kartalları
                    poster_path: 'gl0ZSahVEXzXIuMSuIW8DUc1Vz0.jpg',
                    title: 'anadolu kartalları',
                    rate: 3,
                    tur: 1,
                },
                {
                    id: 57892,
                    key: 3,
                    filmId: '57892',
                    poster_path: 'xml0YlrH8rTUXk5KlBrmvVd7Pdu.jpg',
                    title: 'Vizontele',
                    rate: 2,
                    tur: 1,
                },
                {
                    id: 92834,
                    key: 4,
                    filmId: '92834',
                    poster_path: 'tVz9z8dXKGr1uebNVFEacpoVpmS.jpg',
                    title: 'Vizontele Tuuba',
                    rate: 3,
                    tur: 1,
                },
                {
                    id: 27275,
                    key: 5,
                    filmId: '27275',
                    poster_path: 'hXLKHzlybVWloEbfWKZ43APdGUX.jpg',
                    title: 'G.O.R.A.',
                    rate: 3,
                    tur: 1,
                },
                {
                    id: 24426,
                    key: 6,
                    filmId: '24426',
                    poster_path: 'aSnCAHby29Ij7jJFpkDiWHUVNL4.jpg',
                    title: 'A.R.O.G',
                    rate: 3,
                    tur: 1,
                },
                {
                    id: 278,
                    key: 7,
                    filmId: '278',
                    poster_path: 'eOZrLKszfq8VOqPUxOVlSLwpY5W.jpg',
                    title: 'Esaretin Bedeli',
                    rate: 2,
                    tur: 1,
                },
                {
                    id: 629500,
                    key: 8,
                    filmId: '629500',
                    poster_path: 'eGzn3s1vK6eB794xw3RB1tSAuvw.jpg',
                    title: 'Cinayet Süsü',
                    rate: 3,
                    tur: 1,
                },
                {
                    id: 499461,
                    key: 9,
                    filmId: '499461', //anadolu kartalları
                    poster_path: 'gEEOwKV5laj0O7UEalNdvsY04y0.jpg',
                    title: 'Ölümlü Dünya',
                    rate: 3,
                    tur: 1,
                },
            ],
            series: [],
            books: [
                {
                    key: 1,
                    id: 375802, //best_book id dekini id yi al
                    poster_path: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408303130l/375802._SY160_.jpg',
                    title: 'Ender’s Game (Ender’s Saga, #1)',
                    rate: 4,
                },
                {
                    key: 2,
                    id: 44687,
                    poster_path: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1217735909l/44687._SX98_.jpg',
                    title: 'Enchanters\' End Game (The Belgariad, #5)',
                    rate: 2,
                },
                {
                    key: 3,
                    id: 6234357,
                    poster_path: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1333278270l/6234357._SX98_.jpg',
                    title: 'Son Ada',
                    rate: 4,
                },
                {
                    key: 4,
                    id: 6393082,
                    poster_path: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png',
                    title: 'Ender\'s Game, Volume 1: Battle School (Ender\'s Saga)',
                    rate: 5,
                },
                {
                    key: 5,
                    id: 11085413,
                    poster_path: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1359229737l/11085413._SX98_.jpg',
                    title: 'Serenad',
                    rate: 5,
                },
            ],
            games: [
                {
                    key: 1,
                    id: 1372,
                    poster_path: '//images.igdb.com/igdb/image/upload/t_thumb/co1vce.jpg',
                    title: 'Counter-Strike: Global Offensive',
                },
            ],
            isVisibleB: false,
            isVisibleM: true,
            isVisibleS: false,
            isVisibleO: false,
            isVisibleMu: false,
            selectedValue: 1,
            selectedValue1: 0,
            selectedValue2: 5,
            selectedValue3: 0,
            isAlertVisible: false,
            title: '',
            poster: '',
            rate: '',
            id: null,
            tur: null,
            buttonText: '',
            response: [],
            loading: false,

        };

        /*const unsubscribe = this.props.navigation.addListener('focus', () => {
            this._onRefresh(1,0);
        });*/
    }

    componentDidMount = async () => {
        /* await messaging().registerDeviceForRemoteMessages();
         await messaging().requestPermission();
         console.log(await messaging().getToken())
         */
        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios.post('http://37.247.98.99:8085/Home/GetToplList?userId=2&processType=' + this.state.selectedValue + '&tense=' + this.state.selectedValue1 + '&limit=' + this.state.selectedValue2 + '&userType=' + this.state.selectedValue3).catch(err => {
            this.setState(prevState => ({
                loading: !prevState.loading,
            }));
            console.log(err);
        });
       // console.log(response);
        this.setState({
            response: response.data,
        });
        //debugger;
        this.setState(prevState => ({
            loading: !prevState.loading,
        }));


    };



    onPressFilmButton = (id, title, poster, rate, tur) => {

        let buttonText = '';


        switch (tur) {
            case 1:
                buttonText = this.state.tercih ? 'İZLEDİM' : 'İZLİYORUM';
                break;
            case 2:
                buttonText = this.state.tercih ? 'İZLEDİM' : 'İZLİYORUM';
                break;
            case 3:
                buttonText = this.state.tercih ? 'OKUDUM' : 'OKUYORUM';
                break;
            case 4:
                buttonText = this.state.tercih ? 'OYNADIM' : 'OYNUYORUM';
                break;
            default:
                buttonText = 'TAMAM';
        }


        this.setState({
            id: id,
            title: title,
            poster: poster,
            rate: rate,
            tur: tur,
            isAlertVisible: true,
            buttonText: buttonText,
        });


    };

    onPressAlertPositiveButton = async (rate) => {
        const response = await axios({
            url: 'http://37.247.98.99:8085/Home/InsertProcess',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                UserId: 2,
                Description: 'aa',
                Path: this.state.poster,
                ProcessId: this.state.id,
                ProcessName: this.state.title,
                ProcessType: this.state.tur,
                Rate: 2,
            },
        });
       // console.log(response);

        /* const fakeData = [ { fake: 'data' } ];
         const url = 'http://192.168.90.251:8764/common/dotLogController/sendLog';
         axios.post(url, {
             topic: 'topic',
             logs: fakeData, // look ma, no JSON.stringify()!
         });*/

        this.setState({
            isAlertVisible: false,
        });
    };

    onPressAlertNegativeButton = () => {
        // alert('Negative Button Clicked');
        this.setState({
            isAlertVisible: false,
        });
    };


    degistir = async (itemValue) => {
        if (itemValue === 1) {
            this.setState({
                selectedValue: itemValue,
                isVisibleM: true,
                isVisibleS: false,
                isVisibleB: false,
                isVisibleO: false,
                isVisibleMu: false,
            });
        } else if (itemValue === 2) {
            this.setState({
                selectedValue: itemValue,
                isVisibleM: false,
                isVisibleS: true,
                isVisibleB: false,
                isVisibleO: false,
                isVisibleMu: false,
            });
        } else if (itemValue === 3) {
            this.setState({
                selectedValue: itemValue,
                isVisibleM: false,
                isVisibleS: false,
                isVisibleB: true,
                isVisibleO: false,
                isVisibleMu: false,
            });
        } else if (itemValue === 4) {
            this.setState({
                selectedValue: itemValue,
                isVisibleM: false,
                isVisibleS: false,
                isVisibleB: false,
                isVisibleO: true,
                isVisibleMu: false,
            });
        } else {
            this.setState({
                selectedValue: itemValue,
                isVisibleM: false,
                isVisibleS: false,
                isVisibleB: false,
                isVisibleO: false,
                isVisibleMu: true,
            });
        }

        this._onRefresh(itemValue,0);
    };

    _onRefresh = async (itemValue,index) => {
        /* await messaging().registerDeviceForRemoteMessages();
        await messaging().requestPermission();
        console.log(await messaging().getToken())
        */

        const processType = index==0 ? itemValue : this.state.selectedValue;
        const tense =index==1 ? itemValue : this.state.selectedValue1;
        const limit =index==2 ? itemValue : this.state.selectedValue2;
        const userType =index==3 ? itemValue : this.state.selectedValue3;


        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios.post('http://37.247.98.99:8085/Home/GetToplList?userId=2&processType=' + processType + '&tense=' + tense + '&limit=' + limit + '&userType=' + userType).catch(err => {
            this.setState(prevState => ({
                loading: !prevState.loading,
            }));
            console.log(err);
        });
        //console.log(response);
        this.setState({
            response: response.data,
        });
        //debugger;
        this.setState(prevState => ({
            loading: !prevState.loading,
        }));

        //debugger;
    };

    render() {
        let {navigation} = this.props;
        const isVisibleM = this.state.isVisibleM;
        const isVisibleS = this.state.isVisibleS;
        const isVisibleB = this.state.isVisibleB;
        const isVisibleO = this.state.isVisibleO;
        const isVisibleMu = this.state.isVisibleMu;
        const films = this.state.films;
        const series = this.state.series;
        const books = this.state.books;
        const games = this.state.games;
        const {selectedValue1, selectedValue2, selectedValue3} = this.state;


        //console.log(this.state.response);
        return (
            <View style={styles.containerIn}>
                <ImageBackground
                    //source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeader title={'Top Listeler'} navigation={navigation}/>
                    <View style={{backgroundColor: '#182227'}}>
                        <Block row middle width={width} style={{justifyContent: 'center'}}>
                            {isVisibleM ? <Iconm name={'movie'} size={25} color={theme.COLORS.WHITE}/> : null}
                            {isVisibleS ? <Iconm name={'movie'} size={25} color={theme.COLORS.WHITE}/> : null}
                            {isVisibleO ? <Icon name={'gamepad'} size={25} color={theme.COLORS.WHITE}/> : null}
                            {isVisibleB ? <Icon name={'book'} size={25} color={theme.COLORS.WHITE}/> : null}
                            {isVisibleMu ? <Icon name={'music'} size={25} color={theme.COLORS.WHITE}/> : null}
                            <Picker
                                style={{width: '50%', height: 30, color: 'white'}}
                                selectedValue={this.state.selectedValue}
                                onValueChange={this.degistir}>

                                <Picker.Item label={'Filmler'} value={1} key={1}></Picker.Item>
                                <Picker.Item label={'Diziler'} value={2} key={2}></Picker.Item>
                                <Picker.Item label={'Kitaplar'} value={3} key={3}></Picker.Item>
                                <Picker.Item label={'Oyunlar'} value={4} key={4}></Picker.Item>
                                <Picker.Item label={'Müzikler'} value={5} key={5}></Picker.Item>
                            </Picker>
                        </Block>
                        <Block row>
                            <Picker
                                style={{height: 30, width: '32%', color: 'white'}}
                                selectedValue={this.state.selectedValue1}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({selectedValue1: itemValue});
                                    this._onRefresh(itemValue,1);
                                 }

                                }
                            >

                                <Picker.Item label={'Şuan (son 24 saat)'} value={0} key={0}></Picker.Item>
                                <Picker.Item label={'Geçmiş'} value={1} key={1}></Picker.Item>
                            </Picker>
                            <Picker
                                style={{height: 30, width: '32%', color: 'white'}}
                                selectedValue={this.state.selectedValue2}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({selectedValue2: itemValue});
                                    this._onRefresh(itemValue,2);
                                }

                                }>

                                <Picker.Item label={'Top5'} value={5} key={0}></Picker.Item>
                                <Picker.Item label={'Top10'} value={10} key={1}></Picker.Item>
                            </Picker>
                            <Picker
                                style={{height: 30, width: '36%', color: 'white'}}
                                selectedValue={this.state.selectedValue3}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({selectedValue3: itemValue});
                                    this._onRefresh(itemValue,3);
                                }

                                }>

                                <Picker.Item label={'Arkadaşlar ve Takip Ettiklerin'} value={'Arkadaşlar'}
                                             key={0}></Picker.Item>
                                <Picker.Item label={'Türkiye'} value={1} key={1}></Picker.Item>
                                <Picker.Item label={'Ankara'} value={2} key={2}></Picker.Item>
                                <Picker.Item label={'İstanbul'} value={3} key={3}></Picker.Item>
                                <Picker.Item label={'İzmir'} value={4} key={4}></Picker.Item>
                            </Picker>
                        </Block>

                    </View>
                    <ScrollView style={{flex: 1, width: '100%', marginBottom: HeaderHeight * 1.2}}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.loading}
                                        onRefresh={this._onRefresh}
                                    />}
                    >
                        {
                            isVisibleM ?
                                <FilmListesi title={'Filmler'} veri={this.state.response}
                                             navigation={navigation} tercih={false} zaman={true}
                                             onPressFilmButton={this.onPressFilmButton} topList={true}/>
                                :
                                null
                        }
                        {
                            isVisibleS ?
                                <DiziListesi title={'Diziler'} veri={this.state.response} navigation={navigation}
                                             onPressFilmButton={this.onPressFilmButton} topList={true}/>
                                :
                                null
                        }
                        {
                            isVisibleB ?
                                <KitapListesi title={'Kitaplar'} veri={this.state.response}
                                              navigation={navigation} zaman={true}
                                              onPressFilmButton={this.onPressFilmButton} topList={true}/>
                                :
                                null
                        }
                        {
                            isVisibleO ?
                                <OyunListesi title={'Oyunlar'} veri={this.state.response}
                                             navigation={navigation} zaman={true}
                                             onPressFilmButton={this.onPressFilmButton} topList={true}/>
                                :
                                null
                        }
                        {
                            isVisibleMu ?
                                <MuzikListesi title={'Muzikler'} veri={this.state.response}
                                             navigation={navigation} zaman={true}
                                             onPressFilmButton={this.onPressFilmButton} topList={true}/>
                                :
                                null
                        }
                    </ScrollView>
                    <CustomAlertComponent
                        displayAlert={this.state.isAlertVisible}
                        displayRateAndComment={this.state.tercih}
                        rate={this.state.tercih ? 0 : this.state.rate}
                        displayAlertIcon={true}
                        alertTitleText={this.state.tercih ? 'Puanla ve Kaydet' : 'Şuan'}
                        alertMessageText={this.state.title}
                        displayPositiveButton={true}
                        positiveButtonText={this.state.buttonText}
                        displayNegativeButton={true}
                        negativeButtonText={'VAZGEÇ'}
                        onPressPositiveButton={this.onPressAlertPositiveButton}
                        onPressNegativeButton={this.onPressAlertNegativeButton}
                    />
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
        width: 100,
        height: 100,
        margin: 7,
        borderRadius: 7,
    },
    title: {
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
        backgroundColor: '#101b1f',
    },

});
