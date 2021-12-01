import React from 'react';
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform,
    View,
    TouchableOpacity,
    ListItem,
    TouchableWithoutFeedback,
    FlatList,
    Linking,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import {Block, Text, theme, Button} from 'galio-framework';

import {Images, argonTheme} from '../../constants';
import {HeaderHeight} from '../../constants/utils';
import {CustomHeader2} from '../header/CustomHeader2';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
//import {Tab, TabView} from 'react-native-easy-tabs';
//import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
//import SwiperFlatList from 'react-native-swiper-flatlist';
//import {ScrollableTabView} from 'react-native-scrollable-tab-view';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import CustomAlertComponent from '../components/CustomAlertComponent';
import {CustomHeaderProfile} from '../header/CustomHeaderProfile';


import axios from 'axios';


/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */


const {width, height} = Dimensions.get('screen');

//const thumbMeasure = (width - 48 - 32) / 3;
const thumbMeasureWidth = (width - 48) / 3;
const thumbMeasureHeight = thumbMeasureWidth * 1.5;

const profileMe = require('../images/pp.jpg');
const addPhoto = require('../images/addPhoto4.png');
const profile = require('../images/profileB.png');
const url = 'https://api.themoviedb.org/3/movie/75780?api_key=d6dfda7af1f3d311993806acc155757d&language=en-TR';

function Yazdir({img, sinif, tur}) {
    let {navigation} = sinif.props;
    let path = img.Path;
//debugger;
    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Detay', {
                id: img.ProcessId,
                rate: img.Rate,
                tur: tur,
                ProcessName: img.ProcessName,
            })}>
            <Block>
                <Image
                    source={{uri: path}}
                    key={`viewed-${img.ProcessId}`}
                    resizeMode="cover"
                    style={tur != 5 ? styles.thumb : styles.thumbg}
                />
                <TouchableWithoutFeedback onPress={() => navigation.navigate('DeleteProcess', {
                    ProcessId: img.ProcessId,
                    ProcessName: img.ProcessName,
                    rate: img.Rate,
                    tur: tur,
                })}>
                    <Iconm name={'dots-horizontal'} size={38} color={theme.COLORS.WHITE} style={styles.notify}/>
                </TouchableWithoutFeedback>
                {/* <Rating
                type='custom'
                ratingColor='#B23AFC'
                ratingCount={5}
                imageSize={15}
                startingValue={img.rate}
                readonly={true}
                style={{width: 100}}
            />
            <Text>{img.comment}</Text>*/}
            </Block>
        </TouchableWithoutFeedback>
    );

}

function IlkEkran({films}) {
    return (
        <View style={[styles.scene, {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            width,
        }]}>
            {films.map((img, imgIndex) => (
                <Yazdir
                    img={img}
                    sinif={this}
                    tur={'1'}
                    key={imgIndex}
                />
            ))}
        </View>
    );
};


const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'choose',
};

export class ProfilDiger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userme: '',
            userid: '',
            username: '',
            name: '',
            surname: '',
            usertur: '',
            userphoto: '',
            filmSay: 0,
            diziSay: 0,
            kitapSay: 0,
            oyunSay: 0,
            avatarSource: null,
            isAlertVisible: false,
            ad: '',
            tab: 0,
            rate: 0,
            films: [],
            series: [],
            filmsOrnek: [
                {
                    id: 75780,
                    key: 1,
                    filmId: '75780', //jack render
                    poster_path: '7baSUtFKi8PQ9SLo6ECYBfAW2K8.jpg',
                    title: 'Jack Reacher: Never Go Back',
                    rate: 2,
                    tur: 1,
                    userId: 1,
                    comment: 'mmsalper',
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
                    comment: 'aytc1048',
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
                    comment: 'mmsalper',
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
                    comment: 'aytc1048',
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
                    comment: 'mmsalper',
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
                    comment: 'aytc1048',
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
                    comment: 'mmsalper',
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
                    comment: 'aytc1048',
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
                    comment: 'mmsalper',
                },
            ],
            seriesORnek: [
                {
                    id: 1396,
                    poster_path: 'ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
                    title: 'Breaking Bad',
                    rate: 2,
                },
            ],
            books: [],
            booksOrnek: [
                {
                    bookId: '2422333',
                    poster_path: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408303130l/375802._SY160_.jpg',
                    title: 'Enders Game',
                    rate: 3,
                },
            ],
            games: [],
            gamesOrnek: [
                {
                    id: 1372,
                    poster_path: 'https://images.igdb.com/igdb/image/upload/t_thumb/co1vce.jpg',
                    title: 'Counter-Strike: Global Offensive',
                    rate: 4,
                },
            ],
            index: 0,
            setIndex: 0,
            routes: [
                {key: 'Filmler', title: 'Filmler'},
                {key: 'Diziler', title: 'Diziler'},
                {key: 'Kitaplar', title: 'Kitaplar'},
                {key: 'Oyunlar', title: 'Oyunlar'},
                {key: 'Müzikler', title: 'Müzikler'},
            ],
            size: '25%',
            profilePhoto: null,
            loading: false,
            musics: [],
            friendsCount: 0,
            userFollowerCount: 0,
            userFollowCount: 0,
        };

        this.props.navigation.addListener('focus', () => {
            const {userme, userid, tur} = this.props.route.params;
            this.profilDoldur(userme, userid, tur);
            this.componentDidMount();
        });

        //debugger;
    }

    profilDoldur = async (userme, userid, tur) => {
        await axios({
            url: 'http://37.247.98.99:8085/Home/GetUserProfile',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                MyUserId: userme,
                UserId: userid,
            },
        }).then(response => {
            console.log('profil doldur');
            console.log(response);
            this.setState({
                userid: userid,
                usertur: tur,
                username: response.data.UserName,
                name: response.data.Name,
                surname: response.data.Surname,
                usertur: response.data.FriendStatu,
                userphoto: response.data.UserProfilePhoto,
                friendsCount: response.data.FriendsCount,
                userFollowerCount: response.data.UserFollowerCount,
                userFollowCount: response.data.UserFollowCount,
            });
            //debugger;

            // debugger;
        }).catch(error => {
            console.warn(error);
            // alert(error)
        });
    };


    componentDidMount = async () => {
        const {userid} = this.props.route.params;
        this.setState(prevState => ({loading: !prevState.loading}));
        await axios({
            url: 'http://37.247.98.99:8085/Home/GetUserProfileProcessList',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                UserId: userid,
                ProcessType: 0,
            },
        }).then(response => {
            let films = [];
            let series = [];
            let books = [];
            let games = [];
            let musics = [];
            let i = 0;
            for (i = 0; i < response.data.length; i++) {
                if (response.data[i].ProcessType == 1) {
                    films.push(response.data[i]);
                } else if (response.data[i].ProcessType == 2) {
                    series.push(response.data[i]);
                } else if (response.data[i].ProcessType == 3) {
                    books.push(response.data[i]);
                } else if (response.data[i].ProcessType == 4) {
                    games.push(response.data[i]);
                } else if (response.data[i].ProcessType == 5) {
                    musics.push(response.data[i]);
                }
            }
            this.setState({
                films: films,
                series: series,
                books: books,
                games: games,
                musics: musics,
                routes: [
                    {key: 'Filmler', title: 'Filmler\n' + films.length},
                    {key: 'Diziler', title: 'Diziler\n' + series.length},
                    {key: 'Kitaplar', title: 'Kitaplar\n' + books.length},
                    {key: 'Oyunlar', title: 'Oyunlar\n' + games.length},
                    {key: 'Müzikler', title: 'Müzikler\n' + musics.length},
                ],

            });
        }).catch(error => {
            console.warn(error);

        });

        this.setState(prevState => ({
            loading: !prevState.loading,
        }));
    };

    ekle = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        await axios({
             url: 'http://37.247.98.99:8085/Home/AddFriend',
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
             },
             data: {
                 AddUserId: 2,
                 AddedUserId: this.state.userid,
                 StatuType: 0,
             },
         }).then(response => {
                 console.log(response);
             },
         );
        this.setState(prevState => ({
            loading: !prevState.loading,
            usertur: 0,
        }));
    };
    kaldir = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        await axios({
            url: 'http://37.247.98.99:8085/Home/DeleteFriends',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                UserId: 2,
                FriendsId: this.state.userid,
            },
        }).then(response => {
                console.log(response);
            },
        );
        this.setState(prevState => ({
            loading: !prevState.loading,
            usertur: 4,
        }));
    };


    renderSwitch(param) {
        switch (param) {
            case 0:
                return <Block col middle>
                    <Button color={theme.COLORS.ERROR} style={{width: 150, height: 30}}
                            onPress={this.kaldir}><Text color={theme.COLORS.WHITE} size={12} bold>Takip İsteğini
                        Kaldır</Text>
                    </Button>
                </Block>;
            case 1:
                return <Block col middle>
                    <Text style={{marginBottom: 5}} bold>Arkadaşın</Text>
                    <Button color={theme.COLORS.ERROR} style={{width: 100, height: 30}}
                            onPress={this.kaldir}><Text color={theme.COLORS.WHITE} size={12} bold>Takibi
                        Kaldır</Text></Button>
                </Block>;
            case 2:
                return <Block col middle>
                    <Text style={{marginBottom: 5}} bold>Takipçin</Text>
                    <Block row>
                        <Button color={theme.COLORS.ERROR} style={{width: 50, height: 30, marginRight: 5}}
                                onPress={this.kaldir}><Text color={theme.COLORS.WHITE} size={12}
                                                            bold>Kaldır</Text></Button>
                        <Button color={'#11CDEF'} style={{width: 50, height: 30}}
                                onPress={this.ekle}><Text color={theme.COLORS.WHITE} size={12} bold>Takip
                            Et</Text></Button>
                    </Block>
                </Block>;
            case 3:
                return <Block middle>
                    <Text style={{marginBottom: 5}} bold>Takip Etiiğin</Text>
                    <Button color={theme.COLORS.ERROR} style={{width: 100, height: 30}}
                            onPress={this.kaldir}><Text color={theme.COLORS.WHITE} size={12} bold>Kaldır</Text></Button>
                </Block>;
            default:
                return <Block middle>
                    <Text style={{marginBottom: 5}} bold>Diğer</Text>
                    <Button color={'#11CDEF'} style={{width: 50, height: 30}}
                            onPress={this.ekle}><Text color={theme.COLORS.WHITE} size={12} bold>Takip Et</Text></Button>
                </Block>;
        }
    }

    onPressAlertPositiveButton = () => {
        //alert('Positive Button Clicked');
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

    FirstRoute = () => (
        <View style={[styles.scene, {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            width,
        }]}>
            {this.state.films.map((img, imgIndex) => (
                <Yazdir
                    img={img}
                    sinif={this}
                    tur={1}
                    key={imgIndex}
                />
            ))}
        </View>
    );
    SecondRoute = () => (

        <View style={[styles.scene, {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            width,
        }]}>
            {this.state.series.map((img, imgIndex) => (
                <Yazdir
                    img={img}
                    sinif={this}
                    tur={2}
                    key={imgIndex}
                />
            ))}
        </View>
    );
    ThirdRoute = () => (

        <View style={[styles.scene, {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            width,
        }]}>
            {this.state.books.map((img, imgIndex) => (
                <Yazdir
                    img={img}
                    sinif={this}
                    tur={3}
                    key={imgIndex}
                />
            ))}
        </View>
    );
    FourthRoute = () => (

        <View style={[styles.scene, {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            width,
        }]}>
            {this.state.games.map((img, imgIndex) => (
                <Yazdir
                    img={img}
                    sinif={this}
                    tur={4}
                    key={imgIndex}
                />
            ))}
        </View>
    );
    FifthRoute = () => (

        <View style={[styles.scene, {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            width,
        }]}>
            {this.state.musics.map((img, imgIndex) => (
                <Yazdir
                    img={img}
                    sinif={this}
                    tur={5}
                    key={imgIndex}
                />
            ))}

        </View>
    );
    renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{color: '#525F7F'}}
            style={{backgroundColor: 'white'}}
            renderLabel={({route, focused, color}) => (

                focused ? <Text bold size={13} style={{
                        width: '100%',
                        color: 'tomato',
                        textAlign: 'center',
                    }}>{route.title.charAt(0).toUpperCase() + route.title.substring(1)}</Text>
                    : <Text bold size={13} style={{
                        color: '#525F7F',
                        textAlign: 'center',
                    }}>{route.title.charAt(0).toUpperCase() + route.title.substring(1)}</Text>


            )}
        />
    );

    buyut = () => {
        this.setState({
            size: '40%',
        });
    };

    _onChangeIndex = async (index) => {
        this.setState({index});
    };
    _onRefresh = async () => {
        this.setState(prevState => ({loading: !prevState.loading}));
        await axios({
            url: 'http://37.247.98.99:8085/Home/GetUserProfileProcessList',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                UserId: this.state.userid,
                ProcessType: 0,
            },
        }).then(response => {
            console.log(response);
            let films = [];
            let series = [];
            let books = [];
            let games = [];
            let musics = [];
            let i = 0;
            for (i = 0; i < response.data.length; i++) {
                if (response.data[i].ProcessType == 1) {
                    films.push(response.data[i]);
                } else if (response.data[i].ProcessType == 2) {
                    series.push(response.data[i]);
                } else if (response.data[i].ProcessType == 3) {
                    books.push(response.data[i]);
                } else if (response.data[i].ProcessType == 4) {
                    games.push(response.data[i]);
                } else if (response.data[i].ProcessType == 5) {
                    musics.push(response.data[i]);
                }
            }
            this.setState({
                films: films,
                series: series,
                books: books,
                games: games,
                musics: musics,
                routes: [
                    {key: 'Filmler', title: 'Filmler\n' + films.length},
                    {key: 'Diziler', title: 'Diziler\n' + series.length},
                    {key: 'Kitaplar', title: 'Kitaplar\n' + books.length},
                    {key: 'Oyunlar', title: 'Oyunlar\n' + games.length},
                    {key: 'Müzikler', title: 'Müzikler\n' + musics.length},
                ],

            });
        }).catch(error => {
            console.warn(error);

        });
    };


    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
        };


        const {userme, userid, username, usertur, name, surname, userphoto, friendsCount, userFollowCount, userFollowerCount} = this.state;

        /*if (this.state.loading) {
            return <View style={[styles.containerl, styles.horizontal]}><ActivityIndicator size="large"
                                                                                           color="#0000ff"/></View>;
        }*/
        let {navigation} = this.props;

        return (
            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        //source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}
                    >
                        <CustomHeader2 title={this.state.username ? this.state.username : username}
                                       navigation={navigation}/>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{width, marginTop: '5%'}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.loading}
                                    onRefresh={this._onRefresh}
                                />
                            }
                        >
                            <Block flex style={styles.profileCard}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileSettings', {userid: userme})}
                                    style={{margin: theme.SIZES.BASE}}>
                                    <Block middle style={styles.avatarContainer}>
                                        <Block middle style={styles.avatar}>
                                            <Image
                                                source={userphoto ? {uri: 'data:image/jpeg;base64,' + userphoto} : profile} //addPhoto
                                                style={styles.avatar} //this.state.profilePhoto ? styles.avatar : styles.avatarBos
                                            />
                                        </Block>
                                        <Block
                                            middle
                                            row
                                            space="evenly"
                                            style={{marginTop: 5}}
                                        >

                                            {userme != userid ? this.renderSwitch(usertur) : null}


                                        </Block>
                                    </Block>
                                </TouchableOpacity>
                                {/*<TouchableOpacity onPress={this.getir}>
                                    <Text>Bas</Text>
                                </TouchableOpacity>*/}
                                <Block style={styles.info}>
                                    <Block
                                        middle
                                        row
                                        space="evenly"
                                        style={{marginTop: 10, paddingBottom: 24}}
                                    >

                                        <Block>
                                            <TouchableOpacity
                                                onPress={() => Linking.openURL('http://www.instagram.com/mmsalper')}
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <Iconm name={'instagram'} size={20} color="#900"/>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: '#900',
                                                }}> mmsalper</Text>

                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => Linking.openURL('http://www.twitter.com/alpermms')}
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <Iconm name={'twitter'} size={20} color="#900"/>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: '#900',
                                                }}> alpermms</Text>

                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <Iconm name={'steam-box'} size={20} color="#900"/>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: '#900',
                                                }}> 1049096690</Text>

                                            </TouchableOpacity>
                                        </Block>

                                    </Block>

                                    <Block row space="between">
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Users', {
                                                title: 'Arkadaşları',
                                                userid: userid,
                                                tur: 1,
                                            })}>
                                            <Block middle>
                                                <Text
                                                    bold
                                                    size={18}
                                                    color="#525F7F"
                                                    style={{marginBottom: 4}}
                                                >
                                                    {friendsCount}
                                                </Text>
                                                <Text size={12} color={argonTheme.COLORS.TEXT}>Arkadaşları</Text>
                                            </Block>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Users', {
                                                title: 'Takipçileri',
                                                userid: userid,
                                                tur: 2,
                                            })}>
                                            <Block middle>
                                                <Text
                                                    bold
                                                    color="#525F7F"
                                                    size={18}
                                                    style={{marginBottom: 4}}
                                                >
                                                    {userFollowerCount}
                                                </Text>
                                                <Text size={12} color={argonTheme.COLORS.TEXT}>Takipçileri</Text>
                                            </Block>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Users', {
                                                title: 'Takip Ettikleri',
                                                userid: userid,
                                                tur: 3,
                                            })}>
                                            <Block middle>
                                                <Text
                                                    bold
                                                    color="#525F7F"
                                                    size={18}
                                                    style={{marginBottom: 4}}
                                                >
                                                    {userFollowCount}
                                                </Text>
                                                <Text size={12} color={argonTheme.COLORS.TEXT}>Takip Ettikleri</Text>
                                            </Block>
                                        </TouchableOpacity>
                                    </Block>
                                </Block>
                                <Block flex>
                                    <Block middle style={styles.nameInfo}>
                                        <Text bold size={28} color="#32325D">
                                            {name + ' ' + surname},
                                            27
                                        </Text>
                                        <Text size={16} color="#32325D" style={{marginTop: 10}}>
                                            Ankara, Türkiye
                                        </Text>
                                    </Block>
                                    <Block middle style={{marginTop: 30, marginBottom: 16}}>
                                        <Block style={styles.divider}/>
                                    </Block>
                                    <Block middle>
                                        <Text
                                            size={16}
                                            color="#525F7F"
                                            style={{textAlign: 'center'}}
                                        >
                                            Bilgisayar Mühendisi
                                        </Text>
                                    </Block>
                                    <Block
                                        row
                                        style={{paddingBottom: 20, justifyContent: 'flex-end'}}
                                    >
                                        {/*<IlkEkran films={films}/>*/}

                                    </Block>
                                </Block>
                                <Block style={{paddingBottom: HeaderHeight * 2}}>
                                    <TabView
                                        renderTabBar={this.renderTabBar}
                                        navigationState={this.state}
                                        renderScene={SceneMap({
                                            Filmler: this.FirstRoute,
                                            Diziler: this.SecondRoute,
                                            Kitaplar: this.ThirdRoute,
                                            Oyunlar: this.FourthRoute,
                                            Müzikler: this.FifthRoute,
                                        })}
                                        onIndexChange={this._onChangeIndex}
                                        initialLayout={{width: Dimensions.get('window').width}}
                                    />

                                </Block>
                            </Block>

                            <CustomAlertComponent
                                rate={this.state.rate}
                                displayAlert={this.state.isAlertVisible}
                                displayRateAndComment={true}
                                rate={this.state.rate}
                                displayAlertIcon={true}
                                alertTitleText={'Güncelle veya Sil'}
                                alertMessageText={this.state.ad}
                                displayDeleteButton={true}
                                deleteButtonText={'SİL'}
                                displayPositiveButton={true}
                                positiveButtonText={'KAYDET'}
                                displayNegativeButton={true}
                                negativeButtonText={'VAZGEÇ'}
                                onPressPositiveButton={this.onPressAlertPositiveButton}
                                onPressNegativeButton={this.onPressAlertNegativeButton}
                                size={this.state.size}
                            />
                        </ScrollView>
                    </ImageBackground>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        //marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
        // marginBottom: -HeaderHeight * 2,
        flex: 1,
    },
    profileContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1,
    },
    profileBackground: {
        width: width,
        height: height, //height / 2,
        backgroundColor: '#101b1f',
    },
    profileCard: {
        //position: "relative",
        //padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: '#FFF', //theme.COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    },
    info: {
        paddingHorizontal: 40,
    },
    avatarContainer: {
        position: 'relative',
        marginTop: -80,
    },
    avatarBackground: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0,
        backgroundColor: 'tomato',
    },
    avatarBos: {
        width: 80,
        height: 80,
        //borderRadius: 62,
        borderWidth: 0,
    },
    avatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0,
        backgroundColor: 'tomato',
    },
    nameInfo: {
        marginTop: 35,
    },
    divider: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        marginLeft: 4,
        alignSelf: 'center',
        width: thumbMeasureWidth,
        height: thumbMeasureHeight,
    },
    thumbg: {
        borderRadius: 4,
        marginVertical: 4,
        marginLeft: 4,
        alignSelf: 'center',
        width: thumbMeasureWidth,
        height: thumbMeasureWidth,
    },
    fill: {
        flex: 1,
    },
    padding: {
        flexDirection: 'row',
        paddingTop: 5,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: theme.COLORS.white,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    notify: {
        position: 'absolute',
        top: 0,
        right: 2,
    },
    containery: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: width * 0.5,
        textAlign: 'center',
    },
    scene: {
        flex: 1,
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


