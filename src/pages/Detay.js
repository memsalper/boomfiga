import React, {Component, useState} from 'react';
import {DiziListesi} from '../components/DiziListesi';
import {FilmListesi} from '../components/FilmListesi';
import {CustomHeader2} from '../header/CustomHeader2';
import SearchBar from 'react-native-search-bar';
import {connect} from 'react-redux';
import {getMovie, getSeries, getMovieId, getSeriesId} from '../../reducer';
import Icon from 'react-native-vector-icons/FontAwesome';


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
    Linking,

} from 'react-native';

import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {parseString} from 'react-native-xml2js';
import {KitapListesi} from '../components/KitapListesi';

import {Block, theme, Input, Button, Text} from 'galio-framework';

import {Images, argonTheme} from '../../constants';
import {HeaderHeight} from '../../constants/utils';
import {Rating} from 'react-native-ratings';
import {debug} from 'react-native-reanimated';
import qs from 'qs';


const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const {width: WIDTH} = Dimensions.get('window');

const profileMe = require('../images/pp.jpg');


function OpenFilm({veri, rate, tur, ProcessName}) {
    //console.log(veri);
    //alert(veri.cover.url);
    //debugger;
    return (
        <Block flex style={styles.profileCard}>
            <Block style={{flexDirection: 'row'}}>
                <Image style={styles.image}
                       source={{uri: 'https://image.tmdb.org/t/p/w500' + veri.poster_path}}/>
                <Block style={{marginLeft: 20, flex: 1}}>
                    <Text size={15} style={{paddingBottom: 5}} bold>{ProcessName}</Text>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Tür : </Text>
                        {veri['genres'] ?
                            veri['genres'].map((genre, genreIndex) => (
                                <Text key={genreIndex} size={12}>{genre.name} </Text>
                            ))
                            : null
                        }
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} size={12} bold>Web : </Text>
                        <Text size={12}>{veri.homepage} </Text>
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Yayın Tarihi : </Text>
                        <Text size={12}>{veri.release_date} </Text>
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Orjinal Dil : </Text>
                        <Text size={12}>{veri.original_language} </Text>
                    </Block>
                    <Block row={true} style={{marginTop: 5}}>
                        <Rating
                            type='custom'
                            ratingColor='#B23AFC'
                            ratingCount={5}
                            imageSize={20}
                            startingValue={rate}
                            readonly={true}
                            style={{width: 100}}
                        />
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text bold>İzlenme Sayısı : </Text><Text>2000</Text>
                    </Block>
                </Block>

            </Block>
            <Block style={{flexDirection: 'row'}}>
                <Block row={true} style={{flexWrap: 'wrap', marginTop: 5}}>
                    <Text style={{textAlign: 'justify'}}>{veri.overview}</Text>
                </Block>
            </Block>
            <Block style={styles.avatarContainer}>
                <Block style={{flexDirection: 'row', margin: 5}}>
                    <Text size={20} bold>Yorumlar</Text>
                </Block>
                <Block style={{flexDirection: 'row', marginTop: 5}}>
                    <Block style={{flexDirection: 'row'}}>
                        <Image
                            source={profileMe}
                            style={styles.avatar}
                        />
                        <Text size={12} bold> mmsalper : </Text>
                    </Block>
                    <Block style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                        <Text>yorum satırı.. </Text>
                    </Block>
                </Block>
                <Block style={{flexDirection: 'row', marginTop: 5}}>
                    <Block style={{flexDirection: 'row'}}>
                        <Image
                            source={profileMe}
                            style={styles.avatar}
                        />
                        <Text size={12} bold> mmsalper : </Text>
                    </Block>
                    <Block style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                        <Text>yorum satırı.. </Text>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
}

function OpenGame({veri, rate, ProcessName}) {
    // console.log(veri);
    //alert(veri.cover.url);
    //debugger;
    let poster=veri.cover.url+"";
    let posterChange=poster.split('thumb').join('720p');
    return (
        <Block flex style={styles.profileCard}>
            <Block style={{flexDirection: 'row'}}>
                <Image style={styles.image}
                       source={{uri: 'http:' + posterChange}}/>
                <Block style={{marginLeft: 20, flex: 1}}>
                    <Text size={15} style={{paddingBottom: 5}} bold>{ProcessName}</Text>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Tür : </Text>
                        {veri.genres ?
                            veri.genres.map((genre, genreIndex) => (
                                <Text key={genreIndex} size={12}>{genre.name} </Text>
                            ))
                            : null
                        }
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Platform : </Text>
                        {veri.platforms ?
                            veri.platforms.map((platform, genreIndex) => (
                                <Text key={genreIndex} size={12}>{platform.name} </Text>
                            ))
                            : null
                        }
                    </Block>
                    <Block row={true} style={{marginTop: 5}}>
                        <Rating
                            type='custom'
                            ratingColor='#B23AFC'
                            ratingCount={5}
                            imageSize={20}
                            startingValue={rate}
                            readonly={true}
                            style={{width: 100}}
                        />
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text bold>Oynanma Sayısı : </Text><Text>2000</Text>
                    </Block>
                </Block>

            </Block>
            <Block style={{flexDirection: 'row'}}>
                <Block row={true} style={{flexWrap: 'wrap', marginTop: 5}}>
                    <Text style={{textAlign: 'justify'}}>{veri.summary}</Text>
                </Block>
            </Block>
            <Block style={styles.avatarContainer}>
                <Block style={{flexDirection: 'row', margin: 5}}>
                    <Text size={20} bold>Yorumlar</Text>
                </Block>
                <Block style={{flexDirection: 'row', marginTop: 5}}>
                    <Block style={{flexDirection: 'row'}}>
                        <Image
                            source={profileMe}
                            style={styles.avatar}
                        />
                        <Text size={12} bold> mmsalper : </Text>
                    </Block>
                    <Block style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                        <Text>yorum satırı.. </Text>
                    </Block>
                </Block>
                <Block style={{flexDirection: 'row', marginTop: 5}}>
                    <Block style={{flexDirection: 'row'}}>
                        <Image
                            source={profileMe}
                            style={styles.avatar}
                        />
                        <Text size={12} bold> mmsalper : </Text>
                    </Block>
                    <Block style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                        <Text>yorum satırı.. </Text>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
}

function OpenBook({bookTitle, bookPoster, bookAuthors, bookLanguage, bookRelease, bookOverview, rate, response, navigation}) {
    let newOverview = bookOverview + '';

    console.log(response.CommentList);

    newOverview = newOverview.split('<br />').join('');
    //console.log(newOverview);
    return (
        <Block flex style={styles.profileCard}>
            <Block style={{flexDirection: 'row'}}>
                <Image style={styles.image}
                       source={{uri: bookPoster?bookPoster:null}}/>
                <Block style={{marginLeft: 20, flex: 1}}>
                    <Text size={15} style={{paddingBottom: 5}} bold>{bookTitle}</Text>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Yazarlar : </Text>
                        {
                            bookAuthors.map((author, genreIndex) => (
                                <Text key={genreIndex} size={12}>{author.name} </Text>
                            ))
                        }
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Orijinal Dil : </Text><Text size={12}>{bookLanguage}</Text>
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Yayın Tarihi : </Text><Text size={12}>{bookRelease}</Text>
                    </Block>
                    <Block row={true} style={{marginTop: 5}}>
                        <Rating
                            type='custom'
                            ratingColor='#B23AFC'
                            ratingCount={5}
                            imageSize={20}
                            startingValue={rate}
                            readonly={true}
                            style={{width: 100}}
                        />
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text bold>Okunma Sayısı : </Text><Text>2000</Text>
                    </Block>
                </Block>

            </Block>
            <Block style={{flexDirection: 'row'}}>
                <Block row={true} style={{flexWrap: 'wrap', marginTop: 5}}>
                    <Text style={{textAlign: 'justify'}}>{newOverview}</Text>
                </Block>
            </Block>
            <Block style={styles.avatarContainer}>
                <Block style={{flexDirection: 'row', margin: 5}}>
                    <Text size={20} bold>Yorumlar</Text>
                </Block>
               {/* <ScrollView style={{width: '100%', paddingBottom: HeaderHeight * 1.2}}><Block style={{flexWrap: 'wrap', flex: 1}}>

                        {
                            response.CommentList.map((user, key) => (
                        <Block style={{flexDirection: 'row', marginTop: 5}} key={key} >
                                    <TouchableOpacity  style={{width: '65%', flexDirection:"row", alignItems:"center"}}
                                                       onPress={() => navigation.navigate('ProfilDiger', {userme:2, userid: user.UserId, username: user.UserName, userphoto: user.UserProfilePhoto})}>
                                        <Block style={{marginRight:5}}>
                                            <Image
                                                source={user.UserProfilePhoto!=null ?{uri: 'data:image/jpeg;base64,' + user.UserProfilePhoto}: profileMe}
                                                style={styles.avatar}
                                            />
                                        </Block>
                                        <Block>
                                            <Text size={12} bold>{user.UserName}</Text>
                                        </Block>
                                    </TouchableOpacity>
                                </Block>

                        ))
                        }

                    </Block>
                </ScrollView>*/}
                <Block style={{flexDirection: 'row', marginTop: 5}}>
                    <Block style={{flexDirection: 'row'}}>
                        <Image
                            source={profileMe}
                            style={styles.avatar}
                        />
                        <Text size={12} bold> mmsalper : </Text>
                    </Block>
                    <Block style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                        <Text>yorum satırı.. </Text>
                    </Block>
                </Block>
                <Block style={{flexDirection: 'row', marginTop: 5}}>
                    <Block style={{flexDirection: 'row'}}>
                        <Image
                            source={profileMe}
                            style={styles.avatar}
                        />
                        <Text size={12} bold> mmsalper : </Text>
                    </Block>
                    <Block style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                        <Text>yorum satırı.. </Text>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
}

function OpenMusic({veri, rate, ProcessName}) {
    return (
        <Block flex style={styles.profileCard}>
            <Block style={{flexDirection: 'row'}}>
                <Image style={styles.imageg}
                       source={{uri: veri.album.images[1].url}}/>
                <Block style={{marginLeft: 20, flex: 1}}>
                    <Text size={15} style={{paddingBottom: 5}} bold>{ProcessName}</Text>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Tür : </Text>
                                <Text size={12}>{veri.album.type} </Text>
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Albüm Adı : </Text>
                        <Text size={12}>{veri.album.name} </Text>
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text size={12} bold>Yayın Tarihi : </Text>
                        <Text size={12}>{veri.album.release_date} </Text>
                    </Block>
                    <Block row={true} style={{marginTop: 5}}>
                        <Rating
                            type='custom'
                            ratingColor='#B23AFC'
                            ratingCount={5}
                            imageSize={20}
                            startingValue={rate}
                            readonly={true}
                            style={{width: 100}}
                        />
                    </Block>
                    <Block row={true} style={{flexWrap: 'wrap'}}>
                        <Text bold>Dinlenme Sayısı : </Text><Text>2000</Text>
                    </Block>
                </Block>

            </Block>
            <Block style={styles.avatarContainer}>
                <Block style={{flexDirection: 'row', margin: 5}}>
                    <Text size={20} bold>Yorumlar</Text>
                </Block>
                <Block style={{flexDirection: 'row', marginTop: 5}}>
                    <Block style={{flexDirection: 'row'}}>
                        <Image
                            source={profileMe}
                            style={styles.avatar}
                        />
                        <Text size={12} bold> mmsalper : </Text>
                    </Block>
                    <Block style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                        <Text>yorum satırı.. </Text>
                    </Block>
                </Block>
                <Block style={{flexDirection: 'row', marginTop: 5}}>
                    <Block style={{flexDirection: 'row'}}>
                        <Image
                            source={profileMe}
                            style={styles.avatar}
                        />
                        <Text size={12} bold> mmsalper : </Text>
                    </Block>
                    <Block style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                        <Text>yorum satırı.. </Text>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
}

export class Detay extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        const tur = this.props.route.params.tur;
        const id = this.props.route.params.id;
        const ProcessName = this.props.route.params.ProcessName;

        //alert(ProcessName);
        const rate = this.props.route.params.rate ? this.props.route.params.rate : 0;

       // alert(id);
        this.state = {
            id: id,
            response: [],
            rate: rate,
            tur: tur,
            bookTitle: '',
            bookPoster: '',
            bookRelease: '',
            bookLanguage: '',
            bookOverview: '',
            bookAuthors: [],
            gameTitle: '',
            gamePoster: '',
            gameOverview: '',
            gameGenres: [],
            gamePlatforms: [],
            games: [],
            books: [],
            films: [],
            series: [],
            musics:[],
            loading: false,
            ProcessName:ProcessName,

        };

        if (tur == 1) {
            //this.props.getMovieId(id);
            this.araFilm(id);
        } else if (tur == 2) {
            //this.props.getSeriesId(id);
            this.araDizi(id);
        } else if (tur == 3) {
            this.araKitap(id);
        } else if (tur == 4) {
            this.araOyun(id);
        } else{
            this.araMuzik(id);
        }
    }

    componentDidMount = async () => {
        const response = await axios({
            url: 'http://37.247.98.99:8085/Home/GetUserProcessByTypeId',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                ProcessId: 25484988,
                ProcessType: 3,
                UserId:2,
            },
        });
        console.log(response);

        this.setState({
            response:response.data,
        })
    }

    araFilm = async (id) => {
        this.setState(prevState => ({loading: !prevState.loading}));
        const apiKey = 'd6dfda7af1f3d311993806acc155757d';
        const language = 'tr-TR';
        const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey + '&language=' + language;
        const response = await axios.get(url);
       // this.bilgiGetir();
        this.setState(prevState => ({
            loading: !prevState.loading,
            films: response.data,
        }));
    };
    araDizi = async (id) => {
        this.setState(prevState => ({loading: !prevState.loading}));
        const apiKey = 'd6dfda7af1f3d311993806acc155757d';
        const language = 'tr-TR';
        const url = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=' + apiKey + '&language=' + language;
        const response = await axios.get(url);
        this.setState(prevState => ({
            loading: !prevState.loading,
            series: response.data,
        }));

    };
    araOyun = async (id) => {
        this.setState(prevState => ({loading: !prevState.loading}));
        const response = await axios({
            url: 'https://api-v3.igdb.com/games/',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': 'b29ecbf75cc392262cc798180175b2fd',
            },
            data: 'fields name,cover.url,genres.name, summary, platforms.name; where id= ' + id + '; ',
        });

        this.setState(prevState => ({
            loading: !prevState.loading,
            games: response.data[0],
        }));

    };
    araKitap = async (id) => {


        /*  const url = 'https://www.goodreads.com/book/show.xml?key=nt9xhMKGVAw7l0m5aMOn2Q&id=375802'; //best_book id
          const response = await axios.get(url);*/


        //this.setState({ loading: true });
        //alert("ikinvi"+this.props.route.params.id);
        //alert(id);
        // let  bookId=parseInt(id);
        //console.log("b");
        //console.log(bookId);
        //let b = parseInt(bookId);
        this.setState(prevState => ({loading: !prevState.loading}));
        const apiKeyBooks = 'nt9xhMKGVAw7l0m5aMOn2Q';

        const url = 'https://www.goodreads.com/book/show.xml?key=' + apiKeyBooks + '&id=' + id;//+id// +this.state.id; //best_book id //6234357
        const response = await axios.get(url);

        this.setState(prevState => ({
            loading: !prevState.loading,
        }));

        let liste = [];
        parseString(response.data, function (err, result) {
            // console.log(result);
            liste = result;
            // console.log(liste);

        });

        /* let  bookId=parseInt(liste.GoodreadsResponse.book[0].id[0]);
         let b = parseInt(bookId);*/

        //debugger;

        this.setState({
            bookTitle: liste.GoodreadsResponse.book[0].title[0],
            bookPoster: liste.GoodreadsResponse.book[0].image_url[0],
            bookRelease: liste.GoodreadsResponse.book[0].publication_day[0] + ' ' + liste.GoodreadsResponse.book[0].publication_month[0] + ' ' + liste.GoodreadsResponse.book[0].publication_year[0],
            bookLanguage: liste.GoodreadsResponse.book[0].language_code[0],
            bookOverview: liste.GoodreadsResponse.book[0].description[0],
            bookAuthors: liste.GoodreadsResponse.book[0].authors[0].author,

        });

        //debugger;
        //debugger;


        /*    let title = liste.GoodreadsResponse.book[0].title[0];
            let poster = liste.GoodreadsResponse.book[0].image_url[0];
            let release = liste.GoodreadsResponse.book[0].publication_day[0]+" "+liste.GoodreadsResponse.book[0].publication_month[0]+" "+liste.GoodreadsResponse.book[0].publication_day[0];
            let language = liste.GoodreadsResponse.book[0].language_code[0];
            let overview = liste.GoodreadsResponse.book[0].description[0];
            let authors= liste.GoodreadsResponse.book[0].authors[0].author;
    */
        //debugger;

        //console.log(overview);


        /* <publication_year>2004</publication_year>
         <publication_month>9</publication_month>
         <publication_day>30</publication_day>
         <publisher>Macmillan Audio</publisher>
         <language_code>eng</language_code>
         <is_ebook>false</is_ebook>
         <description>*/


    };
    araMuzik = async (id) => {
        this.setState(prevState => ({loading: !prevState.loading}));
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
                url: "https://api.spotify.com/v1/albums/"+id,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+response.data.access_token,
                }
            }).then(responseMusic => {
                this.setState(prevState => ({
                    loading: !prevState.loading,
                    musics: responseMusic.data,
                }));
            });

        }).catch(err => {
            console.error(err);
        });

        //debugger;

    };

    render() {

        const {navigation} = this.props;
        const {user, id, loadingProfile, seriesa, visibleS, visibleM} = this.props;
        const {rate, bookTitle, bookPoster, bookRelease, bookLanguage, bookOverview, bookAuthors, games, books, films, series, musics, ProcessName, response} = this.state;



        if (!this.state.loading) {
            return <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="#0000ff"/></View>;
        }

        return (

            <View style={styles.containerIn}>
                <ImageBackground
                    //source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <CustomHeader2 title="Detay" navigation={navigation}/>
                    {/*<Button onPress={this.ara}> bas </Button>*/}

                    <ScrollView
                        style={{width: '100%', marginTop: '5%', paddingBottom:HeaderHeight*3 }}>
                            {
                                this.state.tur == 1  && this.state.loading ?
                                    <OpenFilm veri={films} rate={rate} tur={this.state.tur} ProcessName={ProcessName} response={response}/>
                                    :
                                    null
                            }
                            {
                                this.state.tur == 2 && this.state.loading ?
                                    <OpenFilm veri={series} rate={rate} tur={this.state.tur} ProcessName={ProcessName} response={response}/>
                                    :
                                    null
                            }
                            {
                                this.state.tur == 3 && this.state.loading ?
                                    <OpenBook bookTitle={bookTitle} bookPoster={bookPoster} bookAuthors={bookAuthors}
                                              bookLanguage={bookLanguage} bookRelease={bookRelease}
                                              bookOverview={bookOverview} rate={rate} response={response} navigation={navigation} />
                                    :
                                    null
                            }
                            {
                                this.state.tur == 4  && this.state.loading ?
                                    <OpenGame veri={games} rate={rate} ProcessName={ProcessName} response={response}/>
                                    : null
                            }
                            {
                                this.state.tur == 5  && this.state.loading ?
                                    <OpenMusic veri={musics} rate={rate} ProcessName={ProcessName} response={response}/>
                                    : null
                            }
                    </ScrollView>

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
    image: {
        resizeMode: 'contain',
        width: 100,
        height: 150,
        borderRadius: 5,
    },
    imageg: {
        marginTop: 5,
        resizeMode: 'contain',
        width: 100,
        height: 100,
        borderRadius: 5,
    },

    profileCard: {
        // position: "relative",
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        borderRadius: 6,
        backgroundColor: "#FFF",//theme.COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
        marginBottom:HeaderHeight*1.5,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 62,
        borderWidth: 0,
    },

});


const mapStateToProps = ({user, loadingProfile, series, visibleM, visibleS, id}) => ({
    loadingProfile,
    id,
});

const mapDispatchToProps = {
    getMovieId,
    getSeriesId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detay);

