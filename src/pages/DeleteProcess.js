import React, {Component} from 'react';

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
    RefreshControl,

} from 'react-native';

import axios from 'axios';

import {CustomHeader2} from '../header/CustomHeader2';
import {HeaderHeight} from '../../constants/utils';
import {Block, Text, theme, Button} from 'galio-framework';
import {ProcessList} from './ProcessList';


const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const thumbMeasureWidth = (width - 48 - 32) / 6;
const thumbMeasureHeight = thumbMeasureWidth * 1.5;

const {width: WIDTH} = Dimensions.get('window');

const profileMe = require('../images/pp.jpg');
const aytac = require('../images/aytc1048.jpg');

export class DeleteProcess extends Component {
    constructor(props) {
        super(props);
        const {ProcessId, ProcessName, rate, tur} = this.props.route.params;

        this.state = {
            response: [],
            resizedImageUri: '',
            films: [
                {
                    id: 75780,
                    key: 1,
                    filmId: '75780', //jack render
                    poster_path: '7baSUtFKi8PQ9SLo6ECYBfAW2K8.jpg',
                    title: 'Jack Reacher: Never Go Back',
                    rate: 2,
                    tur: 1,
                    userId: 1,
                    username: 'mmsalper',
                    image: profileMe,
                    userTur: 0,
                },
                {
                    id: 77862,
                    key: 2,
                    filmId: '77862', //anadolu kartalları
                    poster_path: 'gl0ZSahVEXzXIuMSuIW8DUc1Vz0.jpg',
                    title: 'anadolu kartalları',
                    rate: 3,
                    tur: 1,
                    userId: 2,
                    username: 'aytc1048',
                    image: aytac,
                    userTur: 1,
                },
                {
                    id: 57892,
                    key: 3,
                    filmId: '57892',
                    poster_path: 'xml0YlrH8rTUXk5KlBrmvVd7Pdu.jpg',
                    title: 'Vizontele',
                    rate: 2,
                    tur: 1,
                    userId: 1,
                    username: 'mmsalper',
                    image: profileMe,
                    userTur: 0,
                },
                {
                    id: 92834,
                    key: 4,
                    filmId: '92834',
                    poster_path: 'tVz9z8dXKGr1uebNVFEacpoVpmS.jpg',
                    title: 'Vizontele Tuuba',
                    rate: 3,
                    tur: 1,
                    userId: 2,
                    username: 'aytc1048',
                    image: aytac,
                    userTur: 1,
                },
                {
                    id: 27275,
                    key: 5,
                    filmId: '27275',
                    poster_path: 'hXLKHzlybVWloEbfWKZ43APdGUX.jpg',
                    title: 'G.O.R.A.',
                    rate: 3,
                    tur: 1,
                    userId: 1,
                    username: 'mmsalper',
                    image: profileMe,
                    userTur: 0,
                },
                {
                    id: 24426,
                    key: 6,
                    filmId: '24426',
                    poster_path: 'aSnCAHby29Ij7jJFpkDiWHUVNL4.jpg',
                    title: 'A.R.O.G',
                    rate: 3,
                    tur: 1,
                    userId: 2,
                    username: 'aytc1048',
                    image: aytac,
                    userTur: 1,
                },
                {
                    id: 278,
                    key: 7,
                    filmId: '278',
                    poster_path: 'eOZrLKszfq8VOqPUxOVlSLwpY5W.jpg',
                    title: 'Esaretin Bedeli',
                    rate: 2,
                    tur: 1,
                    userId: 1,
                    username: 'mmsalper',
                    image: profileMe,
                    userTur: 0,
                },
                {
                    id: 629500,
                    key: 8,
                    filmId: '629500',
                    poster_path: 'eGzn3s1vK6eB794xw3RB1tSAuvw.jpg',
                    title: 'Cinayet Süsü',
                    rate: 3,
                    tur: 1,
                    userId: 2,
                    username: 'aytc1048',
                    image: aytac,
                    userTur: 1,
                },
                {
                    id: 499461,
                    key: 9,
                    filmId: '499461', //anadolu kartalları
                    poster_path: 'gEEOwKV5laj0O7UEalNdvsY04y0.jpg',
                    title: 'Ölümlü Dünya',
                    rate: 3,
                    tur: 1,
                    userId: 1,
                    username: 'mmsalper',
                    image: profileMe,
                    userTur: 0,
                },
            ],
            series: [
                {
                    id: 1396,
                    key: 1,
                    filmId: '1396',
                    poster_path: 'ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
                    title: 'Breaking Bad',
                    rate: 5,
                },
                {
                    id: 71446,
                    key: 2,
                    filmId: '71446',
                    poster_path: 'MoEKaPFHABtA1xKoOteirGaHl1.jpg',
                    title: 'La casa de papel',
                    rate: 4,
                },
                {
                    id: 76669,
                    key: 3,
                    filmId: '76669',
                    poster_path: '3NTAbAiao4JLzFQw6YxP1YZppM8.jpg',
                    title: 'Elite',
                    rate: 3,
                }, ,
                {
                    id: 44217,
                    key: 4,
                    filmId: '44217',
                    poster_path: 'ff1zhqvwfS5HvRNcA5UFrH0PA2q.jpg',
                    title: 'Vikings',
                    rate: 4,
                },
            ],
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
                    id: 6393082,
                    poster_path: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png',
                    title: 'Ender\'s Game, Volume 1: Battle School (Ender\'s Saga)',
                    rate: 5,
                },
                {
                    key: 4,
                    id: 11085413,
                    poster_path: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1359229737l/11085413._SX98_.jpg',
                    title: 'Serenad',
                    rate: 5,
                },
            ],
            isVisibleM: true,
            isVisibleS: false,
            selectedValue1: '',
            selectedValue2: 5,
            selectedValue3: '',
            loading: false,
            ProcessId:ProcessId,
            ProcessName:ProcessName,
            rate:rate,
            tur:tur,

        };
    }


    componentDidMount = async () => {

        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios.post('http://37.247.98.99:8085/Home/GetUserAndFriendsProcessList?UserId=2&ProcessType=0'); //GetUserProcessByTypeId '75780' GetUserProcessByTypeId?ProcessId=629500&ProcessType=1
        //console.log(response);
        let newResponse = response.data.filter(process =>this.state.ProcessId == process.ProcessId);

        this.setState({
            response: newResponse,
        });
        //debugger;
        this.setState(prevState => ({
            loading: !prevState.loading,
        }));

        //debugger;
    };


    _onRefresh = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios.post('http://37.247.98.99:8085/Home/GetUserAndFriendsProcessList?UserId=2&ProcessType=0');
       // console.log(response);
        let newResponse = response.data.filter(process =>this.state.ProcessId == process.ProcessId);

        this.setState({
            response: newResponse,
        });
        //debugger;
        this.setState(prevState => ({
            loading: !prevState.loading,
        }));
    };

    render() {
        let {navigation} = this.props;
        const isVisibleM = this.state.isVisibleM;
        const isVisibleS = this.state.isVisibleS;
        const films = this.state.films;
        const series = this.state.series;
        const books = this.state.books;
        const {selectedValue1, selectedValue2, selectedValue3, response} = this.state;

        return (
            <View style={styles.containerIn}>
                <ImageBackground
                    //source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeader2 title={this.state.ProcessName} navigation={navigation}/>
                    {/* <Button title={'Local Push Notification'} onPress={this.handleButtonPress}/>*/}
                    <Block middle width={'100%'} style={{padding: 10}}>
                        <Button color={theme.COLORS.ERROR} style={{width: 200, height: 30}}
                                onPress={this.git}><Text color={'#fff'} size={12} bold>Tümünü Kaldır</Text></Button>
                    </Block>

                    <ScrollView style={{width: '100%'}}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.loading}
                                        onRefresh={this._onRefresh}
                                    />
                                }>

                        <View style={{flex: 1, width: '100%', marginBottom: 20, paddingBottom: HeaderHeight * 2}}>
                            <ProcessList title={'Filmler'} veri={response} navigation={navigation}
                                         tercih={false} zaman={true}/>
                        </View>
                    </ScrollView>
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
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0,
        backgroundColor: 'tomato',
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
