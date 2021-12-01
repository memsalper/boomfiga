import React, {Component, useState} from 'react';
import {DiziListesi} from '../components/DiziListesi';
import {FilmListesi} from '../components/FilmListesi';
import {CustomHeader} from '../header/CustomHeader';
//import SearchBar from 'react-native-search-bar';
import {connect} from 'react-redux';
import {getMovie, getSeries} from '../../reducer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconma from 'react-native-vector-icons/MaterialIcons';


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
    KeyboardAvoidingView, Alert,

} from 'react-native';

import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {parseString} from 'react-native-xml2js';
import {KitapListesi} from '../components/KitapListesi';

import {Block, theme, Input, Button, Text} from 'galio-framework';

import {Images, argonTheme} from '../../constants';
import {HeaderHeight} from '../../constants/utils';
import {OyunListesi} from '../components/OyunListesi';
import CustomAlertComponent from '../components/CustomAlertComponent';
import {MuzikListesi} from '../components/MuzikListesi';
import qs from 'qs';


const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const {width: WIDTH} = Dimensions.get('window');


class Add extends Component {
    constructor(props) {
        super(props);
        this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);
        this.onPressAlertNegativeButton = this.onPressAlertNegativeButton.bind(this);
        this.onPressFilmButton = this.onPressFilmButton.bind(this);
        this.buyut = this.buyut.bind(this);

        this.state = {
            film: '',
            films: [],
            series: [],
            book: '',
            books: [],
            isVisibleM: false,
            isVisibleS: false,
            isVisibleB: false,
            tercih: false,
            loading: false,
            isVisibleG: false,
            game: '',
            games: [],
            isAlertVisible: false,
            title: '',
            poster: '',
            rate: '',
            id: null,
            tur: null,
            buttonText: '',
            size: '25%',
            music: '',
            musics: [],
            isVisibleMu: false,


        };
    }


    /* ara = () => {
         this.props.getMovie(this.state.title);
         this.props.getSeries(this.state.title);
         this.setState({
             isVisibleB: false,
         });
     };*/

    onPressFilmButton = (id, title, poster, rate, tur) => {

        let buttonText = '';


        switch (tur) {
            case 1:
                buttonText = this.state.tercih ? 'İzledim' : 'İzliyorum';
                break;
            case 2:
                buttonText = this.state.tercih ? 'İzledim' : 'İzliyorum';
                break;
            case 3:
                buttonText = this.state.tercih ? 'Okudum' : 'Okuyorum';
                break;
            case 4:
                buttonText = this.state.tercih ? 'Oynadım' : 'Oynuyorum';
                break;
            case 5:
                buttonText = this.state.tercih ? 'Dinledim' : 'Dinliyorum';
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
            isAlertVisible: false, //true
            buttonText: buttonText,
        });

        this.props.navigation.navigate('AddProcess', {
            id: id,
            title: title,
            poster: poster,
            tur: tur,
            buttonText: buttonText,
            tense: this.state.tercih,
        });
        const parent = this.props.navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false,
        });
        return () =>
            parent.setOptions({
                tabBarVisible: true,
            });


    };

    ara = async () => {
        const apiKey = 'd6dfda7af1f3d311993806acc155757d';

        const sec = ['movie', 'tv'];

        // console.log('raporlar ' + this.state.token);
        let url = '';
        let i = 0;
        let responseM = [];
        let responseS = [];
        for (i; i < sec.length; i++) {
            url = 'https://api.themoviedb.org/3/search/' + sec[i] + '?api_key=' + apiKey + '&query=' + this.state.film + '&language=tr-TR';
            if (i == 0) {
                responseM = await axios.get(url);
            } else {
                responseS = await axios.get(url);
            }

        }

        //console.log(responseM.data.results);
        this.setState({
            films: responseM.data.results,
            series: responseS.data.results,
        });

        //debugger;

        /* alert("film"+this.state.films.length);
         alert("dizi"+this.state.series.length);*/

        if (this.state.films.length > 0) {
            this.setState({
                isVisibleM: true,
                isVisibleG: false,
                isVisibleB: false,
                isVisibleMu: false,
            });
        } else {
            this.setState({
                isVisibleM: false,
            });
        }

        if (this.state.series.length > 0) {
            this.setState({
                isVisibleS: true,
                isVisibleG: false,
                isVisibleB: false,
                isVisibleMu: false,
            });
        } else {
            this.setState({
                isVisibleS: false,
            });
        }

        /*for (let [key, value] of Object.entries(response.data.results)) {
            alert(value.title+"  "+value.id)
        }*/
        //console.log( response);

        /* Object.entries(films).map(([key, val], i) => {
             alert(key);
         })*/

        /*films.map((item, key) => {
            alert(key);
        })*/


    };

    araKitap = async () => {
        //this.setState({ loading: true });
        this.setState(prevState => ({loading: !prevState.loading}));
        const apiKeyBooks = 'nt9xhMKGVAw7l0m5aMOn2Q';

        const url = 'https://www.goodreads.com/search.xml?key=' + apiKeyBooks + '&q=' + this.state.book;
        const response = await axios.get(url);

        this.setState(prevState => ({
            loading: !prevState.loading,
        }));

        //console.log(response.data);
        let liste = [];
        parseString(response.data, function (err, result) {
            // console.log(result);
            liste = result;
            // console.log(liste);

        });


        let kitaplar = liste.GoodreadsResponse.search[0].results[0].work;
        //console.log(books);
        if (Array.isArray(kitaplar) && kitaplar.length) {
            this.setState({
                books: kitaplar,
                isVisibleB: true,
                isVisibleM: false,
                isVisibleS: false,
                isVisibleG: false,
                isVisibleMu: false,
            });
        }
        //console.log(this.state.books);

        /*for (let [key, value] of Object.entries(this.state.books)) {
            console.log(value.best_book[0].image_url[0]);
        }*/


    };

    araOyun = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios({
            url: 'https://api-v3.igdb.com/games/',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': 'b29ecbf75cc392262cc798180175b2fd',
            },
            data: 'fields name,cover.url; search "' + this.state.game + '"; where cover.url != null;',
        });

        //console.log(response);
        /*.then(response => {
            //console.log(response.data);
            this.setState({
                games: response.data,
                isVisibleG: true,
            });
        })
        .catch(err => {
            console.error(err);
        });*/

        this.setState(prevState => ({
            loading: !prevState.loading,
            games: response.data,
            isVisibleG: true,
            isVisibleM: false,
            isVisibleS: false,
            isVisibleB: false,
            isVisibleMu: false,
        }));


        console.log(response.data[0].cover.url);


    };

    araMuzik = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        /*const response = await axios({
            url: 'https://api.spotify.com/v1/search?q=elveda&type=track',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer BQCtXErIMXm3kd_1uzMyfYJuMxO-UBakvRMY2g7gc9RVPImpfvY2tGnUoFDD_iw0p-HLncJ1ipDVMIDySbXqVsgkp8wladIYPw3B62ddA7fPaMpoksN8TcKuHWIYlw',
            }
        });*/

        await axios({
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic NTc3NDU2MWQzOTdjNDI5YzhmYThjYmRiNmZhYmFkN2Y6ZmZiYTBlZTYzZTRkNDM1OWI5NWI4NTE3YjJiZTljNzM=',
            },
            data: qs.stringify({
                grant_type: 'client_credentials',
            }),
        }).then(response => {
            axios({
                url: 'https://api.spotify.com/v1/search?q=' + this.state.music + '&type=track',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + response.data.access_token,
                },
            }).then(responseMusic => {
                console.log(responseMusic)
                this.setState(prevState => ({
                    loading: !prevState.loading,
                    musics: responseMusic.data.tracks.items,
                    isVisibleMu: true,
                    isVisibleG: false,
                    isVisibleM: false,
                    isVisibleS: false,
                    isVisibleB: false,
                }));
            });

        }).catch(err => {
            console.error(err);
        });


        //console.log(response);

        /*this.setState(prevState => ({
            loading: !prevState.loading,
            musics: response.data.tracks.items,
            isVisibleMu: true,
            isVisibleG: false,
            isVisibleM: false,
            isVisibleS: false,
            isVisibleB: false,
        }));*/


        console.log(response.data.tracks.items);


    };


    _onChangeTextFilm = text => {
        this.setState({
            film: text,
        });
    };
    _onChangeTextBook = text => {
        this.setState({
            book: text,
        });
    };

    _onChangeTextGame = text => {
        this.setState({
            game: text,
        });
    };

    _onChangeTextMusic = text => {
        this.setState({
            music: text,
        });
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

    onPressAlertPositiveButton = async (rate, description) => {

        const response = await axios({
            url: 'http://37.247.98.99:8085/Home/InsertProcess',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                UserId: 2,
                Description: description ? description : '',
                Path: this.state.poster,
                ProcessId: this.state.id,
                ProcessName: this.state.title,
                ProcessType: this.state.tur,
                Rate: rate ? rate : 0,
                Tense: this.state.tercih,
            },
        });
        console.log(response);

        this.setState({
            isAlertVisible: false,
            size: '25%',
        });


        if (response.data.IsError) {
            this.alert(response.data.ErrorMessage);
        } else {
            this.alert('Başarılı!');
        }
    };

    onPressAlertNegativeButton = () => {
        // alert('Negative Button Clicked');
        this.setState({
            isAlertVisible: false,
            size: '25%',
        });
    };

    buyut = () => {
        this.setState({
            size: '40%',
        });
    };


    render() {
        //const {user, loadingProfile, series, visibleS, visibleM} = this.props;


        if (this.state.loading) {
            return <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="#0000ff"/></View>;
        }

        //const title=user[0]["title"];
        //console.log(user[0]["title"]);
        const film = this.state.film;
        const series = this.state.series;
        const films = this.state.films;
        const book = this.state.book;
        const books = this.state.books;
        const game = this.state.game;
        const games = this.state.games;
        const music = this.state.music;
        const musics = this.state.musics;
        //const series = this.state.series;
        const isVisibleM = this.state.isVisibleM;
        const isVisibleS = this.state.isVisibleS;
        const isVisibleB = this.state.isVisibleB;
        const isVisibleG = this.state.isVisibleG;
        const isVisibleMu = this.state.isVisibleMu;
        let {navigation} = this.props;


        //console.log(films);
        return (

            <View style={styles.containerIn}>
                <ImageBackground
                    //source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeader title="BooMFiGa" navigation={navigation}/>
                    <KeyboardAvoidingView style={{flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center'}}
                                          behavior={'height'}>
                        <ScrollView style={{width: '100%', marginTop: '5%'}}>

                            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                {this.state.tercih ?
                                    <Icon name="rocket" size={20} color="#676767"/> :
                                    <Icon name="rocket" size={20} color="#FF6666"/>}
                                {/*#676767*/}
                                <Block row middle>
                                    <Text color={this.state.tercih ? 'grey' : 'white'} bold>Şuan</Text>
                                    <Switch
                                        style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}], margin: 10}}
                                        value={this.state.tercih}
                                        onValueChange={(tercih) => this.setState({tercih})}/>
                                    <Text color={this.state.tercih ? 'white' : 'grey'} bold>Geçmişte</Text>

                                </Block>
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Block width={30}>
                                        {this.state.tercih ? <Iconma name="movie" size={25} color="#676767"/> :
                                            <Iconma name="movie" size={25} color="#FF6666"/>}
                                    </Block>
                                    <Block>
                                        <Input right
                                               paddingHorizontal={0}
                                               color={'#18224D'}
                                               style={{borderColor: theme.COLORS.THEME, marginLeft: 10, width: 270}}
                                               value={film}
                                               onChangeText={this._onChangeTextFilm}
                                               placeholder={this.state.tercih ? 'Geçmişte Ne İzledin?' : 'Ne İzliyorsun?'}
                                               placeholderTextColor={'#8898AA'}
                                               onSubmitEditing={this.ara}
                                               returnKeyType={'search'}
                                               iconContent={<TouchableOpacity onPress={this.ara}><Image
                                                   style={{width: 20, height: 20}}
                                                   source={require('../images/search.png')}/></TouchableOpacity>}
                                        />
                                    </Block>

                                </View>

                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Block width={30}>
                                        {this.state.tercih ? <Icon name="book" size={25} color="#676767"/> :
                                            <Icon name="book" size={25} color="#FF6666"/>}
                                    </Block>
                                    <Block>

                                        <Input right
                                               paddingHorizontal={0}
                                               color={'#18224D'}
                                               style={{borderColor: theme.COLORS.THEME, marginLeft: 10, width: 270}}
                                               value={book}
                                               onChangeText={this._onChangeTextBook}
                                               placeholder={this.state.tercih ? 'Geçmişte Hangi Kitabı Okudun?' : 'Hangi Kitabı Okuyorsun?'}
                                               placeholderTextColor={'#8898AA'}
                                               onSubmitEditing={this.araKitap}
                                               returnKeyType={'search'}
                                               iconContent={<TouchableOpacity onPress={this.araKitap}><Image
                                                   style={{width: 20, height: 20}}
                                                   source={require('../images/search.png')}/></TouchableOpacity>}
                                        />
                                    </Block>
                                </View>
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Block width={30}>
                                        {this.state.tercih ? <Icon name="gamepad" size={25} color="#676767"/> :
                                            <Icon name="gamepad" size={25} color="#FF6666"/>}
                                    </Block>
                                    <Block>
                                        <Input right
                                               paddingHorizontal={0}
                                               color={'#18224D'}
                                               style={{borderColor: theme.COLORS.THEME, marginLeft: 10, width: 270}}
                                               value={game}
                                               onChangeText={this._onChangeTextGame}
                                               placeholder={this.state.tercih ? 'Geçmişte Hangi Oyunu Oynadın?' : 'Hangi Oyunu Oynuyorsun?'}
                                               placeholderTextColor={'#8898AA'}
                                               onSubmitEditing={this.araOyun}
                                               returnKeyType={'search'}
                                               iconContent={<TouchableOpacity onPress={this.araOyun}><Image
                                                   style={{width: 20, height: 20}}
                                                   source={require('../images/search.png')}/></TouchableOpacity>}
                                        /></Block>
                                </View>
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Block width={30}>
                                        {this.state.tercih ? <Icon name="music" size={25} color="#676767"/> :
                                            <Icon name="music" size={25} color="#FF6666"/>}
                                    </Block>
                                    <Block>
                                        <Input right
                                               paddingHorizontal={0}
                                               color={'#18224D'}
                                               style={{borderColor: theme.COLORS.THEME, marginLeft: 10, width: 270}}
                                               value={music}
                                               onChangeText={this._onChangeTextMusic}
                                               placeholder={this.state.tercih ? 'Geçmişte Ne Dinledin?' : 'Ne Dinliyorsun?'}
                                               placeholderTextColor={'#8898AA'}
                                               onSubmitEditing={this.araMuzik}
                                               returnKeyType={'search'}
                                               iconContent={<TouchableOpacity onPress={this.araMuzik}><Image
                                                   style={{width: 20, height: 20}}
                                                   source={require('../images/search.png')}/></TouchableOpacity>}
                                        /></Block>
                                </View>
                            </View>
                            <View style={{flex: 1, width: '100%', marginBottom: 20, paddingBottom: HeaderHeight * 2}}>
                                {
                                    isVisibleS ?
                                        <DiziListesi title={'Diziler'} veri={series} navigation={navigation}
                                                     tercih={true} zaman={this.state.tercih}
                                                     onPressFilmButton={this.onPressFilmButton} topList={false}/>
                                        :
                                        null
                                }
                                {
                                    isVisibleM ?
                                        <FilmListesi title={'Filmler'} veri={films} navigation={navigation}
                                                     tercih={true} zaman={this.state.tercih}
                                                     onPressFilmButton={this.onPressFilmButton} topList={false}/>
                                        :
                                        null
                                }
                                {
                                    isVisibleB ?
                                        <KitapListesi title={'Kitaplar'} veri={books} navigation={navigation}
                                                      tercih={true} zaman={this.state.tercih}
                                                      onPressFilmButton={this.onPressFilmButton} topList={false}/>
                                        :
                                        null
                                }
                                {
                                    isVisibleG ?
                                        <OyunListesi title={'Oyunlar'} veri={games} navigation={navigation}
                                                     tercih={true} zaman={this.state.tercih}
                                                     onPressFilmButton={this.onPressFilmButton} topList={false}/>
                                        :
                                        null
                                }
                                {
                                    isVisibleMu ?
                                        <MuzikListesi title={'Müzikler'} veri={musics} navigation={navigation}
                                                      tercih={true} zaman={this.state.tercih}
                                                      onPressFilmButton={this.onPressFilmButton} topList={false}/>
                                        :
                                        null
                                }

                            </View>
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
                                buyut={this.buyut}
                                size={this.state.size}
                                navigation={navigation}
                            />
                        </ScrollView>
                    </KeyboardAvoidingView>
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

});


const mapStateToProps = ({user, loadingProfile, series, visibleM, visibleS}) => ({
    user,
    series,
    loadingProfile,
    visibleS,
    visibleM,
});

const mapDispatchToProps = {
    getMovie,
    getSeries,
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);

