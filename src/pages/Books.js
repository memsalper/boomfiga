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

} from 'react-native';

import {Picker} from '@react-native-community/picker';
import axios from 'axios';

import {CustomHeader} from '../header/CustomHeader';
import {KitapListesi} from '../components/KitapListesi';
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";


const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const {width: WIDTH} = Dimensions.get('window');
export class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                {
                    key:1,
                    id:375802, //best_book id dekini id yi al
                    poster_path:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408303130l/375802._SY160_.jpg",
                    title:"Ender’s Game (Ender’s Saga, #1)",
                    rate:4,
                },
                {
                    key:2,
                    id:44687,
                    poster_path:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1217735909l/44687._SX98_.jpg",
                    title:"Enchanters' End Game (The Belgariad, #5)",
                    rate:2,
                },
                {
                    key:3,
                    id:6234357,
                    poster_path:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1333278270l/6234357._SX98_.jpg",
                    title:"Son Ada",
                    rate:4,
                },
                {
                    key:4,
                    id:6393082,
                    poster_path:"https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
                    title:"Ender's Game, Volume 1: Battle School (Ender's Saga)",
                    rate:5,
                },
                {
                    key:5,
                    id:11085413,
                    poster_path:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1359229737l/11085413._SX98_.jpg",
                    title:"Serenad",
                    rate:5,
                },
            ],
            isVisibleB: true,
            selectedValue1:"",
            selectedValue2:5,
            selectedValue3:"",

        };
    }

    render(){
        let{navigation}= this.props;
        const isVisibleB = this.state.isVisibleB;
        const books =this.state.books;
        const {selectedValue1, selectedValue2, selectedValue3}= this.state;



        // console.log(films);
        return (
            <View style={styles.containerIn}>
                <ImageBackground
                    source={Images.Onboarding}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                <CustomHeader title={'Kitaplar'} navigation={navigation}/>
                <View style={{flexDirection:"row", backgroundColor:"rgba(24,34,77,0.8)"}}>
                    <Picker
                        style={{height: 30, width: "33%", color:"white"}}
                        selectedValue={this.state.selectedValue1}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({selectedValue1: itemValue})
                        }
                    >

                        <Picker.Item label={"Şuan"} value={"Şuan"} key={0}></Picker.Item>
                        <Picker.Item label={"Geçmiş"} value={"Geçmiş"} key={1}></Picker.Item>
                    </Picker>
                    <Picker
                        style={{height: 30, width: "33%", color:"white"}}
                        selectedValue={this.state.selectedValue2}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({selectedValue2: itemValue})
                        }>

                        <Picker.Item label={"Top5"} value={5} key={0}></Picker.Item>
                        <Picker.Item label={"Top10"} value={10} key={1}></Picker.Item>
                    </Picker>
                    <Picker
                        style={{height: 30, width: "35%", color:"white"}}
                        selectedValue={this.state.selectedValue3}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({selectedValue3: itemValue})
                        }>

                        <Picker.Item label={"Arkadaşlar"} value={"Arkadaşlar"} key={0}></Picker.Item>
                        <Picker.Item label={"Türkiye"} value={"Türkiye"} key={1}></Picker.Item>
                    </Picker>

                </View>
                    <View style={{flex: 1, width: '100%', paddingBottom: HeaderHeight * 1.5}}>
                        {
                            isVisibleB ?
                                <KitapListesi title={'Kitaplar'} veri={books.slice(0,selectedValue2)} navigation={navigation} zaman={true}/>
                                :
                                null
                        }
                    </View>
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
    },

});
